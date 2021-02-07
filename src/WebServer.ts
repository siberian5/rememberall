
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import Config from './Config'
import { DataClient } from './data/DataProvider'
import FirebaseHandler  from './data/firebase/FirebaseHandler'

export const runExpressWebServer = (client: DataClient ) => {

    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))


    // get all tasks:
    app.get('/users/:userId/tasks', async (req : Request, res : Response) => {

        const allTasks = await (await FirebaseHandler.create(client)).listAllUserTasks(+req.params.userId, 20)

        res.type('application/json')
        res.status(200)
        res.send(JSON.stringify(allTasks)+'\n')
    })

    // get unfinished tasks:
    app.get('/users/:userId/tasks-unfinished', async (req : Request, res : Response) => {

        const unfinishedTasks = await (await FirebaseHandler.create(client)).listUnfinishedUserTasks(+req.params.userId, 20)

        res.type('application/json')
        res.status(200)
        res.send(JSON.stringify(unfinishedTasks)+'\n')
    })


    // add new task
    app.post('/users/:userId/new-task', async (req : Request, res : Response) => {

        const taskDescription = req.body.description

        await (await FirebaseHandler.create(client)).addNewTask(+req.params.userId, taskDescription)

        res.type('text/plain')
        res.status(200)
        res.send( `new task with the description: "${taskDescription}" is posted\n`)
    })

    // finish task
    app.post('/users/:userId/finish-task', async (req : Request, res : Response) => {

        const taskName = req.body.name

        await (await FirebaseHandler.create(client)).finishTask(+req.params.userId, taskName)
        const task = await (await FirebaseHandler.create(client)).getTaskByName(+req.params.userId, taskName)

        res.type('application/json')
        res.status(200)
        res.send(JSON.stringify(task)+'\n')

    })

    // get taskByName
    app.post('/users/:userId/get-task', async (req : Request, res : Response) => {

        const taskName = req.body.name

        const task = await (await FirebaseHandler.create(client)).getTaskByName(+req.params.userId, taskName)

        res.type('application/json')
        res.status(200)
        res.send(JSON.stringify(task)+'\n')
    })

    app.get('/', async (req : Request, res : Response) => {

        const response = `


        чтобы получить список последних 20ти дел юзера ( и завершённых и незавершённых ),
        нужно послать GET-запрос по адресу: https://remembrallbot.herokuapp.com/users/404203742/tasks
        в формате '/users/<userId>/tasks'                                                             
        
        curl-пример: 
        curl https://remembrallbot.herokuapp.com/users/404203742/tasks




        
        чтобы получить список текущих незавершённых дел юзера,
        нужно послать GET-запрос по другой URLе.
        
        curl-пример: 
        curl https://remembrallbot.herokuapp.com/users/404203742/tasks-unfinished
        
        
        
        чтобы добавить новую задачу, нужно в теле запроза передать 
        сообщение в формате "description=<кодированное описание>"
        описание кодируется функцией 'encodeURI'
        
        curl-пример: 
        curl https://remembrallbot.herokuapp.com/users/404203742/new-task --data "description=%D0%BF%D0%BD%D1%83%D1%82%D1%8C%20%D0%BF%D0%BD%D1%8F"
        
        
        
        чтобы завершить задачу, делается то же самое, не передаётся имя задачи:
        сообщение в формате "name=<имя-задачи>"
        Его можно не кодировать, т.к. ни пробелов, ни национальных символов имя не содержит.
        
        curl https://remembrallbot.herokuapp.com/users/404203742/finish-task --data "name=/task32"
        
        
        
        Чтобы по имени вывести детали какого-то задания, 
        передаются те же данные, но по другой урле:
        
        curl https://remembrallbot.herokuapp.com/users/404203742/get-task --data "name=/task32"
        
       `

        res.type('text/plain')
        res.status(200)
        res.send(response)

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



