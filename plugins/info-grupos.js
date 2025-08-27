let handler = async (m, { conn, usedPrefix, command }) => {

   let grupos = `*ㅤㅤ ₊𖥔 𝗧𝗜𝗕𝗨 𝗕𝗢𝗧   ׅ𖥔ׄ*\nㅤ 𝗥𝗘𝗗𝗘𝗦 𝗢𝗙𝗜𝗖𝗜𝗔𝗟𝗘𝗦 \n     ┉┅━━━━━━━━━━┅┉

┊ଘ(੭ˊᵕˋ)੭𝗚𝗿𝘂𝗽𝗼 𝗱𝗲 𝗖𝗼𝗺𝗽𝗿𝗮 
✎${grupo}

┊ଘ(੭ˊᵕˋ)੭𝗦𝗼𝗽𝗼𝗿𝘁𝗲 𝗱𝗲 𝗯𝗼𝘁 
✎${comu}

┊ଘ(੭ˊᵕˋ)੭𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺 
✎ ${ig}

┊ଘ(੭ˊᵕˋ)੭𝗖𝗮𝗻𝗮𝗹 𝗱𝗲 𝗿𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗶𝗮𝘀
✎ ${channel}

> ${dev}`

   let img = 'https://files.catbox.moe/nm3knp.png';

   conn.sendMessage(m.chat, { image: { url: img }, caption: grupos }, { quoted: fkontak });
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'club']

export default handler