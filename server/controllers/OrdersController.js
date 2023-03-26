const ordersModel = require('../models/OrdersModel')
const orderModel = ordersModel.OrdersModel
const orderModelObj = new ordersModel()

class PromotersController {
    constructor(){
        this.model = promoterModelObj
    }

    insertOrder(name, password, email, address){
        return new Promise(async(resolve, reject) => {
            try {
                const newPromoter = await this.model.createPromoter(name, password, email, address)
                let result = newPromoter.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showAllPromoters(){
        return new Promise(async(resolve, reject) => {
            try {
                const promoters = await this.model.readAllPromoters()
                let result = promoters.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showPromoter(id){
        return new Promise(async(resolve, reject) => {
            let result
            try {
                const promoter = await this.model.readPromoter(id)
                result = promoter.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    editPromoter(){

    }

    removePromoter(){

    }
}

module.exports = {PromotersController: PromotersController}
