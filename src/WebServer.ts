
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import Config from './Config'
import { DataClient } from './data/DataProvider'
import FirebaseHandler  from './data/firebase/FirebaseHandler'

export const runExpressWebServer = (client: DataClient ) => {

    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))


    // get unfinished tasks:
    app.get('/users/:userId/tasks', async (req : Request, res : Response) => {

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


    //todo: Показать как передавать!

    // finish task
    app.post('/users/:userId/finish-task', async (req : Request, res : Response) => {

        const taskName = req.body.name

        await (await FirebaseHandler.create(client)).finishTask(+req.params.userId, taskName)

        res.type('text/plain')
        res.status(200)
        res.send( `the task with the name: "${taskName}" is finished\n`)
    })

    // get taskByName
    app.post('/users/:userId/get-task', async (req : Request, res : Response) => {

        const taskName = req.body.name

        const task = await (await FirebaseHandler.create(client)).getTaskByName(+req.params.userId, taskName)

        res.type('application/json')
        res.status(200)
        res.send(JSON.stringify(task)+'\n')
    })

    //todo написать потом
    // default
    app.get('/', async (req : Request, res : Response) => {

        const response = `
        
        get to http://localhost:4000/users/404203742/tasks

        
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



