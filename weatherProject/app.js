const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")    
})

app.post("/" , function(req, res){
    
    const query = req.body.cityName;
    const appKey = "71836db935e5b42303d28fa4998003c0"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;

    https.get(url, function (response) {

        console.log("status code " + response.statusCode)

        response.on("data", function (data) {

            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const hmd = weatherData.main.humidity
            console.log("temprature : "+temp);
            console.log("humidity : "+ hmd);
            console.log(weatherData);

            const icon = weatherData.weather[0].icon
            const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1> the temperature in "+query +" is "+ temp +" degree Celcius</h1>")
            res.write("<p>And humidity is "+ hmd +"</p>")
            res.write("<img src="+ imageURL+">")

            res.send()

        })
    })

})




app.listen(3000, function () {
    console.log("server is runiint on port 3000")
})