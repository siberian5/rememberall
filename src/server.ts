#!/usr/bin/node
'use strict'

import DataProvider from './data/DataProvider'
import {runExpressWebServer} from './WebServer'

async function main() {

    console.log('starting environment: ')
    console.log(process.env)


    const dataClient = await DataProvider.create()

    runExpressWebServer(dataClient)
}

main().then(_ => {})

