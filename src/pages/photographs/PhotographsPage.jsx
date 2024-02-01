import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/gatewayApi";
import Card from "../../components/Card";

export default function PhotographsPage() {
  // navigation
  const navigate = useNavigate();

  // states
  const [events, setEvents] = useState([]);
  
  const photographerId = +localStorage.getItem("idPhotographer");
  console.log('photographerId', photographerId);
  // initial values
  useEffect(() => {
    api
      .get(`/photographer/${photographerId}/events`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container m-5">
      <h2>Eventos</h2>
      <div className="row">
        {events.map((event) => {
          return (
            <div className="col-3" key={event.id}>
              <Card
                id={event.event.id} 
                title={event.event.name} 
                date={`Fecha: ${event.event.date}`} 
                time={`Hora: ${event.event.time}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}