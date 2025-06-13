const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0FBOGNSMkg1RkIvTlRMQVZlWHlpTE9ZeE0rOWRpM2EwemRwVlI0M0JsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGVlZ1VCK2tkSFN0NlFnQ0h1QzlHbmVTWC8wblRqMFAzWUpDYWhwc2tucz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRWVCd3BNWk83SXQ0eHNBZXRpcGdKTzFWMERCYVdpZDZvWUwySjR1L2xnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqMy85RTRHNlRoVU92ZGhJeWZ4NWltQm5LMlc2SGlSTnNpdlJHQUVhN3p3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhPVGdwTldJdUlUUlhGWWFxNFBTL2E0L2xOZCtHeVNLTmsrNVVISUVwWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpxNlQ1Z3JNTm9FZE5wMGVTNDZISFlrNEh2QmVSa0RGdDYyTG1PL3V0UXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdwbldOTlJnUFJHeTlMaDd3Y3MvN1UxbFZRSzVId1Nqc3ZGek9NcVdXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibndzUis5OEFJMFBtSk56SjJtRkk4TlRnVy8rUTd2cjg2U05TclRzNmlpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxSOU02UlNvQ2FxUHZLS1Ixb095MmFqME55dXhIMGNDWW9TQVovOFBPOTRYQVdqc1F2dHRuSzFITU9OZyttSnRhaWJCNVJKYXVoY09UaVpCYzZWL2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6ImpKRjh4b3RsZlQ3clNhb21JcVNZSGhjaFBBVEJpQy9YbUZKRTR1dTRTUEE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjUyMzk4NjE0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFNzhCMjdFQTM1MDlDRERFNjY3NjczQ0ZCQTkwNEZGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4NDY2NDh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyMzc0QjZFMDA5Mjc1QjA3QTQyQ0U4NzFEMzA2RTJEOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODQ2NjQ5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI3QUNYNTVTUiIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0OjYzQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1OjYzQGxpZCIsIm5hbWUiOiJOaWNvbGF1cyBEYW5pZWwgMiDwn5iI8J+YiPCfmIgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0w2WGxxa0RFTnFVc3NJR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRqMWgrVU13NmE3OGU2UTNWem5HVTRDa3ZGelBaRUtWZWc5NUtGeWlkZ289IiwiYWNjb3VudFNpZ25hdHVyZSI6ImRsTjhhbHBZWFNBbDllV2dWeW9WVFhpSTlncHhkWmdWQmNrK2d6M2t6OWppQVRnMGFzVk01R056WEFOUEZSUHM5SVB4WHdLc0lxOTNldzZRb2pEN0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGWFdSWXp4YW1zWjJ0ejlLQlplQkpPdVY1ZVdWVU5hakJRdEVDQ2k4dVQ0TkNzWFJJTkIrdG9JWDhQYTB5eHhKSWhJcytuUFNqbXM1TW1LZjliT2toUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYWTlZZmxETU9tdS9IdWtOMWM1eGxPQXBMeGN6MlJDbFhvUGVTaGNvbllLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk4NDY2MzEsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjhQIn0=',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
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

