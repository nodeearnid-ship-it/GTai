const axios = require('axios');

const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function sendSignal() {
  const assets = [
    'ASIA COMPOSITE INDEX', 
    'BITCOIN OTC', 
    'COMPOUND INDEX', 
    'GOLD OTC'
  ];
  
  const directions = ['🟢 BUY / CALL', '🔴 SELL / PUT'];
  
  const randomAsset = assets[Math.floor(Math.random() * assets.length)];
  const randomDir = directions[Math.floor(Math.random() * directions.length)];

  const message = 
    "📊 *GERON PREDICTOR SIGNAL*\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "ASSET    : `" + randomAsset + "`\n" +
    "ORDER    : *" + randomDir + "*\n" +
    "DURATION : `1 MINUTE`\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "🤖 *BELI BOT TRADING DI:* @gerontrader\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "⚠️ *AUTO-SIGNAL BY GERON AI*";

  try {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('✅ Sinyal ' + randomAsset + ' Berhasil Terkirim!');
  } catch (error) {
    console.error('❌ Error:', error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

sendSignal();
