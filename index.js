const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.SERVER_IP || 'your.server.ip',
    port: parseInt(process.env.SERVER_PORT) || 25565,
    username: process.env.BOT_NAME || 'AFK_Bot_247'
  });

  bot.on('spawn', () => {
    console.log(`[BOT] Connected to server as ${bot.username}`);
    
    // Anti-AFK: Move slightly every 30 seconds
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  // Auto-reconnect if kicked or disconnected
  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('[BOT] Error:', err.message);
  });
}

createBot();
