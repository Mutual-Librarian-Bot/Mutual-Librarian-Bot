import About from '../about'
const { name, version, authors } = About

export default {
    description: 'Displays information about the bot.',
    action: (client, message, []) => {
        message.channel.send(`${name}\nVersion ${version}\nWritten by ${authors.join(', ')}`)
    }
}
