import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Label, Form } from "semantic-ui-react";
import { getEvent } from "../../api/Events/eventsRoutes";
import defaultEventImg from "../../assets/default-image.png"
import defaultLocation from "../../assets/default.png"
import styles from "./Event.module.css"
import { numberOfParticipants } from "../../api/Participants/participantsRoute";

function Event() {
  const [eventInfo, setEventInfo] = useState()
  const [numberParticipants, setnumberOfParticipants] = useState()
  const {id} = useParams()
  console.log(window.location.pathname)
  // console.log(useLoaderData())
  console.log(id)
  const [event, setEvent] = useState()
  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(id)})
      const numberOfParts = await numberOfParticipants({eventid: Number(id)})
      console.log(numberOfParts)
      console.log(eventResponse)
      setEvent(eventResponse.event)
      setnumberOfParticipants(numberOfParts.ticketNumber.count)
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
        <img  src={event.photo} alt="fireSpot"/>
        <p style={{alignSelf:"flex-start", fontWeight:"bold", fontSize:"2rem"}}>Details</p>
        <div className={styles.details}>
          <p>${event.price} | {" "}</p> 
          <p>{event.date}</p> 
          <p> | Participants: {numberParticipants}</p>
        </div>
        <img  src={defaultLocation} alt="fireSpot"/> 
      </div>
    </div>):<>Loading Event</>
  );
}

export default Event;
