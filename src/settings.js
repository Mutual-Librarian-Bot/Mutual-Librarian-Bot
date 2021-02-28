import fs from 'fs'

const settingsFile = process.env.SETTINGS_FILE || "settings.json"

const settings = JSON.parse(fs.readFileSync(settingsFile, 'utf-8'))

if ('token' in settings) {
    console.warn(`!! Bot token was found in ${settingsFile}`)
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Refusing to start the bot with this configuration in a production environment')
    }
    else {
        console.warn('!! This will not run in a production environment')
    }
}
else if ('BOT_TOKEN' in process.env) {
    settings.token = process.env.BOT_TOKEN
}
else {
    throw new Error('Bot token not provided (BOT_TOKEN environment variable must be set)')
}

export default settings
