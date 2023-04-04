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

const EventsController = require('./controllers/EventsController')
const EventController = eventsController.EventsController
const EventControllerObj = new EventController()

const waiversController = require('./controllers/WaiverController')
const waiverController = waiversController.waiverController
const waiverControllerObj = new waiverController()

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

app.get('/getOrder', async(req, res)=>{
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
        const {orderEmail, orderDetails} = req.body 
        const newOrder = await promoterControllerObj.insertOrder(orderEmail, orderDetails)
        res.send({"newOrder":newOder.result})
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
// enrose
// Leonel

app.get('/getAllEvents', async(req, res)=>{
    try {
        const events = await eventControllerObj.showAllEvents()
        res.send({"events":events.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getEvent', async(req, res)=>{
    try {
        const {eventID} = req.body
        const event = await eventControllerObj.showEvent(eventID)
        res.send({"event":event.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createEvent',async(req, res)=>{
    console.log('create event call', req.body)
    try {
        const {promoterID, details, price, location, photo, date, title} = req.body
        const newEvent = await eventControllerObj.insertEvent(promoterID, details, price, location, photo, date, title)
        res.send({"newEvent":newEvent.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/deleteEvent',async(req, res)=>{
    try {
        const {eventID} = req.body
        const deletedEvent = await eventControllerObj.removeEvent(eventID)
        res.send({"deletedEvent":deletedEvent.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/updateEvent',async(req, res)=>{
    try {
        const {promoterID, details, price, location, photo, date, title} = req.body
        const updatedEvent = await eventControllerObj.editEvent(promoterID, details, price, location, photo, date, title)
        res.send({"updatedEvent":updatedEvent.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getAllWaivers', async(req, res)=>{
    try {
        const waivers = await waiverControllerObj.showAllWaivers()
        res.send({"waivers":waivers.result})
    } catch (error) {
        console.log(error)
    }
})

app.get('/getWaiver', async(req, res)=>{
    try {
        const {waiverID} = req.body
        const waiver = await waiverControllerObj.showWaiver(waiverID)
        res.send({"waiver":waiver.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/createWaiver',async(req, res)=>{
    console.log('create waiver call', req.body)
    try {
        const {partipantID, document, signed} = req.body
        const newWaiver = await waiverControllerObj.insertWaiver(partipantID, document, signed)
        res.send({"newWaiver":newWaiver.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/deleteWaiver',async(req, res)=>{
    try {
        const {waiverID} = req.body
        const deletedWaiver = await waiverControllerObj.removeWaiver(waiverID)
        res.send({"deletedWaiver":deletedWaiver.result})
    } catch (error) {
        console.log(error)
    }
})

app.post('/updateWaiver',async(req, res)=>{
    try {
        const {partipantID, document, signed} = req.body
        const updatedWaiver = await waiverControllerObj.editWaiver(partipantID, document, signed)
        res.send({"updatedWaiver":updatedWaiver.result})
    } catch (error) {
        console.log(error)
    }
})
//End Leonel
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