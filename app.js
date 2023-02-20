const express = require("express");
const bodyParser =require("body-parser");
const https = require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){

   

    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){
    const cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=60eb4569e316f5b22e678c0547415d15&units=metric";

    https.get(url,function(response){
        

        response.on("data", function(data){
           const weatherData = JSON.parse(data);
           const temp = weatherData.main.temp;
           const desc = weatherData.weather[0].description;
           const min = weatherData.main.temp_min;
           const max = weatherData.main.temp_max;
           
           res.setHeader('Content-Type', 'text/html');

           const htmlCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Weather Website</title>
        <style>
          body {
            background-color: skyblue;
          }
          .container {
            background-color: #f1f1f1;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 20px auto;
            max-width: 600px;
          }
          h1 {
            font-size: 24px;
            text-align: center;
            margin-top: 0;
          }
          p {
            font-size: 18px;
            text-align: center;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>the weather is currently</p>${desc}<br>
          <h1>The temperature in <em>${cityName}</em> is <span id="temp">${temp}</span> degrees and it ranges from <span id="min">${min}</span> to <span id="max">${max}</span> degrees.</h1>
        </div>
      </body>
    </html>`
          

         res.send(htmlCode);
           




        })
        
    })
    
})







app.listen(process.env.PORT || 5000, function(){
    console.log("server started");
})





