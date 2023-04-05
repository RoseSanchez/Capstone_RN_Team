import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getEvent } from "../../api/Events/eventsRoutes";

function Event() {
  const {id} = useParams()
  console.log(window.location.pathname)
  // console.log(useLoaderData())
  console.log(id)
  const [event, setEvent] = useState()
  useEffect(()=>{
    const event =async()=>{
      const eventResponse = await getEvent({id: Number(id)})
      console.log(eventResponse)
      setEvent(eventResponse.event)
    }
    event().catch(console.error)
  },[])
  return (
    // console.log(event)
    // {event ? <>{event.details}</>:<>Loading Event</>}
    event ? (<>{
      <>
        <p>{event.details}</p> 
        <p>{event.price}</p> 
        <p>{event.location}</p> 
        <p>{event.photo}</p>
        <p>{event.date}</p> 
        <p>{event.title}</p> 
      </>
    }</>):<>Loading Event</>
  );
}

export default Event;
