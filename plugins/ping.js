module.exports = async ({ m, conn, state, config }) => {
    const start = new Date().getTime()
    await m.reply('Testing ping...')
    const end = new Date().getTime()
    const speed = end - start
    
    await m.reply(`🏓 *Pong!*\nKecepatan: ${speed}ms`)
}
