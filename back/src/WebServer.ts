
import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import Config from './Config'

export const runExpressWebServer = () => {

    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/', async (req : Request, res : Response) => {
        res.type('text/plain')
        res.status(200)
        res.send('Hi there!')
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



