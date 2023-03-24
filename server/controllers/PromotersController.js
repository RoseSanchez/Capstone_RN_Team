const promotersModel = require('../models/PromotersModel')
const promoterModel = promotersModel.PromotersModel
const promoterModelObj = new promoterModel()

class PromotersController {
    constructor(){
        this.model = promoterModelObj
    }

    insertPromoter(){

    }

    showAllPromoters(){
        return new Promise(async(resolve, reject) => {
            let result
            try {
                const promoters = await this.model.readAllPromoters()
                result = promoters.result
                return resolve({
                    result: result,
                });
            } catch (error) {
                console.log(error)
            }
        });
    }

    showPromoter(){

    }

    editPromoter(){

    }

    removePromoter(){

    }
}

module.exports = {PromotersController: PromotersController}
