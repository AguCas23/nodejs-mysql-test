import express from 'express'
import indexRouter from './routes/index.routes.js'
import employesRouter from './routes/employes.routes.js' 

import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use(indexRouter)

app.use(employesRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message:'Endpoint Not Found'
    })
})

export default app;