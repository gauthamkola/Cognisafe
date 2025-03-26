const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';

app.post('/analyze-sentiment', async (req, res) => {
  const { text } = req.body;
  const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      document: { type: 'PLAIN_TEXT', content: text },
      encodingType: 'UTF8'
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/detect-misinfo', async (req, res) => {
  const { url, text } = req.body;
  const factCheckUrl = `https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${API_KEY}`;
  const query = encodeURIComponent(url);

  try {
    const response = await axios.get(`${factCheckUrl}&query=${query}&pageSize=5`);
    const data = response.data;
    if (data.claims && data.claims.length > 0) {
      const hasFalseClaim = data.claims.some(claim => 
        claim.claimReview && claim.claimReview.some(review => 
          review.textualRating.toLowerCase().includes('false') || 
          review.textualRating.toLowerCase().includes('misinformation')
        )
      );
      res.json({ status: hasFalseClaim ? 'unreliable' : 'reliable' });
    } else {
      res.json({ status: 'reliable' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});