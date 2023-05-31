const { Configuration, OpenAIApi } = require("openai");
const config = require('../config')
const axios = require('axios');
const { json } = require("body-parser");
const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function callBook (req, res){
  //comprobar créditos del usuario
  //return this.http.post('http://localhost:7071/api/HttpTrigger2', info)
  
  var jsonText = req.body;
  console.log(jsonText)
  //axios.post('http://localhost:7071/api/HttpTrigger2', jsonText)
  axios.post('https://af29.azurewebsites.net/api/HttpTrigger2', jsonText)
  .then(async response => {
      try {
          // const jsonObject = JSON.parse(response.data.table);
        res.status(200).send(response.data)
      } catch (error) {
          console.log(error)
          var respu = {
              "msg": error,
              "status": 500
          }
          res.status(500).send(respu)
      }

  })
  .catch(error => {
      console.error(error);
      var respu = {
          "msg": error,
          "status": 500
      }
      res.status(500).send(respu)
  });
}


module.exports = {
	callBook
}
