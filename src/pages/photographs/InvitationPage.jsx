import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";
import { useNavigate} from "react-router-dom";

export default function InvitationPage() {
  const navigation = useNavigate();
  const photographerId = +localStorage.getItem("idPhotographer");

  const [events, setEvents] = useState([]);

  // initial values
  useEffect(() => {
    api
      .get(`/event/invitation/photographer/${photographerId}`)
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // handlers
  const handleAcceptInvitation = (eventId) => {
    api
      .post(`/photographer/${photographerId}/accept-invitation/${eventId}`)
      .then((res) => {
        console.log(res.data);
        navigation("/fotografos/eventos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container m-5">
      <h2>Invitaciones Pendientes</h2>
      <div className="row">
        <div className="col-8">
          <ul className="list-group">
            {events.map((event) => (
              <li key={event.eventId} className="list-group-item">
                <span><b>Evento:</b> {event.eventName}</span><br/>
                <span className="me-5"><i className="bi bi-calendar-event"></i>  {event.date}</span>
                <span className="me-5"> <i className="bi bi-clock"></i>  {event.time}</span><br/>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAcceptInvitation(event.eventId)}
                >
                  Aceptar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}