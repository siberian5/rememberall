#!/usr/bin/node
'use strict'


import {runExpressWebServer} from './WebServer'
import {runTelegramBot} from './TelegramBot'

console.log('starting environment: ')
console.log(process.env)

runExpressWebServer()
runTelegramBot()
