const ticketsModel = require('../models/TicketsModel')
const ticketModel = ticketsModel.TicketsModel
const ticketModelObj = new ticketModel()

class TicketsController {
    constructor(){
        this.model = ticketModelObj
    }

    insertTicket(orderID, participantID, eventID){
        return new Promise(async(resolve, reject) => {
            try {
                const newTicket = await this.model.createTicket(orderID, participantID, eventID)
                let result = newTicket.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showAllTickets(){
        return new Promise(async(resolve, reject) => {
            try {
                const tickets = await this.model.readAllTickets()
                let result = tickets.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showTicket(ticketID){
        return new Promise(async(resolve, reject) => {
            let result
            try {
                const ticket = await this.model.readTicket(ticketID)
                result = ticket.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    editTicket(ticketID){

    }

    removeTicket(ticketID){

    }
}

module.exports = {TicketsController: TicketsController}
