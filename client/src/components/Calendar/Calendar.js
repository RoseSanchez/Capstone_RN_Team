import React, { useEffect, useState } from "react";
import { Grid, Card, Icon, Button } from "semantic-ui-react";
import styles from './Calendar.module.css'
import { useNavigate, useParams } from "react-router-dom";
import mainLogo from '../../assets/eventPhoto.jpeg'
import { getEventsByDate } from "../../api/Events/eventsRoutes";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; 
import moment from 'moment'

function CalendarP() {

  const [dateState, setDateState] = useState(new Date())
  const [eventExists, setEventExists] = useState(new Date())
  const changeDate = async (e) => {
    let events = [];
    setDateState(e)
    let tempLst = [];
    const response = await getEventsByDate({"timestamp": (moment(e).format('YYYY-MM-DD'))})
      
    console.log("what iis day",(moment(dateState).format('YYYY-MM-DD')))
    console.log("response",response.events.length)
    let allEvents = response? response.events.reverse():null
    
    // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

    console.log('evnts', allEvents)
    allEvents.forEach((evnt, i)=>{
      // console.log(evnt)
      if(tempLst.length < 3){
        tempLst.push(evnt)
      }else{
        events.push(tempLst)
        tempLst = []
        tempLst = tempLst.concat(evnt)
      }
      if(i === allEvents.length -1) events.push(tempLst)
    })
    console.log("events", events)
    setEvents(events)
  }
  const doesHaveEvent = async (e) =>{
  const response = await getEventsByDate({"timestamp": (moment(e).format('YYYY-MM-DD'))})
   return response.events.length
  }
  const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

  const [eventsLst, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    let events = [];
    const evnts =async()=>{
      
      let tempLst = [];
      // let response = await getEventsByPromoter({id: Number(JSON.parse(localStorage.getItem('user')).id)})
      // let response = allEvenherots
      const response = await getEventsByDate({"timestamp": (moment(dateState).format('YYYY-MM-DD'))})
      
      console.log("what iis day",(moment(dateState).format('YYYY-MM-DD')))
      console.log("response",response)
      let allEvents = response? response.events.reverse():null
      
      // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]

      console.log('evnts', allEvents)
      allEvents.forEach((evnt, i)=>{
        // console.log(evnt)
        if(tempLst.length < 3){
          tempLst.push(evnt)
        }else{
          events.push(tempLst)
          tempLst = []
          tempLst = tempLst.concat(evnt)
        }
        if(i === allEvents.length -1) events.push(tempLst)
      })
      console.log("events", events)
      setEvents(events)
    }
    evnts().catch(console.error)
  }, [])


  return (
    <Grid textAlign="center" style={{"margin-top": "auto"}}>
    <div >
      <Calendar 
      value={dateState}
      onChange={changeDate }
      tileClassName={({ date, view }) => {
        if(doesHaveEvent(date) == 0){
         return 'highlight' /*style={{"margin-top": "auto"}}*/
        }
      }}
      />
    <p>Current selected date  <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
    <div> events should show up here
        {console.log(eventsLst)}
        {
          

eventsLst.map(eventRow =>{
  // console.log(eventRow)
  return(
    <Grid.Row className={styles.eventRow}>
      {eventRow.map(event=>{
        // console.log(event)
        return(
          <Card>
            <img  src={event.photo}/>
            <Card.Content>
            <Card.Header>{event.title}</Card.Header>
              <Card.Meta>
                {/* <span className='date'>Joined in 2015</span> */}
                <span className='date'>{event.date}</span>
              </Card.Meta>
              <Card.Description>
                {/* {event.details} */}
                {/* {event.photo} */}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
              </a>
            </Card.Content>
            <Button onClick={()=>{navigate(`/registerParticipant/${event.id}`)}} className={styles.sbmtBtn} type='submit'>Register</Button>
          </Card>
        )
      })}
    </Grid.Row>
  )

})
}
      </div>
    </div>
    </Grid>
    
  )
}
  export default CalendarP;