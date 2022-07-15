const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors');

const routes = require('./routes')
const revision = require('./revisiones')

const app = express()
app.set('port', process.env.PORT)
const dbOptions = {
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b781a1707a7b0a',
    password: '2f275e40',
    database: 'heroku_eab5df1206bdc89'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())


// routes -------------------------------------------
app.get('/', (req, res)=>{
    const content = `
    <h1>Server con Express</h1>
    <pre>Servidor creado como prueba para APP de Gestion Medica con Node y el framework Express</pre>
    `;
  res.send(content);
})
app.use('/api', routes)
app.use('/api1', revision)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})
