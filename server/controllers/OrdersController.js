const ordersModel = require('../models/OrdersModel')
const orderModel = ordersModel.OrdersModel
const orderModelObj = new ordersModel()

class OrdersController {
    constructor(){
        this.model = orderModelObj
    }

    insertOrder(orderEmail, orderDetails, participantIDs, ticketIDs){
        return new Promise(async(resolve, reject) => {
            try {
                const newPromoter = await this.model.createOrder(orderEmail, orderDetails,participantIDs,ticketIDs)
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
                const orders = await this.model.readAllOrders()
                let result = orders.result
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
                const orders = await this.model.readOrder(id)
                result = orders.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    editOrder(){

    }

    removeOrder(){

    }
}

module.exports = {OrdersController: OrdersController}
