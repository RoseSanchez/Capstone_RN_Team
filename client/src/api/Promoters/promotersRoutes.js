import axios from 'axios'
export const signUp = async (signUpBodySend) => {
    try {
        // console.log('from api call', signUpBodySend)
        const signUpResponse = await axios.post("http://localhost:3333" + "/createPromoter",
        signUpBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = signUpResponse.data
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const logIn = async (logInBodySend) => {
    try {
        console.log('from api call', logInBodySend)
        const logInResponse = await axios.post("http://localhost:3333" + "/logInPromoter",
        logInBodySend,
            { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "true" } },
        )
        const data = logInResponse.data
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}