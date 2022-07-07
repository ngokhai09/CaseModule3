let Database = require('./Database');

class BlogModel{
    constructor() {
        this.conn = Database.connect();
    }
    getAllBlog(){
        return new Promise((resolve, reject)=>{
            let sqlSelect = 'SELECT * FROM BLOG';
            this.conn.query(sqlSelect, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
    getBlogByID(id){
        return new Promise((resolve, reject)=>{
            let sqlSelect = `SELECT * FROM blog WHERE BlogID = ${id}`;
            this.conn.query(sqlSelect, (err, data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
    updateBlogByID(data, id){

    }
}

module.exports = BlogModel;