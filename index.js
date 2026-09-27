const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.SERVER_IP || 'your.server.ip',
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: process.env.BOT_NAME || 'AFK_Bot_247'
  });

  const password = process.env.BOT_PASSWORD || 'MySecureBotPass123!';

  // Handle AuthMe login/register prompts automatically
  bot.on('message', (message) => {
    const text = message.toString().toLowerCase();

    if (text.includes('/register')) {
      console.log('[BOT] Registering account...');
      bot.chat(`/register ${password} ${password}`);
    } else if (text.includes('/login')) {
      console.log('[BOT] Logging in...');
      bot.chat(`/login ${password}`);
    }
  });

  bot.on('spawn', () => {
    console.log(`[BOT] Connected to server as ${bot.username}`);

    // Anti-AFK: Jump every 30 seconds to stay active
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('[BOT] Error:', err.message);
  });
}

createBot();
