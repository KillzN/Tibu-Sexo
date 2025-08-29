import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, text, command }) => {
    try {
        let { exp, diamantes, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = xpRange(level, global.multiplier)
        let name = await conn.getName(m.sender)
        exp = exp || 'Desconocida';
        role = role || 'Aldeano';

        // Aquí obtenemos la mención correcta para WhatsApp
        const user = `@${m.sender.split('@')[0]}`;

        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
        await m.react('🌹')

        const imageUrl = 'https://files.catbox.moe/nm3knp.png';
        let menu = `
*\`ㅤㅤ ₊𖥔 𝗧𝗜𝗕𝗨 𝗕𝗢𝗧   ׅ𖥔ׄ\`*
ㅤㅤ𝗠𝗘𝗡𝗨 𝗣𝗥𝗜𝗡𝗖𝗜𝗣𝗔𝗟
     ┉┅━━━━━━━━━━┅┉ 

*👤 Usuario:* ${user}
*🚹 Rol:* ${role}
*🔝 Nivel:* ${level} (${exp} XP)
*💎 Gemas:* ${diamantes}
*⏰ Activo:* ${uptime}

╭┈ *\`MENUS 📋\`*
│  ִֶָ🌬 ${usedPrefix}menunsfw
│  ִֶָ🌬 ${usedPrefix}menuaudios
│  ִֶָ🌬 ${usedPrefix}menuff
│  ִֶָ🌬 ${usedPrefix}menuowner
│  ִֶָ🌬 ${usedPrefix}menulogos
╰──────────────

╭┈ *\`INFORMACIÓN 📊\`*
│  ִֶָ☁ ${usedPrefix}totalf
│  ִֶָ☁ ${usedPrefix}grupos
│  ִֶָ☁ ${usedPrefix}sugerir
│  ִֶָ☁ ${usedPrefix}report
│  ִֶָ☁ ${usedPrefix}owner
│  ִֶָ☁ ${usedPrefix}ping
│  ִֶָ☁ ${usedPrefix}uptime
│  ִֶָ☁ ${usedPrefix}horario
╰──────────────

╭┈ *\`OFF · ON 🧰\`*
│  ִֶָ⚒ ${usedPrefix}enable *opción*
│  ִֶָ⚒ ${usedPrefix}disable *opción*
│  ִֶָ⚒ ${usedPrefix}on *opción*
│  ִֶָ⚒ ${usedPrefix}off *opción*
╰──────────────

╭┈ *\`DOWNLOAD ⬇\`*
│  ִֶָ🌐 ${usedPrefix}play *texto*
│  ִֶָ🌐 ${usedPrefix}aplay *texto*
│  ִֶָ🌐 ${usedPrefix}aplay2 *texto*
│  ִֶָ🌐 ${usedPrefix}splay *texto*
│  ִֶָ🌐 ${usedPrefix}ytmp4doc *texto*
│  ִֶָ🌐 ${usedPrefix}ytmp3doc *texto*
│  ִֶָ🌐 ${usedPrefix}apk *texto*
│  ִֶָ🌐 ${usedPrefix}aptoide *texto*
│  ִֶָ🌐 ${usedPrefix}modapk *texto*
│  ִֶָ🌐 ${usedPrefix}pinterest *texto*
│  ִֶָ🌐 ${usedPrefix}capcut *url*
│  ִֶָ🌐 ${usedPrefix}pindl *url*
│  ִֶָ🌐 ${usedPrefix}pinvid *url*
│  ִֶָ🌐 ${usedPrefix}ytmp4 *url*
│  ִֶָ🌐 ${usedPrefix}ytmp3 *url*
│  ִֶָ🌐 ${usedPrefix}tiktok *url*
│  ִֶָ🌐 ${usedPrefix}tiktok2 *url*
│  ִֶָ🌐 ${usedPrefix}instagram *url*
│  ִֶָ🌐 ${usedPrefix}facebook *url*
│  ִֶָ🌐 ${usedPrefix}mediafire *url*
│  ִֶָ🌐 ${usedPrefix}mega *url*
│  ִֶָ🌐 ${usedPrefix}playstore *url*
│  ִֶָ🌐 ${usedPrefix}xnxxdl *url*
│  ִֶָ🌐 ${usedPrefix}xvideosdl *url*
│  ִֶָ🌐 ${usedPrefix}pornhubdl *url*
╰──────────────

╭┈ *\`SEARCH 🔍\`*
│  ִֶָ👁‍🗨 ${usedPrefix}scsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}ttsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}ttsearch2 *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}ytsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}hpmsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}spotifysearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}githubsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}playstoresearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}xnxxsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}xvsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}pornhubsearch *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}gnula *texto*
│  ִֶָ👁‍🗨 ${usedPrefix}mercadolibre *texto*
╰──────────────

╭┈ *\`IA BOTS 🤖\`*
│  ִֶָ⚙ ${usedPrefix}luminai *texto*
│  ִֶָ⚙ ${usedPrefix}chatgpt *texto*
│  ִֶָ⚙ ${usedPrefix}gemini *texto*
│  ִֶָ⚙ ${usedPrefix}demo *texto*
│  ִֶָ⚙ ${usedPrefix}flux *texto*
│  ִֶָ⚙ ${usedPrefix}toreal *texto*
│  ִֶָ⚙ ${usedPrefix}toanime *texto*
╰──────────────

╭┈ *\`LISTAS FF 📃\`*
│  ִֶָ🗂 ${usedPrefix}infem4 *hr + p*
│  ִֶָ🗂 ${usedPrefix}inmasc4 *hr + p*
│  ִֶָ🗂 ${usedPrefix}inmixto4 *hr + p*
│  ִֶָ🗂 ${usedPrefix}infem6 *hr + p*
│  ִֶָ🗂 ${usedPrefix}inmasc6 *hr + p*
│  ִֶָ🗂 ${usedPrefix}inmixto6 *hr + p*
│  ִֶָ🗂 ${usedPrefix}v4fem *hr + p*
│  ִֶָ🗂 ${usedPrefix}v4masc *hr + p*
│  ִֶָ🗂 ${usedPrefix}v4mixto *hr + p*
│  ִֶָ🗂 ${usedPrefix}v6fem *hr + p*
│  ִֶָ🗂 ${usedPrefix}v6masc *hr + p*
│  ִֶָ🗂 ${usedPrefix}v6mixto *hr + p*
╰──────────────

╭┈ *\`FRASES 💭\`*
│  ִֶָ📲 ${usedPrefix}piropo
│  ִֶָ📲 ${usedPrefix}consejo
│  ִֶָ📲 ${usedPrefix}fraseromantica
╰──────────────

╭┈ *\`CONVERTIDORES 🔄\`*
│  ִֶָ🛡 ${usedPrefix}toptt *aud*
│  ִֶָ🛡 ${usedPrefix}toptt *vid*
│  ִֶָ🛡 ${usedPrefix}tomp3 *vid*
╰──────────────

╭┈ *\`HERRAMIENTAS 📥\`*
│  ִֶָ🛜 ${usedPrefix}clima *texto*
│  ִֶָ🛜 ${usedPrefix}readmore *texto*
│  ִֶָ🛜 ${usedPrefix}read *texto*
│  ִֶָ🛜 ${usedPrefix}fake *texto + user + texto*
│  ִֶָ🛜 ${usedPrefix}traducir *idioma + texto*
│  ִֶָ🛜 ${usedPrefix}tourl *img / vid / aud*
│  ִֶָ🛜 ${usedPrefix}unblur *img*
│  ִֶָ🛜 ${usedPrefix}hd *img*
│  ִֶָ🛜 ${usedPrefix}remini *img*
│  ִֶָ🛜 ${usedPrefix}background *img*
│  ִֶָ🛜 ${usedPrefix}whatmusic *aud*
│  ִֶָ🛜 ${usedPrefix}whatmusic *vid*
│  ִֶָ🛜 ${usedPrefix}flag *país*
│  ִֶָ🛜 ${usedPrefix}cfrase *link + texto*
│  ִֶָ🛜 ${usedPrefix}inspect *link*
│  ִֶָ🛜 ${usedPrefix}inspeccionar *link*
│  ִֶָ🛜 ${usedPrefix}tiktokstalk *user*
│  ִֶָ🛜 ${usedPrefix}pinstalk *user*
│  ִֶָ🛜 ${usedPrefix}reactch
│  ִֶָ🛜 ${usedPrefix}nuevafotochannel
│  ִֶָ🛜 ${usedPrefix}nosilenciarcanal
│  ִֶָ🛜 ${usedPrefix}silenciarcanal
│  ִֶָ🛜 ${usedPrefix}seguircanal
│  ִֶָ🛜 ${usedPrefix}avisoschannel
│  ִֶָ🛜 ${usedPrefix}resiviravisos
│  ִֶָ🛜 ${usedPrefix}eliminarfotochannel
│  ִֶָ🛜 ${usedPrefix}reactioneschannel
│  ִֶָ🛜 ${usedPrefix}reaccioneschannel
│  ִֶָ🛜 ${usedPrefix}nuevonombrecanal
│  ִֶָ🛜 ${usedPrefix}nuevadescchannel
╰──────────────

╭┈ *\` GRUPOS 👥\`*
│  ִֶָ🔒 ${usedPrefix}add *número*
│  ִֶָ🔒 ${usedPrefix}grupo *abrir / cerrar*
│  ִֶָ🔒 ${usedPrefix}inactivos *list / kick*
│  ִֶָ🔒 ${usedPrefix}grouptime *tiempo*
│  ִֶָ🔒 ${usedPrefix}notify *texto*
│  ִֶָ🔒 Aviso *texto*
│  ִֶָ🔒 Admins *texto*
│  ִֶָ🔒 ${usedPrefix}todos *texto*
│  ִֶָ🔒 ${usedPrefix}setwelcome *texto*
│  ִֶָ🔒 ${usedPrefix}setremove *texto*
│  ִֶָ🔒 ${usedPrefix}setbye *texto*
│  ִֶָ🔒 ${usedPrefix}groupdesc *texto*
│  ִֶָ🔒 ${usedPrefix}promote *@tag*
│  ִֶָ🔒 ${usedPrefix}demote *@tag*
│  ִֶָ🔒 ${usedPrefix}kick *@tag*
│  ִֶָ🔒 ${usedPrefix}mute *@tag*
│  ִֶָ🔒 ${usedPrefix}tagnum *prefix*
│  ִֶָ🔒 ${usedPrefix}link
│  ִֶָ🔒 ${usedPrefix}delete
│  ִֶָ🔝 ${usedPrefix}fantasmas
╰──────────────

╭┈*\` EFECTOS 🎼\`*
│  ִֶָ🔊 ${usedPrefix}bass *aud*
│  ִֶָ🔊 ${usedPrefix}blown *aud*
│  ִֶָ🔊 ${usedPrefix}deep *aud*
│  ִֶָ🔊 ${usedPrefix}earrape *aud*
│  ִֶָ🔊 ${usedPrefix}fast *aud*
│  ִֶָ🔊 ${usedPrefix}smooth *aud*
│  ִֶָ🔊 ${usedPrefix}tupai *aud*
│  ִֶָ🔊 ${usedPrefix}nightcore *aud*
│  ִֶָ🔊 ${usedPrefix}reverse *aud*
│  ִֶָ🔊 ${usedPrefix}robot *aud*
│  ִֶָ🔊 ${usedPrefix}slow *aud*
│  ִֶָ🔊 ${usedPrefix}squirrel *aud*
│  ִֶָ🔊 ${usedPrefix}chipmunk *aud*
│  ִֶָ🔊 ${usedPrefix}reverb *aud*
│  ִֶָ🔊 ${usedPrefix}chorus *aud*
│  ִֶָ🔊 ${usedPrefix}flanger *aud*
│  ִֶָ🔊 ${usedPrefix}distortion *aud*
│  ִֶָ🔊 ${usedPrefix}pitch *aud*
│  ִֶָ🔊 ${usedPrefix}highpass *aud*
│  ִֶָ🔊 ${usedPrefix}lowpass *aud*
│  ִֶָ🔊 ${usedPrefix}underwater *aud*
╰──────────────

╭┈ *\`FUN 🤩\`*
│  ִֶָ🎢 ${usedPrefix}gay *@tag*
│  ִֶָ🎢 ${usedPrefix}lesbiana *@tag*
│  ִֶָ🎢 ${usedPrefix}pajero *@tag*
│  ִֶָ🎢 ${usedPrefix}pajera *@tag*
│  ִֶָ🎢 ${usedPrefix}puto *@tag*
│  ִֶָ🎢 ${usedPrefix}puta *@tag*
│  ִֶָ🎢 ${usedPrefix}manco *@tag*
│  ִֶָ🎢 ${usedPrefix}manca *@tag*
│  ִֶָ🎢 ${usedPrefix}rata *@tag*
│  ִֶָ🎢 ${usedPrefix}prostituto *@tag*
│  ִֶָ🎢 ${usedPrefix}prostituta *@tag*
│  ִֶָ🎢 ${usedPrefix}sinpoto *@tag*
│  ִֶָ🎢 ${usedPrefix}sintetas *@tag*
│  ִֶָ🎢 ${usedPrefix}chipi *@tag*
│  ִֶָ🎢 ${usedPrefix}doxear *@tag*
│  ִֶָ🎢 ${usedPrefix}declararse *@tag*
│  ִֶָ🎢 ${usedPrefix}simi *texto*
│  ִֶָ🎢 ${usedPrefix}pregunta *texto*
│  ִֶָ🎢 ${usedPrefix}genio *texto*
│  ִֶָ🎢 ${usedPrefix}top
│  ִֶָ🎢 ${usedPrefix}sorteo
│  ִֶָ🎢 ${usedPrefix}piropo
│  ִֶָ🎢 ${usedPrefix}chiste
│  ִֶָ🎢 ${usedPrefix}facto
│  ִֶָ🎢 ${usedPrefix}verdad
│  ִֶָ🎢 ${usedPrefix}pareja
│  ִֶָ🎢 ${usedPrefix}parejas
│  ִֶָ🎢 ${usedPrefix}love
│  ִֶָ🎢 ${usedPrefix}personalidad
╰──────────────

╭┈ *\`JUEGOS 🎁\`*
│  ִֶָ🕹 ${usedPrefix}pregunta *texto*
│  ִֶָ🕹 ${usedPrefix}ttt *texto*
│  ִֶָ🕹 ${usedPrefix}ptt *opción*
│  ִֶָ🕹 ${usedPrefix}delttt
│  ִֶָ🕹 ${usedPrefix}acertijo
│  ִֶָ🕹 ${usedPrefix}trivia
╰──────────────

╭┈ *\`ANIME/FUT 🥅\`*
│  ִֶָ⚽${xanime} ${usedPrefix}messi
│  ִֶָ⚽${xanime} ${usedPrefix}cr7
╰──────────────

╭┈ *\`LOGOS 🖌\`*
│  ִֶָ🖼 ${usedPrefix}balogo *texto*
│  ִֶָ🖼 ${usedPrefix}logocorazon *texto*
│  ִֶָ🖼 ${usedPrefix}logochristmas  *texto*
│  ִֶָ🖼 ${usedPrefix}logopareja *texto*
│  ִֶָ🖼 ${usedPrefix}logoglitch *texto*
│  ִֶָ🖼 ${usedPrefix}logosad *texto*
│  ִֶָ🖼 ${usedPrefix}logogaming *texto*
│  ִֶָ🖼 ${usedPrefix}logosolitario *texto*
│  ִֶָ🖼 ${usedPrefix}logodragonball *texto*
│  ִֶָ🖼 ${usedPrefix}logoneon *texto*
│  ִֶָ🖼 ${usedPrefix}logogatito *texto*
│  ִֶָ🖼 ${usedPrefix}logochicagamer *texto*
│  ִֶָ🖼 ${usedPrefix}logonaruto *texto*
│  ִֶָ🖼 ${usedPrefix}logofuturista *texto*
│  ִֶָ🖼 ${usedPrefix}logonube *texto*
│  ִֶָ🖼 ${usedPrefix}logoangel *texto*
│  ִֶָ🖼 ${usedPrefix}logomurcielago *texto*
│  ִֶָ🖼 ${usedPrefix}logocielo *texto*
│  ִֶָ🖼 ${usedPrefix}logograffiti3d *texto*
│  ִֶָ🖼 ${usedPrefix}logomatrix *texto*
│  ִֶָ🖼 ${usedPrefix}logohorror *texto*
│  ִֶָ🖼 ${usedPrefix}logoalas *texto*
│  ִֶָ🖼 ${usedPrefix}logoarmy *texto*
│  ִֶָ🖼 ${usedPrefix}logopubg *texto*
│  ִֶָ🖼 ${usedPrefix}logopubgfem *texto*
│  ִֶָ🖼 ${usedPrefix}logolol *texto*
│  ִֶָ🖼 ${usedPrefix}logoamongus *texto*
│  ִֶָ🖼 ${usedPrefix}logovideopubg *texto*
│  ִֶָ🖼 ${usedPrefix}logovideotiger *texto*
│  ִֶָ🖼 ${usedPrefix}logovideointro *texto*
│  ִֶָ🖼 ${usedPrefix}logovideogaming *texto*
│  ִֶָ🖼 ${usedPrefix}logoguerrero *texto*
│  ִֶָ🖼 ${usedPrefix}logoportadaplayer *texto*
│  ִֶָ🖼 ${usedPrefix}logoportadaff *texto*
│  ִֶָ🖼 ${usedPrefix}logoportadapubg *texto*
│  ִֶָ🖼 ${usedPrefix}logoportadacounter *texto*
╰──────────────

╭┈ *\`NSFW 🛑\`*
│  ִֶָ🔞 ${usedPrefix}violar *@tag*
│  ִֶָ🔞 ${usedPrefix}follar *@tag*
│  ִֶָ🔞 ${usedPrefix}anal *@tag*
│  ִֶָ🔞 ${usedPrefix}coger *@tag*
│  ִֶָ🔞 ${usedPrefix}coger2 *@tag*
│  ִֶָ🔞 ${usedPrefix}penetrar *@tag*
│  ִֶָ🔞 ${usedPrefix}sexo *@tag*
│  ִֶָ🔞 ${usedPrefix}rusa *@tag*
│  ִֶָ🔞 ${usedPrefix}sixnine *@tag*
│  ִֶָ🔞 ${usedPrefix}pies *@tag*
│  ִֶָ🔞 ${usedPrefix}mamada *@tag*
│  ִֶָ🔞 ${usedPrefix}lickpussy *@tag*
│  ִֶָ🔞 ${usedPrefix}grabboobs *@tag*
│  ִֶָ🔞 ${usedPrefix}suckboobs *@tag*
│  ִֶָ🔞 ${usedPrefix}cum *@tag*
│  ִֶָ🔞 ${usedPrefix}fap *@tag*
│  ִֶָ🔞 ${usedPrefix}manosear *@tag*
│  ִֶָ🔞 ${usedPrefix}lesbianas *@tag*
╰──────────────

╭┈ *\`STICKERS 👩🏻‍🎨\`*
│  ִֶָ🎨 ${usedPrefix}sticker *img*
│  ִֶָ🎨 ${usedPrefix}sticker *vid*
│  ִֶָ🎨 ${usedPrefix}brat *texto*
│  ִֶָ🎨 ${usedPrefix}bratv *texto*
│  ִֶָ🎨 ${usedPrefix}qc *texto*
│  ִֶָ🎨 ${usedPrefix}wm *texto*
│  ִֶָ🎨 ${usedPrefix}dado
│  ִֶָ🎨 ${usedPrefix}scat
╰──────────────

╭┈ *\` RPG 💰\`*
│  ִֶָ🪙 ${usedPrefix}minar
│  ִֶָ🪙 ${usedPrefix}cofre
│  ִֶָ🪙 ${usedPrefix}slut
│  ִֶָ🪙 ${usedPrefix}nivel
│  ִֶָ🪙 ${usedPrefix}ruleta
│  ִֶָ🪙 ${usedPrefix}robarxp
│  ִֶָ🪙 ${usedPrefix}robardiamantes
│  ִֶָ🪙 ${usedPrefix}depositar
│  ִֶָ🪙 ${usedPrefix}daily
│  ִֶָ🪙 ${usedPrefix}crimen
│  ִֶָ🪙 ${usedPrefix}cartera
╰──────────────

╭┈ *\`REGISTRO 📇\`*
│  ִֶָ🗃 ${usedPrefix}perfil
│  ִֶָ🗃 ${usedPrefix}reg
│  ִֶָ🗃 ${usedPrefix}unreg
╰──────────────

╭┈ *\`OWNER 🦈\`*
│  ִֶָ🔝 ${usedPrefix}salir
│  ִֶָ🔝 ${usedPrefix}update
│  ִֶָ🔝 ${usedPrefix}blocklist
│  ִֶָ🔝 ${usedPrefix}grouplist
│  ִֶָ🔝 ${usedPrefix}restart
│  ִֶָ🔝 ${usedPrefix}join
│  ִֶָ🔝 ${usedPrefix}chetar
│  ִֶָ🔝 ${usedPrefix}unbanuser
│  ִֶָ🔝 ${usedPrefix}banchat
│  ִֶָ🔝 ${usedPrefix}unbanchat
│  ִֶָ🔝 ${usedPrefix}block
│  ִֶָ🔝 ${usedPrefix}unblock
│  ִֶָ🔝 ${usedPrefix}creargc
│  ִֶָ🔝 ${usedPrefix}getplugin
│  ִֶָ🔝 ${usedPrefix}let
│  ִֶָ🔝 ${usedPrefix}dsowner
│  ִֶָ🔝 ${usedPrefix}autoadmin
╰──────────────
> ${club}
`.trim()
        await conn.sendMessage(m.chat, {
            image: { url: imageUrl }, // Enviar siempre la imagen especificada
            caption: menu,
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*✖️ Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}
handler.help = ['menuff'];
handler.tags = ['main'];
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.fail = null;
export default handler;
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}