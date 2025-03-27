# CogniSafe: AI-Powered Detection of Online Harms
GDG Solution Challenge 2025

## Overview

CogniSafe effectively addresses the problem statement by providing an AI-powered solution to detect and mitigate harmful online content in real-time. By leveraging Google's Natural Language API and Fact Check Tools API, the extension accurately analyzes webpages for misinformation and negative sentiment, ensuring users get immediate response about unreliable content. Traditional moderation methods struggle with the increasing volume and complexity of online threats, but CogniSafe enhances detection at scale by integrating machine learning and natural language processing. Additionally, the Node.js backend efficiently proxies API requests, enabling seamless and efficient content analysis. This ensures a safer browsing experience, aligning with the objective of using AI-driven solutions to combat harmful content on online platforms.
💡 Why it Matters?
🚫 Fake news influences public opinion.
⚠️ Hate speech fuels cyberbullying.
🔍 Users need real-time, AI-powered insights while browsing.

CogniSafe empowers users with instant, data-backed credibility checks, ensuring they interact with trustworthy content.

## Features

- **Real-time Content Analysis**: Evaluates webpage sentiment and credibility instantly.
- **Hate Speech Detection:** Identifies potentially harmful or offensive language.
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
    └── axios/                    # Axios module

[ To ensure the proper functionality of the project, install the required dependencies, including Express and Axios, by running:
                                                          npm install
in your terminal.This will install all necessary modules listed in package.json, enabling seamless execution of the code.]
```

## Minimum Viable Product (MVP) Link

As Cognisafe is a Chrome extension, its core functionality is experienced directly within the user's web browser. The primary way to demonstrate the MVP is through the provided GitHub repository (https://github.com/gauthamkola/Cognisafe.git). By following the installation instructions given, users can load the extension into their Chrome browser and directly interact with its features, observing the sentiment analysis, hate speech detection, and misinformation identification capabilities as they browse web pages. The source code within this repository represents the functional MVP of Cognisafe.

Core Features:

Real-Time Content Analysis – Automatically evaluates webpage sentiment and credibility.

Hate Speech & Misinformation Detection – Flags harmful content and verifies claims using Google’s Fact Check API.

Visual Alerts & Interactive UI – Displays reliability indicators and allows users to analyze pages manually.

To see CogniSafe in action, check out the demo video [ https://youtu.be/ge9XguVj3EQ?si=O7DP7vxljAnGv7Cz ] and screenshots below:

![image](https://github.com/user-attachments/assets/c3a6597a-32c1-476a-85ca-c5eb302198be)

![image](https://github.com/user-attachments/assets/9a4e6e22-1286-4d7e-ad6f-b12458da745d)



## Cognisafe - Setup and Installation
### **Prerequisites**

- **Google Chrome** (latest version)
- **Node.js** (v16+ recommended, tested on v23.10.0)
- **npm** (Node Package Manager)
- **Google Cloud API Key** (for Natural Language API & Fact Check Tools API)

**1. Get the Code:**

* Clone the repository: `git clone (https://github.com/gauthamkola/Cognisafe.git)`
* Or download the ZIP and extract it.

**2. Load the Extension in Chrome:**

* Open Chrome and go to `chrome://extensions/`.
* Enable "Developer mode" (top right).
* Click "Load unpacked."
* Select the Cognisafe folder from your downloaded code.

**3. Backend Setup:**

* Navigate to the `backend` directory.
* Run `npm install`.
* Create a `.env` file with your Google Cloud API credentials (e.g., `GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"`).
  [For security reasons, we have removed our Google API key from the repository.]
* Run the backend: `npm start`.

**4. Use Cognisafe:**

* Browse the web.
* Click the Cognisafe icon for analysis results.
* Access options via the icon's right-click menu or the extensions page.

### **Configuration**

- **API Key**: Replace in `server.js`:
  ```javascript
  const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';
  ```
- **Backend URL**: Default is `http://localhost:3000`. Update in `background.js` and `popup.js` if needed.

## Usage
### **Automatic Analysis**

1. Open a webpage (e.g., **[https://www.thequint.com/]**).
2. The extension analyzes content and updates the icon:
   - ✅ **Green** (Safe content)
   - ⚠️ **Yellow**/**Red** (Misinformation detected)
3. Click the extension icon to view sentiment and credibility scores.

### **Manual Analysis**

1. Click the extension icon.
2. Press the **"Analyze"** button in the popup.
3. Results display webpage sentiment and potential misinformation warnings.

## **Demo Video link:**
https://youtu.be/ge9XguVj3EQ?si=O7DP7vxljAnGv7Cz

## Future Enhancements

- **Key phrase extraction** for better context analysis.
- **User-reported misinformation flagging**.
- **Mobile extension support** (Android & iOS browsers).
- **Integration with Google Gemini** for enhanced AI analysis.

## Team Members  

- Namratha Pavuluri  
- Gautham Kolagatla  
- Himanethri Kanamarlapudi  
- Govardhini Polisetti  

Built with precision and purpose, CogniSafe is our step toward a more ethical digital space. As we continue to enhance its features, we envision a future where AI-driven moderation becomes a cornerstone of online integrity.


