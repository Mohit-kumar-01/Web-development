const express =require ("express")
const bodyParser = require("body-parser") 
const request = require ("request")
const https = require("https")
const { response } = require("express")

const app=express()

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){

    const firstName= req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed", 
                merge_fileds : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    } 
    
    const jsonDataa = JSON.stringify(data) 

    url : 'https://us13.api.mailchimp.com/3.0/lists/705e588c23' 

    const options = {
        method : "POST",
        auth: "mohit:c30c0ff9d9db6c0499214dfca5b4d41b-us13"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jdonDatat);
    request.end();

})





app.listen(3000, function(){
    console.log("server is running on port 3000");
})


// API key : c30c0ff9d9db6c0499214dfca5b4d41b-us13
// list id : 705e588c23