import express from 'express'
import {connection} from './db/connection.js'
import errorHandler from './src/middlewares/errorHandler.js'
import userRouter from './src/modules/user/user.router.js'
import noteRouter from './src/modules/note/note.router.js'

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(noteRouter)

connection()


app.use(errorHandler)

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})