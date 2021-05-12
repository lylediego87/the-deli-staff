const express = require('express');
const axios = require('axios');


const apiKey = "0b8bad4c-5b08-47c7-a881-2d08dec9bfed"
const apiSecret = "oeFVVyg98g8JTrcVoRSawlwvpCqf60DH"
const accountApiCredentials = apiKey + ':' + apiSecret;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let token = "";
let buff = new Buffer.from(accountApiCredentials);
let base64Credentials = buff.toString('base64');

let authHeader = 'Basic ' + base64Credentials;
let config = {
    headers: {
        'Authorization': authHeader,
    }
}

if(token === ""){
  axios.get('https://rest.smsportal.com/authentication', config)
    .then(response => {
      if (response.data) {
          token = response.data.token;
      }
    })
    .catch(error => {
      if (error.response){
          console.log(error.response.data);
      }
    });
}


app.post('/api/nofifyWtihSms', (req, res) => {
  try {
    Send(token, "Your order is complete", req.body.phoneNo);
    res.send(`Sms sent to: ${req.body.phoneNo}`);  
  } catch (error) {
    console.log(error);
  }
  
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));


function Send(token, message, destination){
  let authHeader = 'Bearer ' + token;
  let config = {
      headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
      }
  }
  
  let data = JSON.stringify({
      messages : [{
          content: message,
          destination: destination
      }]
  })

  axios.post('https://rest.smsportal.com/bulkmessages', data, config)
    .then(response => {      
      if (response.data){
          console.log(response.data);
      }
    })
    .catch(error => {
      if (error.response){
          console.log(error.response.data);
      }
    });
}