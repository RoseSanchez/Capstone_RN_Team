const waiversModel = require('../models/WaiverModel')
const waiverModel = waiversModel.WaiversModel
const waiverModelObj = new waiverModel()

class WaiversController {
    constructor(){
        this.model = waiverModelObj
    }

    // update insert waiver parameters
    insertWaiver(partipantID, document, signed){
        return new Promise(async(resolve, reject) => {
            try {
                const newWaiver = await this.model.createWaiver(partipantID, document, signed)
                let result = newWaiver.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showAllWaivers(){
        return new Promise(async(resolve, reject) => {
            try {
                const waivers = await this.model.readAllWaivers()
                let result = waivers.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showWaiver(waiverID){
        return new Promise(async(resolve, reject) => {
            let result
            try {
                const waiver = await this.model.readWaiver(waiverID)
                result = waiver.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    editWaiver(waiverID){
        return new Promise(async(resolve, reject)=>{
            try{ //partipantID, document, signed
                const propsToEdit = [{value: orderID, partipantID:"partipantID"}, {value: document, propName:"document"}, {value: signed, propName:"signed"}]
                const updatedWaiver = await this.model.updatedWaiver(waiverID, propsToEdit)
                let result = updatedWaiver.result
                return resolve({
                    result: result,
                });
            }catch(error){
                console.log(error)
            }
        })
    }

    removeWaiver(waiverID){
        return new Promise(async(resolve, reject)=>{
            try{
                const deletedWaiver= await this.model.deleteWaiver(waiverID)
                let result = deletedWaiver.result
                return resolve({
                    result: result,
                });
            }catch(error){
                console.log(error)
            }
        })
    }
}

module.exports = {WaiversController: WaiversController}
