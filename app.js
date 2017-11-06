var express = require("express");

var app = express();
var router = express.Router();

app.use(express.static(__dirname + "/clientApp"));
var fs = require('fs');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var httpServer = http.createServer(app);

httpServer.listen(port);

app.use('/calendar', router);

router.route('/').get(function(req,resp){
    setTimeout(
      function(){
        resp.json(getCalendar())
      },
      1000);
});

function getCalendar(){
   const calendar = 
    {
      "January": {
          "1-6":  {"rest": true, "n": "Новый год"},
          "7":    {"rest": true, "n": "Рождество Христово"},
          "8":    {"rest": true, "n": "Новый год"}
      },
  
      "February": {
          "22": {"rest": false},
          "23": {"rest": true, "n": "День защитника Отечества"}
      },
  
      "March": {
          "7": {"rest": false},
          "8": {"rest": true, "n": "Международный женский день"},
          "9": {"rest": true}
      },
  
      "April": {
          "28": {"rest": false},
          "30": {"rest": true}
      },
  
      "May": {
          "1": {"rest": true, "n": "Праздник Весны и Труда"},
          "2": {"rest": true},
          "9": {"rest": true, "n": "День Победы"}
      },
  
      "June": {
          "9": {"rest": false},
          "11": {"rest": true},
          "12": {"rest": true, "n": "День России"}
      },
  
      "November": {
          "5": {"rest": true}
      },
  
      "December": {
          "29": {"rest": false},
          "31": {"rest": true}
      }
};
    return calendar;
}