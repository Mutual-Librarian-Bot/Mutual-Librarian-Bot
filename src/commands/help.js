import Settings from '../settings'
import { Util } from 'discord.js'

const escapedPrefix = Util.escapeMarkdown(Settings.prefix)

async function generateHelpText() {
    const { default: Commands } = await import('./index.js')
    return Object.entries(Commands).map(([name, { description }]) => `${escapedPrefix}${name} : ${description}`).join('\n')
}

let helpText = ""

export default {
    description: 'Displays this help text.',
    action: async (client, message, []) => {
        if (helpText === '') {
            helpText = await generateHelpText()
        }
        message.channel.send(helpText)
    }
}
