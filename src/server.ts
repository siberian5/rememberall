#!/usr/bin/node
'use strict'

import DataProvider from './data/DataProvider'
import {runTelegramBot} from './TelegramBot'

async function main() {

    console.log('starting environment: ')
    console.log(process.env)


    const dataClient = await DataProvider.create()

    // runExpressWebServer(dataClient)
    runTelegramBot(dataClient)
}

main().then(_ => {})

