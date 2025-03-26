const toggleButton = document.getElementById("toggleButton");
const statement = document.getElementById("statement");
const analyzeButton = document.getElementById("analyzeButton");
const sentimentScoreElement = document.getElementById("sentimentScore");
const scoreValueElement = document.getElementById("scoreValue");

const fullText = `— your digital watchdog! 🚀 Tired of toxic comments, harmful content, or misinformation? We automatically scan every page for you, or hit the Analyze button for a manual check. Using cutting-edge machine learning and Google APIs via our backend, this extension calculates a sentiment score and checks for misinformation with real fact-check data. If the score drops below 0 or content is flagged as unreliable — brace yourself — a popup will alert you. Browse safely! 😎`;
const shortText = `— your digital watchdog! 🚀 Tired of toxic comments, harmful content, or misinformation? We automatically scan every page, or hit Analyze for a manual check.`;

let isExpanded = false;
const harmfulModal = document.getElementById("harmfulModal");
const closeModal = document.getElementById("closeModal");

closeModal.addEventListener("click", () => {
  harmfulModal.style.display = "none";
});

toggleButton.addEventListener("click", () => {
  statement.textContent = isExpanded ? shortText : fullText;
  toggleButton.textContent = isExpanded ? "Read More" : "Read Less";
  isExpanded = !isExpanded;
  sentimentScoreElement.style.display = "none";
});

async function analyzeSentiment(text) {
  const response = await fetch('http://localhost:3000/analyze-sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text.substring(0, 1000) })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.documentSentiment.score;
}

async function detectMisinformation(url, text) {
  const response = await fetch('http://localhost:3000/detect-misinfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, text: text.substring(0, 1000) })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.status;
}

function displaySentimentScore(sentimentScore, misinfoStatus) {
  if (sentimentScore === null && misinfoStatus === null) {
    scoreValueElement.textContent = "No analysis available.";
    sentimentScoreElement.style.display = "flex";
    return;
  }
  sentimentScoreElement.style.display = "flex";
  scoreValueElement.textContent = sentimentScore?.toFixed(2) || "N/A";
  let misinfoElement = document.getElementById('misinfoStatus') || document.createElement('span');
  misinfoElement.id = 'misinfoStatus';
  misinfoElement.textContent = ` | Misinfo: ${misinfoStatus || 'Unknown'}`;
  sentimentScoreElement.appendChild(misinfoElement);

  scoreValueElement.classList.remove("positive", "negative", "neutral");
  if (sentimentScore < 0) scoreValueElement.classList.add("negative");
  else if (sentimentScore > 0) scoreValueElement.classList.add("positive");
  else scoreValueElement.classList.add("neutral");

  if (sentimentScore < 0 || misinfoStatus === 'unreliable') {
    harmfulModal.style.display = "flex";
    harmfulModal.querySelector('p').textContent = misinfoStatus === 'unreliable' ? "Potentially Misleading Content Detected!" : "Harmful Content Detected!";
  } else {
    harmfulModal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  harmfulModal.style.display = "none";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  chrome.runtime.sendMessage({ action: 'getSentimentScore' }, (response) => {
    if (response && response.tabId === tab.id) {
      displaySentimentScore(response.score, response.misinfo);
    }
  });
});

analyzeButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) {
    scoreValueElement.textContent = "Error: No active tab found.";
    sentimentScoreElement.style.display = "flex";
    return;
  }

  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => document.querySelector('article') || document.querySelector('main') || document.body.innerText
  });

  const text = result[0].result;
  if (!text) {
    scoreValueElement.textContent = "No text found on the page.";
    sentimentScoreElement.style.display = "flex";
    return;
  }

  try {
    const sentimentScore = await analyzeSentiment(text);
    const misinfoStatus = await detectMisinformation(tab.url, text);
    displaySentimentScore(sentimentScore, misinfoStatus);
    chrome.runtime.sendMessage({ 
      action: 'updateSentimentScore', 
      score: sentimentScore, 
      misinfo: misinfoStatus, 
      tabId: tab.id 
    });
  } catch (error) {
    scoreValueElement.textContent = `Error: ${error.message}`;
    sentimentScoreElement.style.display = "flex";
  }
});