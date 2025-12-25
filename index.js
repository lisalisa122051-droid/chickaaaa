const { Boom } = require('@hapi/boom')
const fs = require('fs-extra')
const path = require('path')
const { color } = require('./lib/color')
const config = require('./config')
const handler = require('./handler')

async function startBot() {
    const { state, saveCreds } = await require('./lib/baileys')()
    
    // Load handler
    handler({ state, saveCreds })
    
    console.log(color('[SYSTEM]', 'magenta'), color('Bot berhasil terhubung!', 'green'))
}

startBot().catch(console.error)

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
})
