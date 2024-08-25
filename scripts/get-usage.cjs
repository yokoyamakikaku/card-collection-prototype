require('dotenv').config();
const axios = require('axios');
const { default: OpenAI } = require('openai');

async function getUsage() {
  const apiKey = process.env.OPENAI_API_KEY;
  const aopenai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  try {


    aopenai.

    console.log("Usage data:", response.data);
  } catch (error) {
    console.error("Error fetching usage data:", error.response ? error.response.data : error.message);
  }
}

getUsage();
