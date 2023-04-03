import styles from './Promoters.module.css'
import { Button, Grid, Card, Icon, Image, Modal, Header, Form } from 'semantic-ui-react'
import mainLogo from '../../assets/eventPhoto.jpeg'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Promoters() {
  const events = [[{name:"event1", photo:"url"}, {name:"event2", photo:"url"}, {name:"event3", photo:"url"}],[{name:"event4", photo:"url"}, {name:"event5", photo:"url"}, {name:"event6", photo:"url"}],[{name:"event7", photo:"url"}, {name:"event8", photo:"url"}, {name:"event9", photo:"url"}]]
  const [open, setOpen] = useState(false)
  const [eventInfo, setEventInfo] = useState({title:"", details:"", price:"", location:"", date:"", flyer:""})
  const navigate = useNavigate()
  return (
    <div>
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

              events.map(eventRow =>{
                return(
                  <Grid.Row className={styles.eventRow}>
                    {eventRow.map(event=>{
                      return(
                        <Card onClick={()=>{navigate('/event/id')}}>
                          <img  src={mainLogo} alt="fireSpot"/>
                          <Card.Content>
                          <Card.Header>{event.name}</Card.Header>
                            <Card.Meta>
                              <span className='date'>Joined in 2015</span>
                            </Card.Meta>
                            <Card.Description>
                              Matthew is a musician living in Nashville.
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <a>
                              <Icon name='user' />
                              22 Friends
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
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, price:e.target.value})}} fluid label='Price' placeholder='Price' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, location:e.target.value})}} fluid label='Location' placeholder='Location' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, date:e.target.value})}} fluid label='Date' placeholder='Date' />
                <Form.Input onChange={(e)=>{setEventInfo({...eventInfo, flyer:e.target.value})}} fluid label='Flyer' placeholder='Flyer' />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {console.log(eventInfo);setOpen(false)}}
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
