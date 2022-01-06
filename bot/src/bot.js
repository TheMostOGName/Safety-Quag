let data = require('./data.json');
let secrets = require('./secrets.json');
var elizabot = require('./elizabot.js');
// secrets.json contains the bot's token. This is the only file that has been modified from the version that is actually used. 
let random = require('./rand.json')
let counter = 0;
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

//A list of all the commands, their descriptions, what to do when someone runs them, ect. 
let commands = {
    "toag": {
        "desc": "TOAG",
        "f": function(msg, args) {
            msg.channel.send("TOAG");
        }
    }, 
    
    "help": {
        "desc": "Shows a list of all commands",
        "f": function(msg, args) {
            let limit   = 8;
            let width   = 30;
            let cmds    = [];
            let longest = 1;
            let page    = args[1] !== undefined ? parseInt(args[1])-1 : 0;

            for (let command in commands) {
                if (command.length > longest) longest = command.length;
                cmds.push([command, commands[command].desc]);
            }
            
            if (page >= Math.ceil(cmds.length/limit) || page < 0 || page == NaN) {
                msg.channel.send("that is simply not a help page");
                return;
            }

            cmds.sort((a, b) => a[0].localeCompare(b[0]))

            let out = `Type \`${data.prefix[0]}cmd <command>\` for help on a specific command, & \`${data.prefix[0]}help <number>\` to go a specific page. \n\`\`\`\n`;
            let num = 0;
            let i   = 0;
            cmds.forEach(cmd => {
                if (cmd.hide) return;
                if (i < (page * limit)) {
                    i++;
                    return;
                }
                if (num >= limit) return;
                num++;
                let line = `${cmd[0].padStart(longest, ' ')}: ${cmd[1]}`;
                if (line.length > width) {
                    line = line.substring(0, width-3);
                    line += "...";
                }
                out += line + "\n";
            });
            out += `\`\`\`\nPage ${page+1}/${Math.ceil(cmds.length/limit)}`;

            msg.channel.send(out);
        }
    },
    "cmd": {
        "desc": "Get help on a specific command",
        "f": function(msg, args) {
            if (commands[args[1].toString()] == undefined) {
                msg.channel.send("That's not a command you doink");
                return;
            }
            msg.channel.send(`\`\`\`${args[1]}: ${commands[args[1]].desc}\n\`\`\``)
        }
    },
    
    "error": {
        "desc": "Raises an error to test the bot's error handling.",
        "f": function(msg, args) {
            throw "error test";
        }
    },

    "code": {
        "desc": "Shows source code of bot",
        "f": function(msg, args) {
            msg.channel.send("<:quagheart:925458036737327184> Hiya! Thanks for checking out the source code!! Here's the link:\n    <https://github.com/TheMostOGName/Safety-Quag/>");
        }
    },

    "creator": {
        "desc": "Info about who made this",
        "f": function(msg, args) {
            msg.channel.send({
                "content": "Hiya! I'm Safetyquag, and I'm run and developed by Kenorbs. If you have any comments, questions, or concerns, ask Kenorbs! My code can be found by running `code`.",
            });
        }
    },
    
    "threat": {
        "desc": "Threats :)",
        "f": function(message, args) {
            message.channel.send(random.threats[Math.floor((Math.random() * random.threats.length))])
        }
    },
    "insult": {
        "desc": "Controlled bullying",
        "f": function(message, args) {
            message.channel.send(random.insults[Math.floor((Math.random() * random.insults.length))])
        }
    },

    "quag": {
        "desc": "quaaaaaag",
        "f": function(msg, args) {
            msg.channel.send("QUAAAAG");
        }
    },

    "joke": {
        "desc": "(you)",
        "f": function(message, args) {
            console.log(random);
            message.channel.send(random.jokes[Math.floor((Math.random() * random.jokes.length))])
        }

    },
    "BOFH": {
        "desc": "The Bastard Operator From Hell",
        "f": function(message, args) {
            message.channel.send(random.BOFH[Math.floor((Math.random() * random.BOFH.length))])
        }

    },

    "exit": {
        "desc": "Closes bot, staff only",
        "f": function(msg, args, ) {
            if (msg.member.roles.cache.some(role => role.id == "402227288285904907") ||
                msg.author.id == "730177830201196585") {
                process.exit();
            } else {
                msg.channel.send({"content": "You do not have permission to use that command <:madsire:925458037056098424>"});
            }
        }
    },
    
    "get-role": {
        "desc": "Get Icon Roles! Avaliable roles: Wooper, Quag, Sandshrew, Lotad, Huntail",
        "f": function (message, args) {
            console.log(args[1])
            //get icon roles by ID
            let wooper = message.guild.roles.cache.get("904105130151006269");
            let quagdev = message.guild.roles.cache.get("925417772689817630");
            let quag = message.guild.roles.cache.get("904634145899151410");
            let sandshrew = message.guild.roles.cache.get("893012538705453087");
            let lotad = message.guild.roles.cache.get("904634350455382037");
            let huntail = message.guild.roles.cache.get("904634480579452928");
            let secretRole = message.guild.roles.cache.get("926950238252576808");
            let member = message.member

            if (args[1] == "Wooper" || args[1] == "wooper") {
                var role = wooper;
            } else {
            if (args[1] == "Quag" || args[1] == "quag") {
                var role = quag;
            } else {
            if (args[1] == "Sandshrew" || args[1] == "sandshrew") {
                var role = sandshrew;
            } else {
            if (args[1] == "Lotad" || args[1] == "lotad") {
                var role = lotad;
            } else {
            if (args[1] == "Huntail" || args[1] == "huntail") {
                var role = huntail;
            } else {
            if (args[1] == "Overlord") {
                message.channel.send("Imagine not having Overlord :sunglasses:", {tts: true});
                var check = "true";
            } else {
            if (args[1] == "Secret™") {
                var role = secretRole;
            } else {
            var role = null; 
            var check = null;
            }}}}}}};

            if (role == null && check != "true") {
                message.channel.send("Sorry, this is not a valid role.");
            }
            if (role == "Overlord") {
                return
            }
            //give the role
            member.roles.add(role).catch(console.error);
            if (role != null && role != secretRole) {
                message.channel.send(`Enjoy your ${role} role :D`);
            }
            if (role == secretRole) {
                message.author.send(`Congratulations! You have obtained the Super Secret Role™! Telling other users how to isn't allowed, so don't do it :sunglasses:`);
                message.delete(); 
            }
            //reset the role value
            var role = null; 
            console.log(role);
        }
    },
        "remove-role": {
            "desc": "Remove your Icon Roles!",
            "f": function (message, args) {
                console.log(args[1])
                //get icon roles by ID
                let wooper = message.guild.roles.cache.get("904105130151006269");
                let quagdev = message.guild.roles.cache.get("925417772689817630");
                let quag = message.guild.roles.cache.get("904634145899151410");
                let sandshrew = message.guild.roles.cache.get("893012538705453087");
                let lotad = message.guild.roles.cache.get("904634350455382037");
                let huntail = message.guild.roles.cache.get("904634480579452928");
                let member = message.member
    
                if (args[1] == "Wooper" || args[1] == "wooper") {
                    var role = wooper;
                } else {
                if (args[1] == "Quag" || args[1] == "quag") {
                    var role = quag;
                } else {
                if (args[1] == "Sandshrew" || args[1] == "sandshrew") {
                    var role = sandshrew;
                } else {
                if (args[1] == "Lotad" || args[1] == "lotad") {
                    var role = lotad;
                } else {
                if (args[1] == "Huntail" || args[1] == "huntail") {
                    var role = huntail;
                } else {
                var role = null; 
                }}}}};

                if (role == null) {
                    message.channel.send("Sorry, this is not a valid role.");
                }
                //give the role
                member.roles.remove(role).catch(console.error);
                //reset the role value
                var role = null; 
                console.log(role);
        }   
    },

    "matrix": {
        "desc": "...",
        "f": function(message, args) {
            let nani = Math.floor(Math.random() * 100);
            let member = message.member;
            console.log(member);
            console.log(counter);
            console.log(nani);

            if (counter == 0) {
                if (nani == 69) {
                    message.channel.send(`Keananu Reaves`)
                } else {
                message.channel.send(`Wake up, ${member}...`);
                counter++;
                console.log(counter);
            }} else {
                if (counter == 1) {
                    message.channel.send("The Matrix has you...");
                    counter++;
                    console.log(counter);
                } else {
                    if (counter == 2) {
                        message.channel.send("Follow the white rabbit.");
                        counter++;
                    } else {
                        if (counter == 3) {
                            message.channel.send("https://tenor.com/view/matrix-matrix-code-anon-anonymous-anonymous-bites-back-gif-14780893");
                            counter = 0;
                        } else {
                            counter = 0;
                        }
                    }
                }
            }
        }
    },
    "eliza": {
        "desc": "Eliza is the world's first chatbot, created in 1965!",
        "f": function(message, args) {
            // args.forEach(getInput); 
            // function getInput(input) {
            //     if (userinput != undefined) {
            //         var userinput = `${userinput} ${input}`;
            //         console.log(userinput);
            //     } else {
            //         var userinput = input;
            //     }

            var userinput = args.toString();
            if (args[1] = undefined) {
                let start = elizabot.start(); 
                message.channel.send(start);   
                console.log(start); 
            } else {
                let reply = elizabot.reply(userinput); 
                message.channel.send(reply); 
                console.log(reply);
            }
        }
    }
} 

