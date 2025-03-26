# CogniSafe: AI-Powered Detection of Online Harms

## Overview

CogniSafe is a Chrome extension designed to detect and flag online harms, including misinformation and negative sentiment, in real-time. With misinformation spreading six times faster than factual content (MIT, 2018), CogniSafe leverages Google’s Natural Language API and Fact Check Tools API to analyze webpages and provide immediate feedback to users. The extension integrates a Node.js backend to proxy API requests and ensures seamless, efficient detection of unreliable content.

## Features

- **Real-time Content Analysis**: Evaluates webpage sentiment and credibility instantly.
- **Misinformation Detection**: Checks claims against a database of 1.8M+ verified fact checks.
- **Chrome Extension UI**: Interactive popup to analyze pages manually or automatically.
- **Backend Proxy Server**: Securely routes requests to Google APIs using Node.js and Express.
- **Icon Alerts**: Indicates webpage reliability through visual cues in the extension toolbar.

## Technologies Used

### **Frontend** (Chrome Extension)

- **HTML**: Structures the extension popup UI.
- **CSS**: Styles the popup with responsive design and Google Fonts.
- **JavaScript**: Implements core extension logic.
- **Chrome Extension APIs**:
  - `chrome.tabs`: Monitors and interacts with active webpages.
  - `chrome.scripting`: Extracts and processes page text.
  - `chrome.runtime`: Facilitates communication between scripts.

### **Backend** (Proxy Server)

- **Node.js**: Server-side runtime for efficient API proxying.
- **Express.js**: Lightweight web framework for routing API calls.
- **Axios**: HTTP client for making requests to Google APIs.
- **Google APIs**:
  - **Natural Language API**: Analyzes webpage sentiment (-1 to +1 scale).
  - **Fact Check Tools API**: Verifies misinformation claims.

## Project File Structure

```
/Users/gauthamkolagatla/Desktop/online-harm-detector25/
├── cognisafe-extension/          # Chrome extension frontend
│   ├── manifest.json            # Extension configuration
│   ├── background.js            # Automatic content analysis
│   ├── popup.js                 # Popup script for UI interaction
│   ├── popup.html               # HTML layout for popup
│   ├── popup.css                # Styling for popup UI
│   ├── icons/                   # Folder for extension icons
│   │   ├── icon-16.png          # Standard 16x16 icon
│   │   ├── icon-16-warning.png  # Warning 16x16 icon
│   │   ├── icon-48.png          # Standard 48x48 icon
│   │   └── icon-128.png         # Standard 128x128 icon
└── proxy-server/                 # Backend server
    ├── server.js                 # Express server logic
    ├── package.json              # Backend dependencies
    ├── package-lock.json         # Auto-generated lockfile
    ├── node_modules/             # Installed dependencies
    ├── express/                  # Express module
    ├── axios/                    # Axios module
    └── [other submodules]        # Additional dependencies
```

## Setup and Installation

### **Prerequisites**

- **Google Chrome** (latest version)
- **Node.js** (v16+ recommended, tested on v23.10.0)
- **npm** (Node Package Manager)
- **Google Cloud API Key** (for Natural Language API & Fact Check Tools API)

### **Backend Setup**

1. Navigate to the backend directory:
   ```bash
   cd /Users/gauthamkolagatla/Desktop/online-harm-detector25/proxy-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   - Runs the server on **[http://localhost:3000](http://localhost:3000)**.
   - Verify by visiting **[http://localhost:3000](http://localhost:3000)** (should return "Cannot GET /", expected for POST-only routes).

### **Extension Setup**

1. Clone or download the repository.
2. Open **chrome://extensions/** in Chrome.
3. Enable **Developer mode** (top-right toggle switch).
4. Click **Load unpacked** and select `cognisafe-extension/`.
5. The extension will now appear in the toolbar. Pin it for easy access.

### **Configuration**

- **API Key**: Replace in `server.js`:
  ```javascript
  const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';
  ```
- **Backend URL**: Default is `http://localhost:3000`. Update in `background.js` and `popup.js` if needed.

## Usage

### **Automatic Analysis**

1. Open a webpage (e.g., **[https://www.bbc.com/news](https://www.bbc.com/news)**).
2. The extension analyzes content and updates the icon:
   - ✅ **Green** (Safe content)
   - ⚠️ **Yellow** (Misinformation detected)
3. Click the extension icon to view sentiment and credibility scores.

### **Manual Analysis**

1. Click the extension icon.
2. Press the **"Analyze"** button in the popup.
3. Results display webpage sentiment and potential misinformation warnings.

## Debugging & Troubleshooting

### **Common Issues & Fixes**

| Issue                        | Solution                                                               |
| ---------------------------- | ---------------------------------------------------------------------- |
| "Cannot find module 'axios'" | Run `npm install` in `proxy-server/`                                   |
| Port conflict (3000)         | Run `lsof -i :3000` and `kill -9 <PID>`, or change port in `server.js` |
| "Connection refused" error   | Ensure backend server is running (`npm start`)                         |
| API Key issues               | Check Google Cloud Console for valid key and permissions               |

## Future Enhancements

- **Key phrase extraction** for better context analysis.
- **User-reported misinformation flagging**.
- **Mobile extension support** (Android & iOS browsers).
- **Integration with Google Gemini** for enhanced AI analysis.

## License

This project is licensed under the **MIT License** – free to use, modify, and distribute.

## Additional Files

- **LICENSE**: MIT License file.
- **.gitignore**: Excludes `node_modules/`, `.env`, and other unnecessary files from Git tracking.

&#x20;

