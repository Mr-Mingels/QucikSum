const dotenv = require('dotenv');
const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');
const sanitizeHtml = require('sanitize-html');

dotenv.config();

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_URL = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions';
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const extractContent = async (url) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);

  const options = {
    method: 'POST',
    url: 'https://extract-content-from-url.p.rapidapi.com/api/url/extract/',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'extract-content-from-url.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const getUrlSummary = async (text, summarizationType) => {
  try {
    const sanitizedText = sanitizeHtml(text);
    const response = await axios.post(API_URL, {
      messages: [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: `Summarize the following text:`},
        {role: 'user', content: sanitizedText},
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
  const content = await extractContent(url);
  const summary = await getUrlSummary(content, summarizationType);
  res.json({ summary });
});

  
