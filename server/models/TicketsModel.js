const {Pool} = require('pg')

class TicketsModel{
    constructor(){
        // const connection_url = "jdbc:postgresql://ec2-34-197-91-131.compute-1.amazonaws.com:5432/deurl2dd6unmb5"
        const connection_url = "postgres://njupbwybsaqiqt:3935f060b092cdc8a630a2ba09c9b00e0ac1131c3fc28b01b77182cbb0e1d3f6@ec2-34-197-91-131.compute-1.amazonaws.com:5432/deurl2dd6unmb5"

        this.pool = new Pool({
            connectionString:connection_url,
            ssl:{rejectUnauthorized: false},
            max: 20,
            idleTimeoutMillis: 30000
        });
    }

    // getters
    // getTicket(){
    //     return this.readPromoter();
    // }

    createTicket(nameOfEvent, nameOfParticipant, EventID, eventDate, eventPrice, eventLocation){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query(`insert into tickets (nameOfEvent, nameOfParticipant, EventID, eventDate, eventPrice, eventLocation) VALUES ('${name}', '${password}', '${email}', '${address}')`, (err, response)=>{
                    let insertResult = response.rowCount
                    let result = insertResult > 0 ? "success":"failed"
                    return resolve({
                        result: result,
                    });
                })
            } catch (error) {
                console.log(error)
            }
        });
    }

    readAllTickets(){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query('SELECT * FROM tickets;', (err, response)=>{
                    let result = response.rows
                    return resolve({
                        result: result,
                    });
                })
            } catch (error) {
                console.log(error)
            }
        });
    }

    readTicket(id){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query(`SELECT * FROM tickets WHERE id=${id};`, (err, response)=>{
                    let result = response.rows[0]
                    return resolve({
                        result: result,
                    });
                })
            } catch (error) {
                console.log(error)
            }
        });
    }

    udpateTicket(){

    }

    deleteTicket(){

    }

}

module.exports = {TicketsModel: TicketsModel}

