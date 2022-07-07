const http = require('http');
const url = require('url');
const fs = require('fs')
const qs = require('qs');
const AccountController = require('./controllers/AccountController');
const CustomerController = require('./controllers/CustomerController')
const cookie = require("cookie");
let accountController = new AccountController();
let customerController = new CustomerController();

handlers = {};
handlers.login = (req, res)=>{
    if(req.method === "GET"){
        accountController.showAccountPage(req, res, './views/account/login.html');
    }
    else{
        accountController.login(req, res);
    }
}
handlers.register = (req, res)=>{
    if(req.method === "GET")
        accountController.showAccountPage(req, res, './views/account/register.html');
    else{
        accountController.register(req, res);
    }
}
handlers.account_list = (req, res)=>{
    customerController.showAccountList(req, res);
}
handlers.user_list = (req, res)=>{
    customerController.showCustomerList(req,res);
}
handlers.notfound = (req, res)=>{
    fs.readFile('./views/notfound.html', 'utf-8', (err, data)=>{
        if(err)
            console.log(err);
        res.writeHead(200, 'Success', {'Content-type':'text/html'});
        res.write(data);
        res.end();
    })
}
handlers.blog_list = (req, res)=>{

}
handlers.profile = (req, res)=>{
    customerController.showProfile(req,res);
}
handlers.update = (req, res)=>{
    let queryUrl = url.parse(req.url).query;
    let id = qs.parse(queryUrl).id;
    customerController.update(req, res, id);
}
handlers.account_update = (req, res)=>{
    let queryUrl = url.parse(req.url).query;
    let id = qs.parse(queryUrl).id;
    customerController.accountUpdate(req, res, id);
}
handlers.logout = (req, res)=>{
    console.log('123')
    accountController.logout(req, res);
}
router = {
    '/login' : handlers.login,
    '/register' : handlers.register,
    '/admin' : handlers.account_list,
    '/admin/user' : handlers.user_list,
    '/admin/blog' : handlers.blog_list,
    '/admin/profile' : handlers.profile,
    '/user/update' :handlers.update,
    '/account/update' : handlers.account_update,
    '/log' : handlers.logout
}

let mimeTypes={
    'jpg' : 'images/jpg',
    'png' : 'images/png',
    'js' :'text/javascript',
    'css' : 'text/css',
    'svg':'image/svg+xml',
    'ttf':'font/ttf',
    'woff':'font/woff',
    'woff2':'font/woff2',
    'eot':'application/vnd.ms-fontobject'
}
const server = http.createServer(async(req, res)=>{
    let urlPath = url.parse(req.url).pathname;
    const filesDefences = urlPath.match(/\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': extension});
        fs.createReadStream(__dirname  + req.url).pipe(res)
    } else {
        let cookies = req.headers.cookie;
        let chosenHandler = (typeof (router[urlPath]) !== 'undefined') ? router[urlPath] : handlers.notfound;
        if(typeof cookies !== 'undefined' || urlPath === '/login' || typeof (router[urlPath]) === 'undefined'){
            chosenHandler(req, res);
        }
        else{
            res.writeHead(301, {Location: '/login'})
            res.end();
        }

    }

})

server.listen(8081, 'localhost', ()=>{
    console.log("Server is running on http://localhost:8081");
})