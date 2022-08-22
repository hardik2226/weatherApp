const { table } = require("console");
const { urlencoded } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.sendFile("/index.html", { root: __dirname });

});

app.post("/", function(req, res) {
    console.log("Post request recieved.")

    const city = req.body.cityName;
    const unit = "metric";
    const api = "cfdee09d6ff763bf1f79087752c5e96f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + api + "&units=" + unit;
    https.get(url, function(response) {
        response.on("data", function(data) {
            const wData = JSON.parse(data);
            const temp = wData.main.temp;
            var icon = "http://openweathermap.org/img/wn/" + wData.weather[0].icon + "@2x.png";

            res.write("<h1>Temparature in " + wData.name + " is :" + temp + "C</h1>");
            res.write("<h2>The weather is currently " + wData.weather[0].description + "</h2><img src=" + icon + ">");
            // res.write("<img src=" + icon + ">");
            res.send();
        })
    });

});


app.listen(3000, function() {
    console.log("server started on port 3000");
})