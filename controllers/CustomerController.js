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
                users.forEach((user, index) =>{
                    html +=`<tr class="alert" role="alert">   
<div class="modal fade" id="edit-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form action="/user/update?id=${user.CustomerID}" method="POST">
                                                  <div class="form-group">
                                                    <label for="email">Email address</label>
                                                    <input type="email" class="form-control" value="${user.Email}" readonly>
                                                  </div>
                                                  
                                                  <div class="form-group">
                                                    <label for="username">User Name</label>
                                                    <input type="text" name="username" class="form-control" value="${user.Username}">
                                                  </div>
                                                  <div class="form-group">

                                                    <label for="password">Password</label>
                                                    <input type="password" name="password" class="form-control" value="${user.Password}">
                                                  </div> 
                                                  <div class="form-group">
                                                    <label for="statucs">Status</label>
                                                        <select class="form-control" name="status">
                                                          <option>${user.isActive === 1?'Active':'In Active'}</option>
                                                          <option>${user.isActive !== 1?'Active':'In Active'}</option>
                                                        </select>
                                                    </div>
                                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                  <button type="submit" class="btn btn-primary">Save</button>
                                                </form>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="delete-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Bạn chắc chắn có muốn xóa tài khoản: ${user.Email}</p>
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <a href="/user/delete?${user.CustomerID}" type="button" class="btn btn-danger">Delete</a>
                                                
                                            </div>
                                             
                                        </div>
                                    </div>
                                </div>                         
                                <td class="border-bottom-0"><span>${user.FirstName}</span></td>
                                <td class="border-bottom-0"><span>${user.LastName}</span></td>
                                <td class="border-bottom-0"><span>${user.Address}</span></td>
                                <td class="border-bottom-0"><span>${user.PhoneNumber}</span></td>
                                <td class="border-bottom-0"><span>${user.Email}</span></td>
                                <td class="status"><span class="${user.isActive === 1?'active':'waiting'} ">${user.isActive === 1?'Active':'In Active'}</span></td>
                                <td class="border-bottom-0">
                                    <a type="button" class="close" data-toggle="modal" data-target="#edit-${index}">
                                        <span style="color: #0059B3; " aria-hidden="true"><i class="fa fa-edit"></i></span>
                                    </a>
                                </td>
                                <td class="border-bottom-0">
                               
                                    <a hdata-toggle="modal" data-target="#delete-${index}" type="button" class="close">
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
                accounts.forEach((account, index) =>{
                    html +=`<tr class="alert" role="alert">
                                <div class="modal fade" id="edit-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form action="/account/update?id=${account.CustomerID}" method="POST">
                                                  <div class="form-group">
                                                    <label for="email">Email address</label>
                                                    <input type="email" class="form-control" value="${account.Email}" readonly>
                                                  </div>
                                                  
                                                  <div class="form-group">
                                                    <label for="username">User Name</label>
                                                    <input type="text" name="username" class="form-control" value="${account.Username}">
                                                  </div>
                                                  <div class="form-group">

                                                    <label for="password">Password</label>
                                                    <input type="password" name="password" class="form-control" value="${account.Password}">
                                                  </div> 
                                                  <div class="form-group">
                                                    <label for="statucs">Status</label>
                                                        <select class="form-control" name="status">
                                                          <option>${account.isActive === 1?'Active':'In Active'}</option>
                                                          <option>${account.isActive !== 1?'Active':'In Active'}</option>
                                                        </select>
                                                    </div>
                                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                  <button type="submit" class="btn btn-primary">Save</button>
                                                </form>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="delete-${index}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Bạn chắc chắn có muốn xóa tài khoản: ${account.Email}</p>
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <a href="/account/delete?${account.CustomerID}" type="button" class="btn btn-danger">Delete</a>
                                                
                                            </div>
                                             
                                        </div>
                                    </div>
                                </div>
                                <td class="d-flex align-items-center border-bottom-0">

                                    <div class="pl-3 email">
                                        <span>${account.Email}</span>
                                        <span>Added: ${account.Create_Time}</span>
                                    </div>
                                </td>
                                <td class="border-bottom-0"><span>${account.Username}</span></td>
                                <td class="status"><span class="${account.isActive === 1?'active':'waiting'} ">${account.isActive === 1?'Active':'In Active'}</span></td>
                                <td class="border-bottom-0">
                                    <a type="button" class="close" data-toggle="modal" data-target="#edit-${index}">
                                        <span style="color: #0059B3; " aria-hidden="true"><i class="fa fa-edit"></i></span>
                                    </a>
                                   
                                </td>
                                <td class="border-bottom-0" data-toggle="modal" data-target="#delete-${index}">
                                    <a  type="button" class="close">
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
                let html = `<form action="/user/update?id=${id}" method="POST">
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
    async update(req, res, id){
        let buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        const data = Buffer.concat(buffer).toString();
        const user = qs.parse(data);
        user.updatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(req.url);
        this.userModel.updateUser(user, id).then(result =>{
            let url = ''
            fs.readFile('./token/preUrl', 'utf-8',(err, data)=>{
                url = JSON.parse(data).url;
            })
            console.log(url);
            // res.writeHead(301, {Location : '/admin/profile'});
            res.end();
        })
    }
    async accountUpdate(req, res, id){
        let buffer = [];
        for await (const chunk of req) {
            buffer.push(chunk);
        }
        let cookies = cookie.parse(req.headers.cookie || '');
        const data = Buffer.concat(buffer).toString();
        const user = qs.parse(data);
        user.updatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.userModel.updateAccount(user, id).then(result =>{
            res.writeHead(301, {Location : '/admin'});
            res.end();
        })
    }

}

module.exports = CustomerController;