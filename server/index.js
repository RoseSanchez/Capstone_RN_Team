const express = require('express')
const app = express()
const cors = require('cors')
const port = 3333
const WebSocket = require("ws");
const {Pool} = require('pg')
app.use(cors())
app.use(express.json())
const promotersController = require('./controllers/PromotersController')
const promoterController = promotersController.PromotersController
const promoterControllerObj = new promoterController()
// Postgresql DB connection
// const pool = new Pool({
//     // connectionString:"jdbc:postgresql://ec2-34-197-91-131.compute-1.amazonaws.com:5432/deurl2dd6unmb5",
//     connectionString:"postgres://njupbwybsaqiqt:3935f060b092cdc8a630a2ba09c9b00e0ac1131c3fc28b01b77182cbb0e1d3f6@ec2-34-197-91-131.compute-1.amazonaws.com:5432/deurl2dd6unmb5",
//     ssl:{rejectUnauthorized: false},
//     max: 20,
//     idleTimeoutMillis: 30000
// })

// run application server
const myServer = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const wsServer = new WebSocket.Server({
    noServer: true
})                                      // a websocket server

wsServer.on("connection", function(ws) {    // what should a websocket do on connection
    ws.on("message", function(msg) {        // what to do on message event
        console.log('websocket call')
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {     // check if client is ready
                client.send(msg.toString());
            }
        })
    })
})

wsServer.on("insert", function(ws) {    // what should a websocket do on connection
    console.log('item inserted')
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {     // check if client is ready
            console.log('client send')
            client.send('new item');
        }
    })
})

myServer.on('upgrade', async function upgrade(request, socket, head) {      //handling upgrade(http to websocekt) event
    // accepts half requests and rejects half. Reload browser page in case of rejection
    if(Math.random() > 0.5){
        console.log('closed')
        return socket.end("HTTP/1.1 401 Unauthorized\r\n", "ascii")     //proper connection close in case of rejection
    }
    // emit connection when request accepted
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
      wsServer.emit('connection', ws, request);
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/create', async(req, res)=>{
    // try {
        // const db = await pool.connect()
    //     db.query('INSERT INTO <insert table name> () VALUES ()', (err, response)=>{
    //             console.log(response.rows)
    //             res.send(response.rows)
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
    // pool.end()
})

app.post('/delete', async(req, res)=>{
    // code here
})

app.post('/update', (req, res)=>{
    // code here
})

app.get('/selectSomething', async(req, res) => {
    // try {
    //     const db = await pool.connect()
    //     db.query('SELECT * FROM <insert table name>;', (err, response)=>{
    //             res.send(response.rows)
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
    // pool.end()
})

app.get('/getAllPromoters', async(req, res)=>{
    try {
        const promoters = await promoterControllerObj.showAllPromoters()
        res.send({"promoters":promoters.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getPromoter', async(req, res)=>{
    try {
        const {id} = req.body
        const promoter = await promoterControllerObj.showPromoter(id)
        res.send({"promoter":promoter.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createPromoter',async(req, res)=>{
    try {
        const {name, password, email, address} = req.body
        const promoter = await promoterControllerObj.insertPromoter(name, password, email, address)
        res.send({"newPromoter":promoter.result})
    } catch (error) {
        console.log(error)
    }
})

// dbListeners = async ()=>{
//     const db = await pool.connect()
//     try {
//         await db.query('LISTEN update')
//         await db.query('LISTEN insert')
//         console.log('Listening for changes in datbase...')

//         db.on('notification', (msg)=>{
//             console.log(`Recieved notification, ${msg.channel} in: ${msg.payload} table`)
//             wsServer.emit('insert')
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
// dbListeners()