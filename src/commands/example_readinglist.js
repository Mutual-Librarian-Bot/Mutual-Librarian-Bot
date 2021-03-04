import { Base, Discord, MessageEmbed } from 'discord.js'

export default {
    description: 'Displays an example reading list',
    action: async (client, message, []) => 
    {
      const embed = 
      {
        title: "**__Example Reading List__**",
        description: "Shows example literature",
        color: 0xFFBFFC,
        footer: 
        {
          icon_url: client.user.displayAvatarURL,
          text: "This is just an example reading list."
        },
        thumbnail: 
        {
          url: client.user.displayAvatarURL
        },
        author: 
        {
          name: client.user.username,
          icon_url: client.user.displayAvatarURL
        },
        fields: 
        [
          {
            "name": "Debt",
            "value": "[The First 5,000 Years by David Graeber](https://theanarchistlibrary.org/library/david-graeber-debt)\n\n",
            "inline": false
          },
          {
            "name": "Capitalism is Killing the Earth",
            "value": "[An Anarchist Guide to Ecology by Anarchist Federation, John Warwick](https://theanarchistlibrary.org/library/john-warwick-capitalism-is-killing-the-earth)\n\n",
            "inline": false
          },
          {
            "name": "Modern Science and Anarchism",
            "value": "[by Peter Kropotkin](http://theanarchistlibrary.org/library/petr-kropotkin-modern-science-and-anarchism)\n\n",
            "inline": false
          },
          {
            "name": "The Question of Copyright",
            "value": "[by James L. Walker](https://theanarchistlibrary.org/library/james-l-walker-the-question-of-copyright)\n\n",
            "inline": false
          },
          {
            "name": "The Iron Fist Behind The Invisible Hand",
            "value": "[Corporate Capitalism As a State-Guaranteed System of Privilege by Kevin Carson](https://theanarchistlibrary.org/library/james-l-walker-the-question-of-copyright)",
            "inline": false
          }
        ]
      };
        message.channel.send({ embed });
    }
}