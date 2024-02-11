const http = require('http');
const { buffer } = require('stream/consumers');

const server = http.createServer((req,res) =>{
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Powered-By", "Node.js");
    res.statusCode= 200;
    
    const {method} =req;

    if(method === `GET`){
        res.end("<h1>halo mein server</h1>");
    }else if(method === `POST`){
        let body = []

        req.on('data',(chunk)=>{
            body.push(chunk);
        });

        req.on('end',()=>{
            body= Buffer.concat(body).toString();
            const {name} = JSON.parse(body);
            res.end(`<h1>halo ${name} server</h1>`);
        });
    }
});

server.listen(3000,'localhost',()=>{
    console.log("Server telah dijalankan!");
});
