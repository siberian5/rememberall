
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import Config from './Config'
import { DataClient } from './data/DataProvider'
import FirebaseHandler from './data/firebase/FirebaseHandler'

export const runExpressWebServer = (client: DataClient ) => {

    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/', async (req : Request, res : Response) => {

        /*

        Все операции с базой данных выполняются с какими-то параметрами.



        вывести все задачи юзера:

        const allTasks = await (await FirebaseHandler.create(client)).listAllUserTasks(404203742, 20)     // id юзера, лимит



        вывести все незаконченные задачи:

        const unfinishedTasks = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(404203742, 20)    // id юзера, лимит



        вывести конкретную задачу юзера по имени:

        const task = await (await FirebaseHandler.create(client)).getTaskByName(404203742, '/task2')



        Добавить к списку задач новую:

            Сначала её создаём:

            const newTask = {
                description: 'Выйти на улицу',
                userId:404203742
            } as Task


            Затем сохраняем в базе:

            await (await FirebaseHandler.create(client)).addNewTask(newTask)

         */


        // userId берётся из сообщения телеграмма: см "const chatId = query.message.chat.id" в TelegramBot
        const task = await (await FirebaseHandler.create(client)).getTaskByName(404203742, '/task2')

        // лимит нужно указывать, чтобы не выкачивать через бота всю облачную базу.
        // лимита на лимит нет. Это может быть большое число.
        // Разумно указывать столько, сколько нужно на экране показать.
        const unfinishedTasks = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(404203742, 20)


        res.type('text/plain')
        res.status(200)
        res.send('одна задача:\n' + JSON.stringify(task) + '\nнесколько невыполненных задач:\n' + JSON.stringify(unfinishedTasks))
    })

    app.post('/', async (req : Request, res : Response) => {
        res.type('text/plain')
        res.status(200)
        res.send('POST?')
    })

    //404
    app.use((req, res) => {
        res.type('text/plain')
        res.status(404)
        res.send('Not found')
    })

    //500
    app.use( function (err: Error, req: Request, res: Response, next : NextFunction) {
        res.type('text/plain')
        res.status(500)
        res.send('Server error')
    })

    app.listen(Config.Server.port, () => {
        console.log(new Date().toString().replace(/ \(.*\)$/,'\t') + 'App started on: ', Config.Server.port)
    })
}



