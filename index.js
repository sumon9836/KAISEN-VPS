const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const REPO_URL = "https://github.com/sumon9836/KAISEN-MD-V2";
const CLONE_DIR = "KAISEN-MD-V2";
const ENV_PATH = path.join(CLONE_DIR, 'config.env');

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

async function setupEnv() {
  if (fs.existsSync(ENV_PATH)) {
    const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    if (envContent.includes('SESSION_ID=')) {
      console.log("🌈 𝐂𝐡𝐞𝐜𝐤 𝐲𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃");
      return;
    }
  }

  const sessionId = await ask('🍉 𝐄𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃\n🍉 𝐄𝐧𝐭𝐞𝐫 𝐲𝐨𝐮𝐫 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃');
  fs.writeFileSync(ENV_PATH, `SESSION_ID=${sessionId}\n`, 'utf-8');
  console.log("🌀 𝐒𝐄𝐒𝐒𝐈𝐎𝐍_𝐈𝐃 𝐬𝐚𝐯𝐞");
}

async function main() {
  try {
    if (!fs.existsSync(CLONE_DIR)) {
      console.log("🤍 𝐂𝐥𝐨𝐧𝐢𝐧𝐠 𝐊𝐀𝐈𝐒𝐄𝐍...");
      execSync(`git clone ${REPO_URL}`, { stdio: 'inherit' });
    } else {
      console.log("🍓 𝐂𝐡𝐞𝐜𝐤𝐢𝐧𝐠 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞.");
    }

    await setupEnv();

    console.log("🍒 𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐢𝐧𝐠 𝐝𝐞𝐩𝐞𝐧𝐝𝐞𝐧𝐜𝐢𝐞𝐬...");
    execSync(`npm install`, { cwd: CLONE_DIR, stdio: 'inherit' });

    console.log("🔮 𝐒𝐭𝐚𝐫𝐭𝐢𝐧𝐠 𝐊𝐀𝐈𝐒𝐄𝐍-𝐌𝐃-𝐕𝟐 𝐛𝐨𝐭...");
    execSync(`npm start`, { cwd: CLONE_DIR, stdio: 'inherit' });

  } catch (error) {
    console.error("🥲 Error:", error.message);
  }
}

main();
