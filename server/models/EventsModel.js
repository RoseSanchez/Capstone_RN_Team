const {Pool} = require('pg')

class EventsModel{
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
    // get promoter(){
    //     return this.readPromoter();
    // }

    createEvent(promoterid, details, price, location, photo, date, title){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query(`insert into events (promoterid, details, price, location, photo, date, title) VALUES ('${promoterid}', '${details}', '${price}', '${location}', '${photo}', '${date}', '${title}')`, (err, response)=>{
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

    readAllEvent(){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query('SELECT * FROM events;', (err, response)=>{
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

    readEvent(id){
        return new Promise(async (resolve, reject) => {
            try {
                const db = await this.pool.connect()
                db.query(`SELECT * FROM events WHERE id=${id};`, (err, response)=>{
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

    udpateEvent(id){
        return new Promise(async(resolve, reject)=>{
            try{
                
            }catch(error){
                console.log(error)
            }
        })
    }

    deleteEvent(id){
        return new Promise(async(resolve, reject)=>{
            try{
                
            }catch(error){
                console.log(error)
            }
        })
    }

}

module.exports = {EventsModel: EventsModel}
