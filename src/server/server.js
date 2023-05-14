const dotenv = require('dotenv');
const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

dotenv.config();

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_URL = 'https://api.openai.com/v1/chat/completions';
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const extractContent = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const bodyHandle = await page.$('body');
    const html = await page.evaluate(body => body.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    await browser.close();

    const $ = cheerio.load(html);

    // Try multiple selectors
    const selectors = ['article', 'main', '.post', '.entry-content', '#content', '.article-body'];
    let mainContent = '';
    
    for (let selector of selectors) {
      const content = $(selector).text();
      if (content.length > mainContent.length) {
        mainContent = content;
      }
    }
    
    return mainContent;
  } catch (error) {
    console.error(error);
    throw new Error("Content extraction failed");
  }
};


const getUrlSummary = async (text, summarizationType) => {
  let instruction;
  if (summarizationType === 'Default') {
    instruction = 'Summarize the following text:';
  } else {
    instruction = `Summarize the following text in a ${summarizationType} style:`;
  }
  
  try {
    const response = await axios.post(API_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: instruction},
        {role: 'user', content: text},
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      }
    });
    if(!text) {
      return 'invalid url'
    }
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
  }
}

app.post('/summarize', async (req, res) => {
  const { url, summarizationType } = req.body;
  console.log(url, summarizationType)
  const content = await extractContent(url);
  console.log(content);
  const summary = await getUrlSummary(content, summarizationType);
  res.json({ summary });
});

  
