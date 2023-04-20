const Cloud = require('@google-cloud/storage')
const path = require('path')
const config = require("./keysConfig").config
// const serviceKey = path.join(__dirname, './keys.json')
const serviceKey = JSON.parse(JSON.stringify(config))

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'tough-mechanic-370015',
})

module.exports = storage