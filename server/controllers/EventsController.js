const eventsModel = require('../models/EventsModel')
const eventModel = eventsModel.EventsModel
const eventModelObj = new eventModel()

class EventsController {
    constructor(){
        this.model = eventModelObj
    }

    // update insert event parameters
    insertEvent(promoterID, details, price, location, photo, date, title){ 
        return new Promise(async(resolve, reject) => {
            try {
                const newEvent = await this.model.createEvent(promoterID, details, price, location, photo, date, title)
                let result = newEvent.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showAllEvents(){
        return new Promise(async(resolve, reject) => {
            try {
                const events = await this.model.readAllEvents()
                let result = events.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showEvent(eventID){
        return new Promise(async(resolve, reject) => {
            let result
            try {
                const event = await this.model.readEvent(id)
                result = event.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    editEvent(eventID){
        return new Promise(async(resolve, reject)=>{
            try{
                
            }catch(error){
                console.log(error)
            }
        })
    }

    removeEvent(eventID){
        return new Promise(async(resolve, reject)=>{
            try{
                
            }catch(error){
                console.log(error)
            }
        })
    }
}

module.exports = {EventsController: EventsController}
