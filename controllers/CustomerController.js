let UserModel = require('../models/UserModel')

const fs = require('fs');
const qs = require('qs');
const cookie = require("cookie");

class CustomerController{
    constructor() {
        this.userModel = new UserModel();
    }
    showCustomerList(req, res){
        this.userModel.getAllUser().then(users=>{
            fs.readFile('./views/admin/userlist.html', 'utf-8',(err,data)=>{
                if(err){
                    console.log(err)
                }
                let html = '';
                users.forEach(user =>{
                    html +=`<tr class="alert" role="alert">                            
                                <td class="border-bottom-0"><span>${user.FirstName}</span></td>
                                <td class="border-bottom-0"><span>${user.LastName}</span></td>
                                <td class="border-bottom-0"><span>${user.Address}</span></td>
                                <td class="border-bottom-0"><span>${user.PhoneNumber}</span></td>
                                <td class="border-bottom-0"><span>${user.Email}</span></td>
                                <td class="status"><span class="${user.isActive === 1?'active':'waiting'} ">${user.isActive === 1?'Active':'In Active'}</span></td>
                                <td class="border-bottom-0">
                                    <a type="button" class="close" href="/user/edit/${user.CustomerID}">
                                        <span style="color: #0059B3; " aria-hidden="true"><i class="fa fa-edit"></i></span>
                                    </a>
                                </td>
                                <td class="border-bottom-0">
                                    <a href="/user/delete/${user.CustomerID}" type="button" class="close">
                                        <span style="color: #dc3545; " aria-hidden="true"><i class="fa fa-close"></i></span>
                                    </a>
                                </td>
                            </tr>`
                })
                data = data.replace('{list-user}', html);
                res.writeHead(200, 'Success', {'Content-type': 'text/html'});
                res.write(data);
                res.end();
            })

        })
    }
    showAccountList(req, res){
        this.userModel.getAllUser().then(accounts=>{
            fs.readFile('./views/admin/dashboard.html', 'utf-8',(err,data)=>{
                if(err){
                    console.log(err)
                }
                let html = '';
                accounts.forEach(account =>{
                    html +=`<tr class="alert" role="alert">
                                <td class="d-flex align-items-center border-bottom-0">

                                    <div class="pl-3 email">
                                        <span>${account.Email}</span>
                                        <span>Added: ${account.Create_Time}</span>
                                    </div>
                                </td>
                                <td class="border-bottom-0"><span>${account.Username}</span></td>
                                <td class="status"><span class="${account.isActive === 1?'active':'waiting'} ">${account.isActive === 1?'Active':'In Active'}</span></td>
                                <td class="border-bottom-0">
                                    <a type="button" class="close" href="/user/edit/${account.CustomerID}">
                                        <span style="color: #0059B3; " aria-hidden="true"><i class="fa fa-edit"></i></span>
                                    </a>
                                </td>
                                <td class="border-bottom-0">
                                    <a href="/user/delete/${account.CustomerID}" type="button" class="close">
                                        <span style="color: #dc3545; " aria-hidden="true"><i class="fa fa-close"></i></span>
                                    </a>
                                </td>
                            </tr>`
                })
                data = data.replace('{list-account}', html);
                res.writeHead(200, 'Success', {'Content-type': 'text/html'});
                res.write(data);
                res.end();
            })
        })
    }
    showProfile(req, res){
        let cookies = cookie.parse(req.headers.cookie || '');
        let id = JSON.parse(cookies['cookie-app']).id;
        this.userModel.getUserById(id).then(user=>{
            fs.readFile('./views/admin/user.html', 'utf-8',(err,data)=> {
                if (err) {
                    console.log(err)
                }
                user = user[0];
                let html = `<form action="/user/update" method="POST">
                                    <div class="row">
                                        <div class="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Username</label>
                                                <input type="text" class="form-control" name="username"
                                                       value="${user.Username}">
                                            </div>
                                        </div>
                                        <div class="col-md-6 px-1">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input id="exampleInputEmail1" type="text" class="form-control"
                                                       value="${user.Email}" name="email">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>First Name</label>
                                                <input type="text" class="form-control" name="firstname"
                                                       value="${user.FirstName}">
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Last Name</label>
                                                <input type="text" class="form-control" placeholder="Last Name"
                                                       value="${user.LastName}" name="lastname">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Address</label>
                                                <input type="text" class="form-control" placeholder="Home Address"
                                                       value="${user.Address}" name="address">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4 pr-1">
                                            <div class="form-group">
                                                <label>Phone Number</label>
                                                <input type="text" class="form-control" name="phonenumber" value="${user.PhoneNumber}">
                                            </div>
                                        </div>
                                        <div class="col-md-4 px-1">
                                            <div class="form-group">
                                                <label>Create Time</label>
                                                <input type="text" class="form-control" name="createtime"
                                                       value="${user.Create_Time}" readonly>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Update Time</label>
                                                <input type="text" class="form-control" name="updatetime" readonly value="${user.Update_Time}">
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-info btn-fill pull-right">Update Profile
                                    </button>
                                    <div class="clearfix"></div>
                                </form>`;
                data = data.replace('{form}', html);
                res.writeHead(200, 'Success', {'Content-type':'text/html'})
                res.write(data);
                res.end();
            })
        })
    }
    async update(req, res){
        let buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        let cookies = cookie.parse(req.headers.cookie || '');
        let id = JSON.parse(cookies['cookie-app']).id;
        const data = Buffer.concat(buffer).toString();
        const user = qs.parse(data);
        user.updatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.userModel.updateUser(user, id).then(result =>{
            res.writeHead(301, {Location : '/admin/profile'});
            res.end();
        })
    }
}

module.exports = CustomerController;