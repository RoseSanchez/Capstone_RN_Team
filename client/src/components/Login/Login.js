import React, { useState } from 'react'
import { Button, Input, Form } from 'semantic-ui-react'
import { logIn } from '../../api/Promoters/promotersRoutes';
import { useAuth } from '../../customHooks/useAuth';

const Login = () => {
    const [userInfo, setUserInfo] = useState({email:"", password:""})
    const {login} = useAuth()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(userInfo)
        // const result = await logIn({"email":userInfo.email, "password":userInfo.password})
        const result = await logIn(userInfo)
        console.log(result.promoter)
        console.log(result.promoter === "success" ? true:false)
        if(result.promoter ==="success"){
            login(userInfo)
        }else{
            console.log(result)
        }
        setUserInfo({email:"", password:""})
    }
    return(
        <Form onSubmit={(e) => handleSubmit(e)}>
            Login
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' 
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    value={userInfo.email}
                />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' 
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                    }
                    value={userInfo.password}
                />
            </Form.Field>
        <Button type='submit'>Submit</Button>
        </Form>
    )
};

export default Login