const fs = require('fs-extra')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta')

module.exports = async ({ m, conn, state, config }) => {
    const { sendMessage } = state
    const jid = m.chat
    
    // Format waktu
    const waktu = moment().format('HH:mm')
    const tanggal = moment().format('DD/MM/YYYY')
    
    // Buat button list
    const buttons = [
        {
            buttonId: `${config.prefa[0]}allmenu`,
            buttonText: { displayText: '📋 ALL MENU' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}owner`,
            buttonText: { displayText: '👑 OWNER' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}info`,
            buttonText: { displayText: 'ℹ️ INFO BOT' },
            type: 1
        }
    ]
    
    // Tambahkan button tambahan
    const moreButtons = [
        {
            buttonId: `${config.prefa[0]}sticker`,
            buttonText: { displayText: '🎨 STICKER' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}group`,
            buttonText: { displayText: '👥 GROUP' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}fun`,
            buttonText: { displayText: '🎮 FUN' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}tools`,
            buttonText: { displayText: '🛠️ TOOLS' },
            type: 1
        },
        {
            buttonId: `${config.prefa[0]}downloader`,
            buttonText: { displayText: '📥 DOWNLOADER' },
            type: 1
        }
    ]
    
    // Teks menu
    const menuText = `
╭━━━「 *${config.botName}* 」
┃⏰ *Waktu:* ${waktu}
┃📅 *Tanggal:* ${tanggal}
╰━━━━━━━━━━━━━

╭━━━「 *MENU UTAMA* 」
┃
┃❖ *${config.prefa[0]}menu* - Menu utama
┃❖ *${config.prefa[0]}allmenu* - Semua menu
┃❖ *${config.prefa[0]}ping* - Cek kecepatan
┃❖ *${config.prefa[0]}owner* - Kontak owner
┃❖ *${config.prefa[0]}info* - Info bot
┃
╰━━━━━━━━━━━━━

╭━━━「 *KATEGORI* 」
┃
┃🎨 *Sticker* - Buat stiker dari gambar
┃👥 *Group* - Fitur grup
┃🎮 *Fun* - Game & hiburan
┃🛠️ *Tools* - Alat bantu
┃📥 *Downloader* - Download konten
┃
╰━━━━━━━━━━━━━

*Klik button di bawah untuk melihat menu lengkap...*
`
    
    try {
        // Kirim pesan dengan button list
        await sendMessage(jid, {
            text: menuText,
            footer: `© ${config.botName} | ${config.author}`,
            buttons: buttons,
            headerType: 1
        })
        
        // Kirim button kedua
        await sendMessage(jid, {
            text: "Pilih kategori yang diinginkan:",
            buttons: moreButtons,
            headerType: 1
        })
        
    } catch (error) {
        console.error('Menu Error:', error)
        await m.reply(config.mess.error)
    }
}
