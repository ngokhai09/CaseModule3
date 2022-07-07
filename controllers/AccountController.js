const fs = require('fs');
const qs = require('qs');
const cookie = require('cookie');
const UserModel = require('../models/UserModel');

class AccountController {
    constructor() {
        this.userModel = new UserModel();
    }

    showAccountPage(req, res, pathFile) {
        fs.readFile(pathFile, 'utf-8', (err, data) => {
            res.writeHead(200, 'Success', {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        })
    }


    async login(req, res) {
        const buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        const data = Buffer.concat(buffer).toString();
        const user = qs.parse(data);
        this.userModel.checkAccount(user.username, user.password).then(result => {
            if (result[0].length > 0) {
                let nameFile = result[0][0].CustomerID;

                let sessionLogin = {
                    'session_name_file': result[0][0].CustomerID
                }
                fs.writeFile('./token/session' + nameFile + '.txt', JSON.stringify(sessionLogin), err => {
                    if (err) {
                        throw new Error(err.message);
                    }
                })
                let cookieLogin = {
                    id: result[0][0].CustomerID
                }
                let admin = false;
                res.setHeader('set-cookie', cookie.serialize('cookie-app', JSON.stringify(cookieLogin), {
                    maxAge: 60 * 60 * 24 * 7
                }));
                result[0].forEach(item => {
                    if (item.RoleName === 'admin') {
                        admin = true;
                        res.writeHead(301, {Location: '/admin'});
                        res.end();
                    }
                })
                if (!admin) {
                    res.writeHead(301, {Location: '/blog'});
                    res.end();
                }

            } else {
                res.writeHead(301, {Location: '/login'});
                res.end();
            }

        });
    }

    async register(req, res) {
        let buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        const data = Buffer.concat(buffer).toString();
        const user = qs.parse(data);
        user.create_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        user.update_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
        user.isActive = true;
        this.userModel.createAccount(user).then(result => {
            res.writeHead(301, {Location: '/login'});
            res.end();
        });
    }

    logout(req, res) {
        let cookies = cookie.parse(req.headers.cookie || '');
        let id = JSON.parse(cookies['cookie-app']).id;
        fs.unlink('./token/session' + id + '.txt', () => {});
        console.log(cookies);
        // let cookieLogin = {
        //     id: id
        // }
        //
        // res.setHeader('set-cookie', cookie.serialize('cookie-app', JSON.stringify(cookieLogin), {
        //     expires: new Date(0)
        // }));
        res.writeHead(301, {Location: '/login'});
        res.end();

    }
}

module.exports = AccountController;