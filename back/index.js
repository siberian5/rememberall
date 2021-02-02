const TelegramBot = require('node-telegram-bot-api'); // connecting node-telegram-bot-api
require('http').createServer().listen(Number(process.env.PORT) || 5000).on('request', function(req, res) {
    res.end('')
});

const token = process.env.BOTTOKEN; // bot token s in heroku environment variables

// enabling bot
const bot = new TelegramBot(token, { polling: true });

//Keyboard config
const keyboard = [
    [{
        text: 'Лодку мне!', // button caption
        callback_data: 'boat'
    }],
    [{
        text: 'Только не Слизерин..',
        callback_data: 'hogwarts'
    }],
    [{
        text: 'О чем речь?',
        url: 'https://comptechschool.com/projects2021/remembrall' //some link
    }]
];


bot.on('message', (msg) => {
    const chatId = msg.chat.id; //get dialog_id to reply to specified user

    // sending message
    bot.sendMessage(chatId, 'Смерть всем человекам!', { // adding keyboard
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// keyboard callback
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'boat') {
        img = 'images/boat.jpg';
    }
    if (query.data === 'hogwarts') {
        img = 'images/hogwarts.jpg';
    }

    if (img) {
        bot.sendPhoto(chatId, img, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});