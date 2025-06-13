const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU1iK1NWYzJ1eEtKSFZTUlI3bUVydUFhSHRhQm1XM2NjU25tVkhuRmZWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZnJqcWhmNnpvSi9kdHBjWnp5cnAzSzUwUmpzUEk4ZGNRTHlOVVFhMThXUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SWRpbkFtcmdla24vRXpWN0tuekt0SXhIQjBNaGdubUVxUUEydEFkRjBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyY3RDMkhXYStZYm53M296K2Y0cFJaM1d5ejV6VVpqRWlCdHN6eDBIR0dzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMSDMvU1BBeWdXeWxmTndkQUxHUm4xeDFOYXlxYlh2RnFXVDlYVEVObk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5mV0wyZlpoNllSTTRxT0EzcEJ0UUlYeDJ2OU9xN2lNSHlRVTM5UXlTMWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNKeUozSnlCZVpTYThpUkhCZyt0MWsrem82L1VGNDl3Qm5MRmVRYjFVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlrZllhZGk2T3EvempDcjVXcTk1QmV6dmFXUGNjc3ljeWM4dWU2alhRZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitERWFtZDkyMXk4eHBFSUxmQmtnZ254R1dTdnFITUVKUUxxS3hqM3h4QTJ5U2JybHRxQTNRMUJET1NrdzBtaThMMThWaG5ZeW1DSC9Xb1FIbDIvTGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6IjNZRWhacGhxZytVSDNzWjQ2KzB4T01jTTVpdTB1U1JZWUFzcDVWc1FMMkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQxNjU0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ2QjM5OTIxNTQ2OTczNjUzMENCNjM3NjY2QjQ2OEY3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4MjgyMTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0MTY1NDkzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4MjE1OTNGQUE3NEU1NzFERDJFQ0Y5NTZFQzM5RDFDRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODI4MjU3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI3RlFKQ1NBTSIsIm1lIjp7ImlkIjoiMjU0NzQxNjU0OTMzOjdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNTcxOTE5OTQ2Mzg0OTE6N0BsaWQiLCJuYW1lIjoiRElfQ1RBX1RPUiDwn6Se8J+NgCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjJGN0NZUTVJU3h3Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiczlxSnZhWHd3dExJNFFnSlpGWGYxdGlLaGtFK0xmN1AvbnN6TEV4R2VBRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVUJlejZuOWt1V1crb0w0eElkWk9OY0MwN2tnRTNwZjhTZGMrUTRGMGs5M1FMR2VGMFUzNFFwYzFUaThPUDkwUlgrZy8wcjNRdTdGSkdwUTArQWF5RGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjdmRFUyTkkwYXFMNllzVzN1cjh6ZWJlcjN4dG9iTGlGbFlzc2MwMUVvbTJyU1BPenUvTGFTTHNpeUpuRFNjSmMrU0hMUDRJN3Uyb2M3Tm4xaHZFM2hBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQxNjU0OTMzOjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYlBhaWIybDhNTFN5T0VJQ1dSVjM5Yllpb1pCUGkzK3ovNTdNeXhNUm5nQiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5ODI4MjA5LCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRlVyIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "DI-CTA-TOR🤞🍀",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254741654933",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