function error(e) {
    client.channels.cache.get(data.bugreport_channel).send(`oh god something broke: <:quagfire:925458036762484766>\n\`\`\`diff\n+ Unhandled exception: \n-    ${e.toString().replace(/\n/g, "\n- ")}\`\`\`\n     <:madsire:925458037056098424> <@730177830201196585> pls fix`);
}

//Error messages + other QoL
client.on('messageCreate', message => {
    try {        
        if (message.content.indexOf("<@!919831853014339584>") != -1 ||
            message.content.indexOf("<@919831853014339584>") != -1) {
            message.react("<:ping:919094079302799373>");
        }
    
        if (message.author.bot) return;
        if (!message.content.startsWith(data.prefix)) return;
        
        if (!data.allowed_channels.includes(message.channel.id)) {
            message.react("<:wut:925458036733145180>");
            return;
        }
    
        let content = message.content.substring(1, message.content.length);
        let args = [];
        let i = 0;
        let t = "";
        let s = true;
        while (i < content.length) {
            let c = content[i];
            if (c == " " && s) {
                args.push(t);
                t = "";
            } else if (c == "\"" || c == "”" && s) {
                s = !s;
            } else {
                if (c != "\"" && c != "”") t += c;
            }
    
            i++;
        }
        if (t != "") args.push(t);
    
        console.log(args);
        if (commands[args[0]] === undefined) {
            message.channel.send("<:wut:925458036733145180> that isn't a command (type `help` for help)");
            return;
        }
    
        try {
            commands[args[0]].f(message, args);
        } catch (e) {
            message.channel.send(`oh god something broke: <:quagfire:925458036762484766>\n\`\`\`diff\n+ Unhandled exception while executing “${args[0]}”: \n-    ${e.toString().replace(/\n/g, "\n- ")}\`\`\`\n ${args[0] != "error" ? "<:madsire:925458037056098424> <@730177830201196585> pls fix" : ""}`)
        }
    } catch (e) {
        client.channels.cache.get(data.bugreport_channel).send(`oh god something broke: <:quagfire:925458036762484766>\n\`\`\`diff\n+ Unhandled exception while executing “events.messageCreate”: \n-    ${e.toString().replace(/\n/g, "\n- ")}\`\`\`\n     <:madsire:925458037056098424> <@730177830201196585> pls fix`);
    }
});

