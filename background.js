let latestSentimentScore = null;
let latestMisinfoStatus = null;
let latestTabId = null;

async function analyzePage(tabId, url) {
  if (!url.startsWith('http')) return;

  try {
    const result = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => document.querySelector('article') || document.querySelector('main') || document.body.innerText
    });

    const text = result[0].result;
    if (!text) {
      latestSentimentScore = null;
      latestMisinfoStatus = null;
      return;
    }

    // Call Node.js backend instead of Google APIs directly
    const sentimentResponse = await fetch('http://localhost:3000/analyze-sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.substring(0, 1000) })
    });
    const sentimentData = await sentimentResponse.json();
    if (sentimentData.error) throw new Error(sentimentData.error);
    latestSentimentScore = sentimentData.documentSentiment.score;

    const misinfoResponse = await fetch('http://localhost:3000/detect-misinfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, text: text.substring(0, 1000) })
    });
    const misinfoData = await misinfoResponse.json();
    if (misinfoData.error) throw new Error(misinfoData.error);
    latestMisinfoStatus = misinfoData.status;

    latestTabId = tabId;

    if (latestMisinfoStatus === 'unreliable' || latestSentimentScore < 0.3) {
      chrome.action.setIcon({ path: 'icons/icon-16-warning.png', tabId: tabId });
    } else {
      chrome.action.setIcon({ path: 'icons/icon-16.png', tabId: tabId });
    }
  } catch (error) {
    console.error('Error analyzing page:', error);
    latestSentimentScore = null;
    latestMisinfoStatus = null;
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    analyzePage(tabId, tab.url);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSentimentScore') {
    sendResponse({ score: latestSentimentScore, misinfo: latestMisinfoStatus, tabId: latestTabId });
  } else if (request.action === 'updateSentimentScore') {
    latestSentimentScore = request.score;
    latestMisinfoStatus = request.misinfo;
    latestTabId = request.tabId;
  }
});