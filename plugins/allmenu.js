module.exports = async ({ m, conn, state, config }) => {
    const { sendMessage } = state
    
    const menuText = `
╭━━━━━━━━━━━━━━━━━━━━━
┃ *📋 DAFTAR SEMUA MENU*
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *🤖 BOT*
├ ${config.prefa[0]}menu
├ ${config.prefa[0]}allmenu
├ ${config.prefa[0]}ping
├ ${config.prefa[0]}info
├ ${config.prefa[0]}owner
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *👥 GROUP*
├ ${config.prefa[0]}group open/close
├ ${config.prefa[0]}group kick @tag
├ ${config.prefa[0]}group promote @tag
├ ${config.prefa[0]}group demote @tag
├ ${config.prefa[0]}group listadmin
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *🎨 STICKER*
├ ${config.prefa[0]}sticker (reply image)
├ ${config.prefa[0]}stickerwm (reply image)
├ ${config.prefa[0]}takestick (ambil sticker)
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *📥 DOWNLOADER*
├ ${config.prefa[0]}ytmp3 [url]
├ ${config.prefa[0]}ytmp4 [url]
├ ${config.prefa[0]}tiktok [url]
├ ${config.prefa[0]}ig [url]
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *🎮 FUN*
├ ${config.prefa[0]}gacha
├ ${config.prefa[0]}apakah [pertanyaan]
├ ${config.prefa[0]}rate [sesuatu]
├ ${config.prefa[0]}truth
├ ${config.prefa[0]}dare
╰━━━━━━━━━━━━━━━━━━━━━

╭━━━━━━━━━━━━━━━━━━━━━
┃ *🛠️ TOOLS*
├ ${config.prefa[0]}toimg (reply sticker)
├ ${config.prefa[0]}nobg (reply image)
├ ${config.prefa[0]}styletext [teks]
├ ${config.prefa[0]}qrcode [teks]
╰━━━━━━━━━━━━━━━━━━━━━

*Total Command:* 30+ commands
*Status:* ✅ Active
`
    
    await sendMessage(m.chat, { text: menuText })
}
