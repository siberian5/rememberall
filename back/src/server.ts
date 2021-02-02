#!/usr/bin/node
'use strict';

import { Request, Response, NextFunction } from 'express'

import express from 'express'
import bodyParser from 'body-parser'
import Config from './Config'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//404
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('Not found')
});

//500
app.use( function (err: Error, req: Request, res: Response, next : NextFunction) {
    res.type('text/plain')
    res.status(500)
    res.send('Server error')
});

app.listen(Config.Server.port, () => {
    console.log(new Date().toString().replace(/ \(.*\)$/,'\t') + 'App started on: ', app.get('port'))
})
