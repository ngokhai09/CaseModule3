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
        let admin = '';
        this.userModel.checkAccount(user.username, user.password).then(result => {
            if (result[0].length > 0) {
                let nameFile = Date.now();

                let sessionLogin = {
                    'session_name_file': nameFile,
                    'data_user_login': result[0]
                }
                fs.writeFile('./session' + nameFile + '.txt', JSON.stringify(sessionLogin), err => {
                    if (err) {
                        throw new Error(err.message);
                    }
                })
                let cookieLogin = {
                    id : result[0][0].CustomerID,
                    'session_name_File': nameFile
                }
                let admin = false;
                res.setHeader('set-cookie', cookie.serialize('cookie-app', JSON.stringify(cookieLogin)));
                result[0].forEach(item=>{
                    if(item.RoleName === 'admin'){
                        admin = true;
                        res.writeHead(301, {Location: '/admin'});
                        res.end();
                    }
                })
                if(!admin){
                    res.writeHead(301, {Location: '/blog'});
                    res.end();
                }

            }
            else{
                res.writeHead(301, {Location: '/login'});
                res.end();
            }

        });
    }
    async register(req, res){
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

}

module.exports = AccountController;