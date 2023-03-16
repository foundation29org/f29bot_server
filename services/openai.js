const { Configuration, OpenAIApi } = require("openai");
const config = require('../config')
const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function callOpenAi (req, res){
  //comprobar créditos del usuario
  
  var jsonText = req.body.value;
  (async () => {
    try {
      const gptResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content:jsonText}],
        //prompt: jsonText,
        temperature: 0,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.status(200).send(gptResponse.data)
    }catch(e){
      if (e.response) {
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        console.log(e.message);
      }
      console.error("[ERROR]: " + e)

      res.status(500).send(e)
    }
    
  })();
}


module.exports = {
	callOpenAi
}
