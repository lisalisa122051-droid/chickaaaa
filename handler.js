const fs = require('fs-extra')
const path = require('path')
const { color, log } = require('./lib/color')

module.exports = handler = async ({ state, saveCreds }) => {
    const { conn, sendMessage, store } = state
    
    // Load plugins
    const pluginsPath = './plugins'
    const plugins = new Map()
    
    const loadPlugins = async () => {
        const files = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'))
        
        for (const file of files) {
            try {
                const plugin = require(path.join(__dirname, pluginsPath, file))
                plugins.set(file.replace('.js', ''), plugin)
                log(`✓ Plugin ${file} loaded`, 'green')
            } catch (error) {
                log(`✗ Failed to load ${file}: ${error.message}`, 'red')
            }
        }
    }
    
    await loadPlugins()
    
    // Event handling
    conn.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return
        
        try {
            const { serialize } = require('./lib/serialize')
            const m = serialize(JSON.parse(JSON.stringify(msg)), conn)
            
            // Auto read
            await conn.readMessages([m.key])
            
            // Check if message is command
            const body = m.text ? m.text.toLowerCase() : ''
            const isCmd = body.startsWith(config.prefa[0]) || 
                         body.startsWith(config.prefa[1]) || 
                         body.startsWith(config.prefa[2]) ||
                         body.startsWith(config.prefa[3])
            
            if (!isCmd) return
            
            const cmd = body.slice(1).trim().split(' ')[0].toLowerCase()
            const args = body.slice(body.indexOf(' ') + 1).trim()
            
            // Execute command
            if (plugins.has(cmd)) {
                const plugin = plugins.get(cmd)
                await plugin({ m, conn, args, state, config })
            } else if (plugins.has('menu') && (cmd === 'help' || cmd === 'menu')) {
                await plugins.get('menu')({ m, conn, args, state, config })
            }
            
        } catch (error) {
            console.error('Handler Error:', error)
        }
    })
    
    // Connection update
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== 401
            console.log(color('[SYSTEM]', 'red'), 'Connection closed, reconnecting...')
            if (shouldReconnect) startBot()
        } else if (connection === 'open') {
            console.log(color('[SYSTEM]', 'green'), 'Connected to WhatsApp!')
        }
    })
    
    // Save credentials
    conn.ev.on('creds.update', saveCreds)
}
