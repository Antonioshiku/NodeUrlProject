let http=require('http');
let Url=require('url');
require('dotenv').config();
let head = (res) => {
    res.writeHead(200,{"Content-Type":"text/html"})
}

let routes= {
    "GET" : { 
        "/" : (req,res,age,name) => {
           head(res);
             res.end(`GET and / path Routes with ${age} Name is ${name}`);     
        },
        "/login" : (req,res,name) => {
            head(res);
            res.end("GET and /login path");     
        }
    },

    "POST" : {
       "/about" : (req,res,name) => {
        head(res);
        res.end("POST and /about path");     
       },
       "/api/result" : (req,res,) => {
        head(res);
        res.end("POST and /api/result path");     
       }
    },

    "NA" : (req,res ,urlParesm) => {
         head(res);
         res.end("No Routes");   
    }
}



let start= (req,res) => {
        let reqMethod=req.method;
        let url=req.url;
       let urlParesm= Url.parse(req.url,true);
       let name=urlParesm.query.name;
       let age=urlParesm.query.age;
   
       console.log("Name",name, "Age" , age);
     let resloveRoute=routes[reqMethod][urlParesm.pathname];

     if(resloveRoute != null || resloveRoute !=undefined){
         resloveRoute(req,res,age,name);
     }
     else
     {
               routes.NA(req,res);
     }
}

let server=http.createServer(start);

server.listen(process.env.PORT, function(){
     console.log(`Server is running ${process.env.PORT}`);
});