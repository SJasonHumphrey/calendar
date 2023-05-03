import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const locales = { "en-us": require ("date-fns/locale/en-US")};

const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales
})

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    for (let i=0; i < allEvents.length; i++){

      const d1 = new Date (allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

       if (
        ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
          (d4 <= d3) )
        )
      {   
          alert("CLASH"); 
          break;
       }

  }
    setShow(false);
    setAllEvents([...allEvents,newEvent])
  }
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <h1>Calendar</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Event
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 700, margin: "50px" }} />
    </div>
  );
}

export default App;
