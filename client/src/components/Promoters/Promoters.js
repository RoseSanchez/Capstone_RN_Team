import styles from './Promoters.module.css'
import { Button, Grid, Card, Icon, Image, Modal, Header, Form } from 'semantic-ui-react'
import mainLogo from '../../assets/eventPhoto.jpeg'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEvent, getAllEvents, getEventsByPromoter } from '../../api/Events/eventsRoutes'

function Promoters() {

  const [eventsLst, setEvents] = useState([])
  useEffect(()=>{
    let events = [];
    const evnts =async()=>{
      
      let tempLst = [];
      let response = await getEventsByPromoter({id: Number(JSON.parse(localStorage.getItem('user')).id)})
      let allEvents = response.events
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
      // console.log("events", events)
      setEvents(events)
    }
    evnts().catch(console.error)
  }, [])
  // let allEvents = []
 

 

  // const evnts =async()=>{
  //   let allEvents = await getAllEvents()
  //   // console.log('evnts', allEvents)
  //   allEvents.forEach((evnt, i)=>{
  //     console.log(evnt)
  //     if(tempLst.length < 3){
  //       tempLst.push(evnt)
  //     }else{
  //       events.push(tempLst)
  //       tempLst = []
  //       tempLst.push(evnt)
  //     }
  //     if(i === allEvents.length -1) events.push(tempLst)
  //   })
  //   console.log("events", events)
  //   setEvents(events)
  // }
  // evnts()

  // console.log("allEventos", allEvents)




  // const allEvents = [{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}, {name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}, {name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}, {name:"event10", photo:"url"}]
  // const events = [[{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}],[{name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}],[{name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}]]


  // allEvents.forEach((evnt, i)=>{
  //   if(tempLst.length < 3){
  //     tempLst.push(evnt)
  //   }else{
  //     events.push(tempLst)
  //     tempLst = []
  //     tempLst.push(evnt)
  //   }
  //   if(i === allEvents.length -1) events.push(tempLst)
  // })


  // console.log("all events", events)
  const [open, setOpen] = useState(false)
  const [eventInfo, setEventInfo] = useState({title:"", details:"", price:"", location:"", date:"", photo:""})
  const navigate = useNavigate()

  // console.log(JSON.parse(localStorage.getItem('user')).id)

  const createEventCall=async(e)=>{
    // e.preventDefault()
    // console.log('create event call')
    const eventBodySend = {...eventInfo, promoterid: JSON.parse(localStorage.getItem('user')).id}
    // console.log(eventBodySend)
    const result = await createEvent(eventBodySend)
    console.log(result)
    // console.log(result.newEvent)
    window.location.replace(`event/${result.newEvent.event.id}`)
    setEventInfo({title:"", details:"", price:"", location:"", date:"", photo:""})
  }

  console.log()

  return (
    <div>
    {/* {console.log(eventsLst)} */}
      {/* <nav className={styles.navBar}>
        <p className={styles.title}>PURCycling</p>
        <Button className={styles.sbmtBtn} type='submit'>SignUp</Button>
      </nav> */}
      <div className={styles.events}>
        <Grid>
          <Grid.Row className={styles.eventsHeader}>
            {/* <Grid.Column> */}
              <p className={styles.title}>Events</p>
            {/* </Grid.Column> */}
            {/* <Grid.Column> */}
            <Button onClick={()=>{setOpen(true)}} className={styles.sbmtBtn} type='submit'>Create New Event</Button>
            {/* </Grid.Column> */}
          </Grid.Row>
          {/* <Grid.Row> */}
            {

              eventsLst.map(eventRow =>{
                // console.log(eventRow)
                return(
                  <Grid.Row className={styles.eventRow}>
                    {eventRow.map(event=>{
                      // console.log(event)
                      return(
                        <Card onClick={()=>{navigate(`/event/${event.id}`)}}>
                          <img  src={mainLogo} alt="fireSpot"/>
                          <Card.Content>
                          <Card.Header>{event.name}</Card.Header>
                            <Card.Meta>
                              {/* <span className='date'>Joined in 2015</span> */}
                              <span className='date'>{event.date}</span>
                            </Card.Meta>
                            <Card.Description>
                              {event.details}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <a>
                              <Icon name='user' />
                              number of current participants ?
                            </a>
                          </Card.Content>
                        </Card>
                      )
                    })}
                  </Grid.Row>
                )

              })

              // events[0].map(event=>{
              //   return(
              //     <Card>
              //       <Image src='../../assets/Logo.jpeg' wrapped ui={false}/>
              //       <Card.Content>
              //       <Card.Header>{event.name}</Card.Header>
              //         <Card.Meta>
              //           <span className='date'>Joined in 2015</span>
              //         </Card.Meta>
              //         <Card.Description>
              //           Matthew is a musician living in Nashville.
              //         </Card.Description>
              //       </Card.Content>
              //       <Card.Content extra>
              //         <a>
              //           <Icon name='user' />
              //           22 Friends
              //         </a>
              //       </Card.Content>
              //     </Card>
              //   )
              // })
            }
          {/* </Grid.Row> */}
          <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Create Event</Modal.Header>
      <Modal.Content >
        {/* <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped /> */}
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          {/* <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p> */}
          <Form >
            <Form.Group widths='equal' className={styles.eventForm}>
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, title:e.target.value})}} fluid label='Title' placeholder='Title' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, details:e.target.value})}} fluid label='Details' placeholder='Details' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:Number(e.target.value)})}} type='number' fluid label='Price' placeholder='Price' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, location:e.target.value})}} fluid label='Location' placeholder='Location' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, date:e.target.value})}} fluid label='Date' placeholder='Date' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, photo:e.target.value})}} fluid label='Photo' placeholder='Photo' />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Create Event"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {
              createEventCall();
              // console.log(eventInfo);
              setOpen(false)
            }
          }
          positive
        />
      </Modal.Actions>
    </Modal>
        </Grid>
      </div>
    </div>
  );
}

export default Promoters;
