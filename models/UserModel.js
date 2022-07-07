let Database = require('./Database');

class UserModel{
    constructor() {
        this.conn = Database.connect();
    }

    getAllUser(){
        return new Promise((resolve, reject)=>{
            let sql = "Select * From Customers";
            this.conn.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
    getUserById(id){
        return new Promise((resolve, reject)=>{
            let sql = "SELECT * FROM customers WHERE CustomerID = " + id;
            this.conn.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }

    checkAccount(username, password){
        return new Promise((resolve, reject)=>{
            let sql = `CALL checkAccount('${username}', ${password})`
            this.conn.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
    createAccount(data){
        return new Promise((resolve, reject)=>{
            let sql = 'INSERT INTO CUSTOMERS(FirstName, LastName, Address, PhoneNumber, Username, Email, Password, Create_Time, Update_Time,isActive)  VALUES(N\'' + data.firstname +'\', N\'' + data.lastname +'\', N\'' + data.address +'\', N\'' + data.phonenumber +'\', N\'' + data.username +'\', N\'' + data.email +'\', N\'' + data.password +'\', N\'' + data.create_time +'\', N\'' + data.update_time +'\', ' + data.isActive +')'
            this.conn.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })

        })
    }
    updateAccount(data, id){
        console.log(data);
        return new Promise((resolve, reject)=>{
            let sqlUpdate = `UPDATE CUSTOMERS SET Password = '${data.password}', Username = N'${data.username}', Update_Time = '${data.updatetime}', isActive = ${data.status==='Active'?1:2} WHERE CustomerID = ${id}`;
            this.conn.query(sqlUpdate, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);

            })
        })
    }
    updateProfile(data, id){
        return new Promise((resolve, reject)=>{
            let sqlUpdate = `UPDATE CUSTOMERS SET FirstName = N'${data.firstname}', LastName = N'${data.lastname}', Address = N'${data.address}', PhoneNumber = N'${data.phonenumber}', Update_Time = '${data.updatetime}' WHERE CustomerID = ${id}`;
            this.conn.query(sqlUpdate, (err, data)=>{

                if(err){
                    reject(err);
                }
                resolve(data);

            })
        })
    }
    updateUser(data, id){
        return new Promise((resolve, reject)=>{
            let sqlUpdate = `UPDATE CUSTOMERS SET FirstName = N'${data.firstname}', LastName = N'${data.lastname}', Address = N'${data.address}', PhoneNumber = N'${data.phonenumber}', Username = N'${data.username}', Email = N'${data.email}', Update_Time = '${data.updatetime}' WHERE CustomerID = ${id}`;
            this.conn.query(sqlUpdate, (err, data)=>{

                if(err){
                    reject(err);
                }
                resolve(data);

            })
        })
    }
    deleteUser(id){
        return new Promise((resolve, reject)=>{
            let sqlDelete = `CALL checkAccount('${username}', ${password})`
            this.conn.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
}

module.exports = UserModel;