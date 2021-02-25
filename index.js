// [Constant Declarations]
const Discord = require('discord.js');

const fs = require('fs');

const Papa = require('papaparse');

const { token, prefix, botpresence } = require('./botsettings.json');


const { ch_about, ch_help } = require('./command_help.json');
const { mlib_bookmark } = require('./command_help.json');
const { ab_author, ab_datemodified } = require('./about.json');


// [This is made hard-coded instead of within a .json for easy edits of versions.]
const version = "2021.02.21-001"; // [YEAR.MONTH.DAY-Increment+1]


const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity(botpresence.text, {type: botpresence.type, url: botpresence.streamurl });
})


bot.on('message', message =>
{

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    // [Informational Commands: about; help]
    if(command === 'about')
    {
        return message.channel.send(ab_author + 'Current Version: ' + version + ab_datemodified);
    }

    
    if(command === 'help')
    {
        return message.channel.send(ch_about + ch_help + mlib_bookmark);
    }


    // [General User Commands: create reading list, view reading list, add to reading list, completed reading, create bookmark, highlight page, review book, etc.]

    // [Create Reading List]
    if(command === 'rl')
    {
        var parameter1 = args[0];
        var messageAuthorID = message.author.id;

        console.log('parameter1: [' + parameter1 + ']\nmessageAuthorID: [' + messageAuthorID + ']');

        if(!args.length)
        {
            return message.channel.send(`Sorry, you didn't provide enough parameters.`);
        }
        else if(parameter1 === '-c' || parameter1 === '-create')
        {
           fs.access(messageAuthorID + '.csv', constants.F_OK, (error) =>
           {
               console.log(`${file} ${error ? 'does not exist' : 'exists'}`);
           });
        }
    }
    
    // [Server-based Commands: donate to bookshelf, view bookshelf, etc.]



    // [Little Testing Section - Basic Tests]
    // [Create File via Node.js's FS - https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/]
    if(command === 'writefile1')
    {
        fs.writeFile('newfile.txt', '[newfile.txt] Learn Node FS module', function (err)
        {
            if (err) throw err;
            
            console.log('File is created successfully!');
            return message.channel.send('File created successfully!');
        });
    }

    // [Create File with UserID as filename]
    if(command === 'writefile2')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".txt";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]");
        message.channel.send("The message author's userID was: **[**" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]**");

        fs.writeFile(newFileName, '[' + newFileName + '] example text', function (err)
        {
            if (err) throw err;

            console.log('File created successfully!');
            return message.channel.send('File created successfully!');
        });
    }


    // [Read File]
    if(command === 'readfile1')
    {
        fs.readFile('newfile.txt', function(err, data)
        {
            if (err) throw err;
            console.log(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
            return message.channel.send(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
        });
    }

    if(command === 'readfile2')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".txt";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]");
        message.channel.send("The message author's userID was: **[**" + messageAuthorID + "**]**\nnewFileName was: **[**" + newFileName + "**]**");

        fs.readFile(newFileName, function(err, data)
        {
            if (err) throw err;
            console.log(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
            return message.channel.send(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
        });
    }


    // [Append to File; when the time is right to take user input, args[0] is what to append]
    if(command === 'appendfile1')
    {
        var data = "\nLearn Node.js with the help of well built Node.js Tutorial.";

        fs.appendFileSync('newfile.txt', data, 'utf8');
        console.log("Data is appended to file successfully!");
        return message.channel.send('Data is appended to file successfully!');
    }

    if(command === 'appendfile2')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".txt";

        var data = args.join(" ") + "\n";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]\nData was: [" + data + "]");

        fs.appendFileSync(newFileName, data, 'utf8');
        console.log("Data is appended to file successfully!");
        return message.channel.send('Data is appended to file successfully!');
    }



    // [Little Testing Section - CSV Tests]
    // [Create .csv File, complete with header format | Title,Subtitle,Author,Link (,DateAdded?)]
    if(command === 'writecsv')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".csv";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]");
        message.channel.send("The message author's userID was: **[**" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]**");

        fs.writeFile(newFileName, 'Title,Subtitle,Author,Link\n', function (err)
        {
            if (err) throw err;

            console.log('File created successfully!');
            return message.channel.send('File created successfully!');
        });
    }


    // [Read .csv File]
    if(command === 'readcsv')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".csv";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]");
        message.channel.send("The message author's userID was: **[**" + messageAuthorID + "**]**\nnewFileName was: **[**" + newFileName + "**]**");

        fs.readFile(newFileName, function(err, data)
        {
            if (err) throw err;
            console.log(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
            return message.channel.send(`Here's what was in the file: **[**` + data.toString('utf8') + `**]**`);
        });
    }


    // [Append to .csv File - Eventually this will need to be flushed out into args[x] for Title,Subtitle,Author,Link,etc]
    if(command === 'appendcsv')
    {
        var messageAuthorID = message.author.id;
        var newFileName = messageAuthorID + ".csv";

        var data = args.join(",") + "\n";

        console.log("The message author's userID was: [" + messageAuthorID + "]\nnewFileName was: [" + newFileName + "]\nData was: [" + data + "]");

        fs.appendFileSync(newFileName, data, 'utf8');
        console.log("Data is appended to file successfully!");
        return message.channel.send('Data is appended to file successfully!');
    }


    // [Parse .csv File]


    // [Etc.]

});



bot.login(token);