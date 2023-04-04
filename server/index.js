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

const participantsController = require('./controllers/ParticipantsController')
const participantController = participantsController.ParticipantsController
const participantControllerObj = new participantController()

const ordersController = require('./controllers/OrdersController')
const orderController = ordersController.OrdersController
const orderControllerObj = new orderController()

const ticketsController = require('./controllers/TicketsController')
const ticketController = ticketsController.TicketsController
const ticketControllerObj = new ticketController()
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

app.post('/logInPromoter', async(req, res)=>{
    console.log(req.body)
    try {
        const {email, password} = req.body
        const promoter = await promoterControllerObj.logIn(email, password)
        res.send({"promoter":promoter.result})
    } catch (error) {
        console.log(error)
    }
})


app.post('/createPromoter',async(req, res)=>{
    console.log('create promoter call', req.body)
    try {
        const {name, password, email, address} = req.body
        const newPromoter = await promoterControllerObj.insertPromoter(name, password, email, address)
        res.send({"newPromoter":newPromoter.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/deletePromoter',async(req, res)=>{
    try {
        const {id} = req.body
        const deletedPromoter = await promoterControllerObj.removePromoter(id)
        res.send({"deletedPromoter":deletedPromoter.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/updatePromoter',async(req, res)=>{
    try {
        const {id, name, password, email, address} = req.body
        const updatedPromoter = await promoterControllerObj.editPromoter(id, name, password, email, address)
        res.send({"updatedPromoter":updatedPromoter.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getAllParticipants', async(req, res)=>{
    try {
        const participants = await participantControllerObj.showAllParticipants()
        res.send({"participants":participants.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getParticipant', async(req, res)=>{
    try {
        const {id} = req.body
        const participant = await participantControllerObj.showParticipant(id)
        res.send({"participant":participant.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createPrarticipant',async(req, res)=>{
    try {
        const {} = req.body
        const newParticipant = await participantControllerObj.insertParticipant(name, password, email, address)
        res.send({"newParticipant":newParticipant.result})
    } catch (error) {
        console.log(error)
    }
})
///////////////////////////////////////////
//rose
app.get('/getAllOrders', async(req, res)=>{
    try {
        const orders = await orderControllerObj.showAllOrders()
        res.send({"orders":orders.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/getOrder', async(req, res)=>{
    console.log(req.body)
    try {
        const {id} = req.body
        const order = await orderControllerObj.showOrder(id)
        res.send({"order":order.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createOrder',async(req, res)=>{
    console.log('create oreder call', req.body)
    try {
        const {orderemail, paymentdetails} = req.body 
        const newOrder = await orderControllerObj.insertOrder(orderemail, paymentdetails)
        res.send({"newOrder":newOrder.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/deleteOrder',async(req, res)=>{
    try {
        const {id} = req.body
        const deletedOrder = await orderControllerObj.removeOrder(id)
        res.send({"deletedOrder":deletedOrder.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/updateOrder',async(req, res)=>{
    try {
        const {id, orderEmail, orderDetails} = req.body
        const updatedOrder = await orderControllerObj.editOrder(id, orderEmail, orderDetails)
        res.send({"updatedOrder":updatedOrder.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getAllTickets', async(req, res)=>{
    try {
        const tickets = await ticketControllerObj.showAllTickets()
        res.send({"tickets":tickets.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getTicket', async(req, res)=>{
    try {
        const {id} = req.body
        const ticket = await ticketControllerObj.showticket(id)
        res.send({"ticket":ticket.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createTicket',async(req, res)=>{
    console.log('create ticket call', req.body)
    try {
        const {orderID, participantID, eventID} = req.body 
        const newTicket = await ticketControllerObj.insertTicket(orderID, participantID, eventID)
        res.send({"newTicket":newTicket.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/deleteTicket',async(req, res)=>{
    try {
        const {id} = req.body
        const deletedTicket = await ticketControllerObj.removeTicket(id)
        res.send({"deletedTicket":deletedTicket.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/updateTicket',async(req, res)=>{
    try {
        const {id, orderID, participantID, eventID} = req.body
        const updatedTicket = await orderControllerObj.editOrder(id, orderID, participantID, eventID)
        res.send({"updatedOrder":updatedTicket.result})
    } catch (error) {
        console.log(error)
    }
})

// end rose
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