//Logging system for deleted messages
client.on('messageDelete', message => {
    console.log(message.content);
    console.log(message.attachments);

    // Turn empty messages (like only a picture) into the phrase <empty message> to prevent errors
    // if (message.content == "") {
    //     message.content = "<empty message>"
    // };

    if (message.attachments != {}) {
        if (message.content != "") {
            try {
                client.channels.cache.get(data.modlog_channel).send({
                    "embeds": [
                        new Discord.MessageEmbed()
                            .setTitle("Deleted message:")
                            .addField("Content", message.content, false)
                            .addField("Info", `Author: <@${message.author.id}> (${message.author.id})`),           
                    ]
                });
            } catch (e) {
                error(e);
            }
        }
    }

    // Send attachments
    message.attachments.forEach(attachment => {
        var Attach = attachment.attachment
        console.log(Attach)

        if (Attach != {}) {
            if (message.content == "") {
                try {                    
                    client.channels.cache.get(data.modlog_channel).send({
                        "embeds": [
                            new Discord.MessageEmbed()
                                .setThumbnail(Attach !== undefined ? Attach : "")
                                .setTitle("Deleted message:")
                                .addField("Info", `Author: <@${message.author.id}> (${message.author.id})`),           
                        ]
                    });
                } 
                catch (e) {
                    error(e);
                }
            } else {
                try {   
                    client.channels.cache.get(data.modlog_channel).send({
                        "embeds": [
                            new Discord.MessageEmbed()
                                .setThumbnail(Attach !== undefined ? Attach : "")
                                .setTitle("Deleted message:")
                                .addField("Content", message.content, false)
                                .addField("Info", `Author: <@${message.author.id}> (${message.author.id})`),           
                        ]
                    });
                } catch (e) {
                    error(e);
                }
            }
        } 
    });
});


//Logging system for editted messages
client.on('messageUpdate', (oldmessage, newmessage) => {

    // Turn empty messages (like only a picture) into the phrase <empty message> to prevent errors. The following code is extremely gross and I'm sorry
    if (oldmessage.content == "") {
        oldmessage.content = "<empty message>"
    }

    if (newmessage.content == "") {
        newmessage.content = "<empty message>"
    }

    try {
        if (oldmessage.content == newmessage.content) return;    
        
        client.channels.cache.get(data.modlog_channel).send({
            "embeds": [
                new Discord.MessageEmbed()
                    .setTitle("Edited message:")
                    .addField("Old", oldmessage.content, false)
                    .addField("New", newmessage.content, false)
                    .addField("Info", `Author: <@${newmessage.author.id}> (${newmessage.author.id}), [link](${newmessage.url})`)
                    .setThumbnail(newmessage.attachments[0] !== undefined ? newmessage.attachments[0] : ""),
            ]
        });
    } catch (e) {
        error(e);
    }
});

client.on("error", e => {
    error(e);
});

process.on('unhandledRejection', e => {
    error(e);
});

client.on('ready', () => {
    console.log("I am become quag, ruler of the world.");
})

client.login(secrets.token);
// secrets contains the bot's token. This is the only file that has been modified from the version that is actually used. 
