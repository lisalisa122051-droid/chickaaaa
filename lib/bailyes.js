const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')
const NodeCache = require('node-cache')
const { color } = require('./color')
const fs = require('fs-extra')
const path = require('path')

const msgRetryCounterCache = new NodeCache()

module.exports = async function baileysConnection() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const { version } = await fetchLatestBaileysVersion()
    
    const conn = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, { log: console.log })
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        markOnlineOnConnect: true,
        getMessage: async (key) => {
            return {}
        }
    })
    
    // Store for message handling
    const store = {
        chats: [],
        contacts: {},
        messages: {}
    }
    
    // Helper function to send message
    const sendMessage = async (jid, content, options = {}) => {
        try {
            return await conn.sendMessage(jid, content, options)
        } catch (error) {
            console.error('Send Message Error:', error)
            throw error
        }
    }
    
    return {
        state: { conn, sendMessage, store },
        saveCreds
    }
}
