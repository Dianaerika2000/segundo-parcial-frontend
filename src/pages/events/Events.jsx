import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export default function Events() {
  // navigation
  const navigate = useNavigate();

  // states
  const [events, setEvents] = useState([]);

  // initial values
  useEffect(() => {
    api
      .get("/organizer/1/events")
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
      <div className="row mb-3">
        <div className="col-12">
          <Link
            className="btn btn-primary"
            to="/eventos/crear"
          >
            <i className="bi bi-plus-square-fill"></i> Crear Evento
          </Link>
        </div>
      </div>
      <div className="row">
        {events.map((event) => {
          return (
            <div className="col-3" key={event.id}>
              <Card 
                title={event.name} 
                date={`Fecha: ${event.date}`} 
                time={`Hora: ${event.time}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}