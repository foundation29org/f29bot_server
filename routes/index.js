// file that contains the routes of the api
'use strict'

const express = require('express')

const langCtrl = require('../controllers/all/lang')

const openAIserviceCtrl = require('../services/openai')
const bookCtrl = require('../services/book')
const cors = require('cors');

const api = express.Router()
const config= require('../config')
const myApiKey = config.Server_Key;
// Lista de dominios permitidos
const whitelist = config.allowedOrigins;

  // Middleware personalizado para CORS
function corsWithOptions(req, res, next) {
    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
          callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
      },
    };
  
    cors(corsOptions)(req, res, next);
  }

  const checkApiKey = (req, res, next) => {
    // Permitir explícitamente solicitudes de tipo OPTIONS para el "preflight" de CORS
    if (req.method === 'OPTIONS') {
      return next();
    } else {
      const apiKey = req.get('x-api-key');
      if (apiKey && apiKey === myApiKey) {
        return next();
      } else {
        return res.status(401).json({ error: 'API Key no válida o ausente' });
      }
    }
  };
// lang routes, using the controller lang, this controller has methods
api.get('/langs/',  langCtrl.getLangs)

//services OPENAI
api.post('/callopenai', corsWithOptions, checkApiKey, openAIserviceCtrl.callOpenAi)
api.post('/callbook', corsWithOptions, checkApiKey, bookCtrl.callBook)


module.exports = api
