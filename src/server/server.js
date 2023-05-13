const dotenv = require('dotenv');
const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');

dotenv.config();

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const getUrlSummary = async (url, summarizationType) => {
    try {
      const response = await axios.post(API_URL, {
        messages: [
          {role: 'system', content: 'You are a helpful assistant.'},
          {role: 'user', content: `Summarize the content of the website at ${url} in a ${summarizationType} style`},
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`
        }
      });
  
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
    }
  }
  
  app.post('/summarize', async (req, res) => {
      const { url, summarizationType } = req.body;
      const summary = await getUrlSummary(url, summarizationType);
      res.json({ summary });
  });
  
  
