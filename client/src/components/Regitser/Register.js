import { useEffect, useState } from "react";
//import { useLoaderData, useParams } from "react-router-dom";
import {useParams } from "react-router-dom";
//import { Label, Form } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import defaultEventImg from "../../assets/default-image.png"
import defaultLocation from "../../assets/default.png"
import styles from "./Register.module.css"
import {createParticipant} from "../../api/Participants/participantsRoute.js"

function Event() {
  const [participantInfo, setParticipantInfo] = useState()
  const {eventId} = useParams()
  console.log(eventId)
  console.log(window.location.pathname)
  // console.log(useLoaderData())
//   console.log(id)
  const [event, setEvent] = useState()

  const handleSubmit =async(e)=>{
    e.preventDefault()

    console.log(participantInfo)
        const result = await createParticipant(participantInfo)
        console.log(result.newPromoter)
        setParticipantInfo({name:"",email:"",
          phone:"",
          gender:"",
          birthdate:"",
          address:"",
          category:""})
  }

  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(eventId)})
      console.log(eventResponse)
      console.log(eventResponse)
      setEvent(eventResponse.event)
    }
    event().catch(console.error)
  },[])
  return (
    // console.log(event)
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<div className={styles.parent}>
      <div className={styles.container}>
        <p className={styles.title}>{event.title}</p> 
        <button>show or export participants</button>
        <img  src={defaultEventImg} alt="fireSpot"/>
        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        <div className={styles.details}>
          <p>${event.price} | {" "}</p> 
          <p>{event.date}</p> 
        </div>
        <img  src={defaultLocation} alt="fireSpot"/> 
        <Form >
            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, name:e.target.value})}} fluid label='Name' placeholder='Name' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, email:e.target.value})}} fluid label='Email' placeholder='Email' />
                {/* <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' /> */}
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, phone:e.target.value})}} fluid label='Phone' placeholder='Phone' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, gender:e.target.value})}} fluid label='Gender' placeholder='Gender' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, birthdate:e.target.value})}} fluid label='Birthdate' placeholder='Birthdate' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, address:e.target.value})}} fluid label='Address' placeholder='Address' />
                <Form.Input onChange={(e)=>{setParticipantInfo({...participantInfo, category:e.target.value})}} fluid label='Category' placeholder='Category' />
            </Form.Group>
            <button onClick={(e)=>{handleSubmit(e)}}>submit</button>
          </Form>
      </div>
      
    </div>):<>Loading Event</>
  );
}

export default Event;
