const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const bot = new Discord.Client();
const token = 'NDcxMDA2NjMzOTAwNjM4MjE5.Djei_A.rYxzsSO3rYpknf0CIIFjHdtjOGI';
const server_id = '443345054929518613';
const spam_channel = '443345906671157249';
const cmd_channel = '471008080096919573';

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
var servers = {};

  bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('kurew', { type: 'LISTENING' });
});

bot.on('message', async message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === '!say') {
        if (message.channel.id === cmd_channel) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            let botmessage = args.join(" ");
            message.delete().catch();
            var channel = bot.channels.get(spam_channel);
            channel.send(botmessage);
        }
        return;
    }
}

if(cmd === '!yt') {
    if (message.channel.id === cmd_channel) {
    if(!args[0]) {
        message.delete().catch();
        return;
    }
    if(!message.member.voiceChannel) {
        message.member.send("Musisz być na kanale głosowym.");
        message.delete().catch();
        return;
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
      var server = servers[message.guild.id];

    server.queue.push(args[0]);
    message.delete().catch();

      if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
            message.delete().catch();
      });
    }
}

    if(cmd === '!skip') {
        if (message.channel.id === cmd_channel) {
        var server = servers[message.guild.id];
        message.delete().catch();
        if(server.dispatcher) server.dispatcher.end();
        }
    }
    if(cmd === '!stop') {
        if (message.channel.id === cmd_channel) {
            var server = servers[message.guild.id];
            message.delete().catch();
            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            }
        }
    if(cmd === '/cmds') {
        if (message.channel.id === cmd_channel) {
            if(message.member.hasPermission("MANAGE_MESSAGES")) {
                let botmessage = args.join(" ");
                message.delete().catch();
                message.channel.send('```KOMENDY:\n!say [tekst] - pisanie na spamowej\n!yt [yt URL] - można dodać kilka piosenek pod rząd do kolejki\n!skip - pominięcie utworu i odtwarzanie następnego w kolejce\n!stop - zatrzymanie muzyki i wykopanie bota z kanału```'); 
            }
            return;
        }
            }
  });

bot.login(token);
