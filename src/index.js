import Discord from 'discord.js'
import Settings from './settings'
import About from './about'
import Commands from './commands'

console.log()
console.log(`>>> ${About.name} | ${About.version}`)
console.log(`>>> Written by ${About.authors.join(', ')}`)
console.log()

const client = new Discord.Client({disableEveryone: true})

client.on('ready', () => {
    console.log('Discord client is ready!')
    console.log(`${client.user.username}#${client.user.discriminator} (ID: ${client.user.id})`)

    console.log(`Using command prefix: ${Settings.prefix}`)

    client.user.setActivity(Settings.bot_activity.text, Settings.bot_activity.options)
})

client.on('message', message => {
    // [Ignore messages sent by this bot account]
    // [This avoids message loops.]
    if (message.author.id === client.user.id)
        return

    // [Check if this is a command (starts with the prefix)]
    if (message.content.startsWith(Settings.prefix)) {
        const args = message.content.split(/\s+/)
        const command = args.shift().slice(Settings.prefix.length)

        if (command in Commands) {
            const {
                action
            } = Commands[command]

            action(client, message, args)
        }
        else {
            console.log(`Command not found: ${command}`)
        }
    }
})

client.login(Settings.token)
