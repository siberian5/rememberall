import TelegramBot, {CallbackQuery, Message} from 'node-telegram-bot-api'
import Config from './Config'
import * as keyboards from './Keyboards'
import {DataClient} from './data/DataProvider'
import {keyboard} from './Keyboards'

export const runTelegramBot = (client :DataClient ) => {

    const bot = new TelegramBot(Config.Telegram.token, { polling: true });

    bot.on('message', (msg :Message) => {
        const chatId = msg.chat.id

        bot.sendMessage(chatId, 'Смерть всем человекам!', {
            reply_markup: {
                inline_keyboard: keyboards.keyboard
            }
        })
    })


    bot.on('callback_query', (query) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const message = query.message!
        const chatId = message.chat.id;

        switch (query.data) {

            case 'boat' : {
                bot.sendPhoto(chatId, 'images/boat.jpg', {
                    reply_markup: {
                        inline_keyboard: keyboard
                    }
                })
                break
            }

            case 'hogwarts' : {
                bot.sendPhoto(chatId, 'images/hogwarts.jpg', {
                    reply_markup: {
                        inline_keyboard: keyboard
                    }
                })
                break
            }

            default : {
                bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
                    reply_markup: {
                        inline_keyboard: keyboard
                    }
                })
            }
        }

    })

}


// Маршрутизация:
// Зависимо от того, что именно прилетело в query.data,
// показываем тот или иной маркап ( или иную клавиатуру )
/*
function resolveMarkup(query:CallbackQuery) {

    if (query.data?.startsWith('ru')) {

        if (query.data === 'ru_boat' || query.data === 'ru_hogwarts' || query.data === 'ru_main' ) {
            return { inline_keyboard: keyboards.ru_keyboard }
        }
        if (query.data === 'ru_settings' ) {
            return { inline_keyboard: keyboards.ru_setting_keyboard }
        }
        if (query.data === 'ru_switch_english' ) {
            return { inline_keyboard: keyboards.en_setting_keyboard }
        }

        if (query.data === 'ru_tasks' ) {
            return { inline_keyboard: keyboards.ru_tasks_keyboard }
        }

        // todo
        if (query.data === 'ru_tasks_add_new' ) {
            return { keyboard: keyboards.ru_tasks_keyboard }
        }
        // todo
        if (query.data === 'ru_tasks_list' ) {
            return { inline_keyboard: keyboards.ru_tasks_keyboard }
        }
    }



    if (query.data?.startsWith('en')) {

        if (query.data === 'en_boat' || query.data === 'en_hogwarts' || query.data === 'en_main' ) {
            return { inline_keyboard: keyboards.en_keyboard }
        }
        if (query.data === 'en_settings' ) {
            return { inline_keyboard: keyboards.en_setting_keyboard }
        }
        if (query.data === 'en_switch_russian' ) {
            return { inline_keyboard: keyboards.ru_setting_keyboard }
        }

        if (query.data === 'en_tasks' ) {
            return { inline_keyboard: keyboards.en_tasks_keyboard }
        }

        // todo
        if (query.data === 'en_tasks_add_new' ) {
            return { keyboard: keyboards.en_tasks_keyboard }
        }
        // todo
        if (query.data === 'en_tasks_list' ) {
            return { inline_keyboard: keyboards.en_tasks_keyboard }
        }
    }

    // default
    return { inline_keyboard: keyboards.ru_keyboard }
}
*/

// function fullPath(localPath:string) {
//     return process.env.PWD + '/' + localPath
// }