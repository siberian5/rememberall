
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import Config from './Config'
import { DataClient } from './data/DataProvider'
import FirebaseHandler, {
    addNewTask, finishTask,
    getTaskByName,
    listAllUserTasks,
    listUnfinishedUserTasks
} from './data/firebase/FirebaseHandler'

export const runExpressWebServer = (client: DataClient ) => {

    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))



        // get:
        // listUnfinishedUserTasks: listUnfinishedUserTasks(firebaseModel),

        // post:
        // addNewTask: addNewTask(firebaseModel),
        // finishTask: finishTask(firebaseModel)
        // getTaskByName: getTaskByName(firebaseModel), ( во вторую очередь )



    app.post('/', async (req : Request, res : Response) => {
        res.type('text/plain')
        res.status(200)
        res.send('POST?')
    })



    // default
    app.get('/', async (req : Request, res : Response) => {

        // Ниже приведены примеры использования функций доступа к БД:

        //            listAllUserTasks
        //            listUnfinishedUserTasks
        //            addNewTask
        //            getTaskByName
        //            finishTask


        // Достанем список нерешённых задач:
        // Для этого нужно указать два параметра.
        // id юзера и лимит.

        // лимит нужно указывать, чтобы не выкачивать через бота всю облачную базу.
        // лимита на лимит нет. Это может быть большое число.
        // Разумно указывать столько, сколько нужно на экране показать.
        const unfinishedTasks1 = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(404203742, 20)

        // Выберем одну из задач. Если список оказался пустым, здесь ничего не будет.
        const oneTask = unfinishedTasks1.pop()
        let solvedTask

        // Обозначим задачу завершённой:
        if (oneTask) {
            await (await FirebaseHandler.create(client)).finishTask(404203742, oneTask.name)

            // Теперь эта задача завершена.
            // Выведем её детали:
            solvedTask = await (await FirebaseHandler.create(client)).getTaskByName(404203742, oneTask.name)
        }

        // Спросим снова базу:
        const unfinishedTasks2 = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(404203742, 20)

        // Создадим новую задачу:

        const taskDescription = 'повесить картину' + '#' + Date.now()
        await (await FirebaseHandler.create(client)).addNewTask(404203742, taskDescription)

        // Спросим снова базу:
        const unfinishedTasks3 = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(404203742, 20)

        // Спросим у базы вообще все задачи ( и решённые и нет ) :
        const allTasks = await (await FirebaseHandler.create(client)).listAllUserTasks(404203742, 20)


        res.type('text/plain')
        res.status(200)
        res.send(`
        
        список невыполненных задач мы получаем вызовом "await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(<userId>, <limit>)": 
        
        ${JSON.stringify(unfinishedTasks1)}
        
        одна из них: 
        ${JSON.stringify(oneTask)}
        
        Решить задачу можно вызвав "await (await FirebaseHandler.create(client)).getTaskByName(<userId>, <taskName>)":
        
        Решённая задача:
        ${JSON.stringify(solvedTask)}
        
        Обновлённый список:
        ${JSON.stringify(unfinishedTasks2)}
        
        Создадим новую задачу с описанием "${taskDescription}":"const taskDescription = 'повесить картину'
        await (await FirebaseHandler.create(client)).addNewTask(404203742, taskDescription)"
        
        Обновлённый список:
        ${JSON.stringify(unfinishedTasks3)}
        
        Вообще все задачи: "await (await FirebaseHandler.create(client)).listAllUserTasks(404203742, 20)"
        ${JSON.stringify(allTasks)}
       `)
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



