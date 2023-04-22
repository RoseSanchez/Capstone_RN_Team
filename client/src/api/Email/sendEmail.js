import axios from "axios"
// export const sendEmail =()=>{
//     console.log('send email call')
//     axios.post('https://api.emailjs.com/api/v1.0/email/send', (req, res)=>{
//         const data = {
//             "service_id": "service_hw40h0i",
//             "user_id": "user_tCG7P6Pcyov5HwHEE9KTc",
//             "template_id": "template_sh1fsrn",
//             "template_params":{
//                 "destination":"jggm9090@gmail.com",
//                 "name":"Prueba",
//                 "message": "prueba",
//                 "from_name":"Jose"
//             }
//         }
    
//     })
// }


export const sendEmail = async (emailBodySend) => {
    const dataSend = {
        "service_id": "service_hw40h0i",
        "user_id": "user_tCG7P6Pcyov5HwHEE9KTc",
        "template_id": "template_sh1fsrn",
        "template_params":{
            "destination":"jggm9090@gmail.com",
            "name":"Prueba",
            "message": "prueba",
            "from_name":"Jose",
            "participants":"name: part1, addres:part1 \n name: part2, addres:part2"
        }
    }
    try {
        // console.log('get all from api call')
        const eventResponse = await axios.post("https://api.emailjs.com/api/v1.0/email/send",
        emailBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = eventResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}