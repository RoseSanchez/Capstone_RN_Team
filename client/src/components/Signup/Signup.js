import React, { useState } from 'react'
import { Button, Input, Form } from 'semantic-ui-react'
import { signUp } from '../../api/Promoters/promotersRoutes';

const Signup = () => {
    const [userInfo, setUserInfo] = useState({name:"", password:"",email:"", address:""})
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(userInfo)
        const result = await signUp(userInfo)
        console.log(result.newPromoter)
        setUserInfo({name:"", password:"",email:"", address:""})
    }
    return(
        <Form onSubmit={(e) => handleSubmit(e)}>
            Signup
            <Form.Field>
                <label>Name</label>
                <input placeholder='Name' 
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    value={userInfo.name}
                />
            </Form.Field>
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
                <label>Address</label>
                <input placeholder='Address' 
                    onChange={(e) =>
                        setUserInfo({ ...userInfo, address: e.target.value })
                    }
                    value={userInfo.address}
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

export default Signup