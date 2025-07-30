// 👉 Set your SESSION_ID here
const SESSION_ID_VALUE = 'yourSessionID#key'; // <-- Put your actual ID here






const { execSync } = require('child_process');const fs = require('fs');
const path = require('path');
const REPO_URL = "https://github.com/sumon9836/KAISEN-MD-V2";
const CLONE_DIR = "KAISEN-MD-V2";
const CONFIG_PATH = path.join(CLONE_DIR, 'config.js');
function validateSessionId(sessionId) {
  if (!sessionId || sessionId.trim() === '' || sessionId.includes('yourSessionID')) {
    console.error("❌ SESSION_ID is missing or not configured. Please set SESSION_ID_VALUE at the top of the script.");
    process.exit(1);
  }
}
function updateConfigJs(sessionId) {
  let configData = fs.readFileSync(CONFIG_PATH, 'utf-8');

  const updatedConfig = configData.replace(
    /SESSION_ID:\s*process\.env\.SESSION_ID\s*\|\|\s*['"`][^'"`]*['"`],?/,
    `SESSION_ID: '${sessionId}',`
  );
fs.writeFileSync(CONFIG_PATH, updatedConfig, 'utf-8');
  console.log("🌀 SESSION_ID saved");
}
function setupSessionId() {
  const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');

  if (configData.includes("SESSION_ID: '") && !configData.includes("update this")) {
    console.log("🌈 SESSION_ID already set");
    return;
  }
updateConfigJs(SESSION_ID_VALUE);
}
function main() {
  try {
    validateSessionId(SESSION_ID_VALUE);
     if (!fs.existsSync(CLONE_DIR)) {
      console.log("🤍 Cloning KAISEN...");
      execSync(`git clone ${REPO_URL}`, { stdio: 'inherit' });
    } else {
      console.log("🍓 Repo exists");
    }
setupSessionId();
    console.log("🔮 Starting KAISEN-MD-V2 bot...");
    execSync(`npm start`, { cwd: CLONE_DIR, stdio: 'inherit' });
  } catch (error) {
    console.error("🥲 Error:", error.message);
    process.exit(1);
  }
}
main();
