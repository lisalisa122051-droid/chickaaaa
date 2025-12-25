module.exports = {
    serialize: (msg, conn) => {
        try {
            const m = msg
            if (!m) return m
            
            const sender = m.key.fromMe ? conn.user.id : m.key.participant || m.key.remoteJid
            const chat = m.key.remoteJid
            
            // Format group JID to use @lid
            const formattedChat = chat.endsWith('@g.us') ? chat.replace('@g.us', '@lid') : chat
            
            return {
                ...m,
                sender,
                chat: formattedChat,
                from: formattedChat,
                isGroup: formattedChat.endsWith('@lid'),
                isPrivate: !formattedChat.endsWith('@lid'),
                text: () => {
                    const message = m.message
                    if (!message) return ''
                    
                    const type = Object.keys(message)[0]
                    if (type === 'conversation') return message[type]
                    if (type === 'extendedTextMessage') return message[type].text
                    if (message[type]?.text) return message[type].text
                    return ''
                },
                reply: async (text, options = {}) => {
                    return await conn.sendMessage(formattedChat, { text }, { quoted: m, ...options })
                },
                react: async (emoji) => {
                    return await conn.sendMessage(formattedChat, {
                        react: {
                            text: emoji,
                            key: m.key
                        }
                    })
                }
            }
        } catch (error) {
            console.error('Serialize Error:', error)
            return msg
        }
    }
}
