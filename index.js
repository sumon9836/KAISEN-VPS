const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const REPO_URL = "https://github.com/sumon9836/KAISEN-MD-V2";
const CLONE_DIR = "KAISEN-MD-V2";
const CONFIG_PATH = path.join(CLONE_DIR, 'config.js');

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function updateConfigJs(sessionId) {
  let configData = fs.readFileSync(CONFIG_PATH, 'utf-8');

  const updatedConfig = configData.replace(
    /SESSION_ID:\s*process\.env\.SESSION_ID\s*\|\|\s*['"`]update this['"`]/,
    `SESSION_ID: '${sessionId}'`
  );

  fs.writeFileSync(CONFIG_PATH, updatedConfig, 'utf-8');
  console.log("🌀 SESSION_ID saved");
}

async function setupSessionId() {
  const configData = fs.readFileSync(CONFIG_PATH, 'utf-8');

  if (configData.includes("SESSION_ID: '") && !configData.includes("update this")) {
    console.log("🌈 SESSION_ID already");
    return;
  }

  const sessionId = await ask('🍉 Enter your SESSION_ID:\n🍉 Enter your SESSION_ID');
  await updateConfigJs(sessionId);
}

async function main() {
  try {
    if (!fs.existsSync(CLONE_DIR)) {
      console.log("🤍 Cloning KAISEN...");
      execSync(`git clone ${REPO_URL}`, { stdio: 'inherit' });
    } else {
      console.log("🍓 Repo exists");
    }

    await setupSessionId();

    console.log("🍒 Installing dependencies...");
    execSync(`npm install`, { cwd: CLONE_DIR, stdio: 'inherit' });

    console.log("🔮 Starting KAISEN-MD-V2 bot...");
    execSync(`npm start`, { cwd: CLONE_DIR, stdio: 'inherit' });

  } catch (error) {
    console.error("🥲 Error:", error.message);
  }
}

main();
