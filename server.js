const http = require('http')

const server = http.createServer((req, res)=>{
    res.write("RUN");
    res.end();
})

server.listen(8080, 'localhost', ()=>{
    console.log("Server is running");
})