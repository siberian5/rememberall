import TelegramBot, {CallbackQuery} from 'node-telegram-bot-api'
import Config from './Config'
import * as keyboards from './Keyboards'

export const runTelegramBot = () => {

    const bot = new TelegramBot(Config.Telegram.token, { polling: true });



    bot.on('message', (msg) => {
        const chatId = msg.chat.id //get dialog_id to reply to specified user
        // const fromId = msg.from.id

        // sending message
        bot.sendMessage(chatId, 'Смерть всем человекам!', { // adding keyboard
            reply_markup: {
                inline_keyboard: keyboards.ru_keyboard
            }
        })
    })


    // keyboard callback
    bot.on('callback_query', (query) => {
        // @ts-ignore
        const chatId = query.message.chat.id

        let img = ''

        if (query.data?.endsWith('boat')) {
            img = fullPath('images/boat.jpg')
        }
        if (query.data?.endsWith('hogwarts')) {
            img = fullPath('images/hogwarts.jpg')
        }

        if (img) {
            bot.sendPhoto(chatId, img, {
                reply_markup: resolveMarkup(query)
            })
        } else {
            bot.sendMessage(chatId, '…………………………', {
                reply_markup: resolveMarkup(query)
            })
        }
    })

}


// Маршрутизация:
// Зависимо от того, что именно прилетело в query.data,
// показываем тот или иной маркап ( или иную клавиатуру )
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

function fullPath(localPath:string) {
    return process.env.PWD + '/' + localPath
}