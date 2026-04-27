const axios = require('axios');

// Mengambil Token dan Channel ID dari GitHub Secrets
const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function sendSignal() {
  const assets = ['BITCOIN OTC', 'GOLD OTC', 'ETH OTC', 'CRYPTO IDX', 'EUR/USD', 'USD/JPY'];
  const directions = ['🟢 BUY / CALL', '🔴 SELL / PUT'];
  const durations = ['1 MINUTE', '2 MINUTES', '3 MINUTES'];

  const randomAsset = assets[Math.floor(Math.random() * assets.length)];
  const randomDir = directions[Math.floor(Math.random() * directions.length)];
  const randomDur = durations[Math.floor(Math.random() * durations.length)];

  // Desain pesan Cyber-Neubrutalism khas Geron
  const message = 
    "📊 *GERON PREDICTOR SIGNAL*\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "ASSET    : `" + randomAsset + "`\n" +
    "ORDER    : *" + randomDir + "*\n" +
    "DURATION : `" + randomDur + "`\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "🕒 " + new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta' }) + " WIB\n" +
    "⚠️ *AUTO-SIGNAL BY GERON AI*";

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
  
  try {
    await axios.post(url, {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('✅ Sinyal berhasil meluncur ke @gtsignalai');
  } catch (error) {
    console.error('❌ Gagal kirim sinyal:', error.response ? error.response.data : error.message);
    process.exit(1); // Memberitahu GitHub jika gagal
  }
}

sendSignal();
