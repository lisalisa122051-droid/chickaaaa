const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs-extra')

if (!fs.existsSync('./database.json')) {
    fs.writeFileSync('./database.json', JSON.stringify({ users: [], groups: [] }, null, 2))
}

const adapter = new FileSync('./database.json')
const db = low(adapter)

db.defaults({ users: [], groups: [], settings: {} }).write()

module.exports = {
    db,
    
    addUser: (jid, name = 'User') => {
        const user = db.get('users').find({ id: jid }).value()
        if (!user) {
            db.get('users').push({
                id: jid,
                name: name,
                premium: false,
                limit: 100,
                registered: new Date().toISOString()
            }).write()
        }
    },
    
    getUser: (jid) => {
        return db.get('users').find({ id: jid }).value()
    },
    
    addGroup: (jid, name = 'Group') => {
        const group = db.get('groups').find({ id: jid }).value()
        if (!group) {
            db.get('groups').push({
                id: jid,
                name: name,
                welcome: true,
                antilink: false,
                registered: new Date().toISOString()
            }).write()
        }
    }
}
