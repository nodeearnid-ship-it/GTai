const axios = require('axios');

// Ambil data dari Environment Variables (GitHub Secrets)
const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function sendSignal() {
  // Daftar aset untuk variasi sinyal
  const assets = ['BITCOIN OTC', 'GOLD OTC', 'ETH OTC', 'CRYPTO IDX', 'EUR/USD', 'USD/JPY'];
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
    "⚠️ *AUTO-SIGNAL BY GERON AI*";

  try {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: CHANNEL_ID,
      text: message,
      parse_mode: 'Markdown'
    });

    if (response.data.ok) {
      console.log('✅ Sinyal Berhasil Terkirim!');
    }
  } catch (error) {
    console.error('❌ Detail Error:');
    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    process.exit(1); // Paksa GitHub lapor "Fail" kalau gagal kirim
  }
}

sendSignal();
