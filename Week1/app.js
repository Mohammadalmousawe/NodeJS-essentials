// const http = require("http");

// function handleRequest(request,response) {
//     if(request.url === '/ currenttime'){
//         response.statusCode = 200;
//         response.end("<h1> " + new Date().toISOString() +" </h1>");
//     } else if(request.url === "/"){
//         response.statusCode = 200;
//         response.end("<h1> Hello World ...! </h1>");
//     }

// }

// const server = http.createServer(handleRequest);

// server.listen(4000);

///////////////////////////////////////////////////
const fs = require("fs");
const path = require("path")
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}));
 
app.get("/currenttime", function(req,res){
    res.send("<h1> " + new Date().toISOString() +" </h1>");
});
app.get("/", function(req,res){
    res.send("<form action='/stoer-user' method='POST'> <label> Your Name</label> <input type='text' name='username' > <button>Submit</button> </form>")
})

app.post("/stoer-user",function(req,res){
    const username = req.body.username;

    const filePath = path.join(path.join(__dirname, "data", "users.json"));
  
    const fillData=fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fillData);
    existingUsers.push(username);

    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send("<h1> Username stored!</h1>");
})

app.get("/users" , function(req,res) {
    const filePath = path.join(path.join(__dirname, "data", "users.json"));
  
    const fileData=fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let responseData = '<ul>';

    for(const user of existingUsers) {
        responseData += '<li> '+ user +' </li>';
    }
    responseData += '</ul>'

    res.send(responseData);
})
app.listen(4000);





