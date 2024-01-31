import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";

export default function ReadEventPage() {
  const { id } = useParams();

  // states
  const [event, setEvent] = useState([]);
  const [photographers, setPhotographers] = useState([]);

  // initial values
  useEffect(() => {
    api
      .get(`/event/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("/photographer")
      .then((res) => {
        setPhotographers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container m-5">
      <div className="row d-flex justify-content-center">
        <div className="col-10">
          <div className="card border-info mb-3" >
            <div className="card-header bg-transparent border-info">
            </div>
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text">{event.description}</p>
                  <p><strong>Dirección:</strong> {event.address}</p>
                </div>
                <div className="col">
                  <p className="card-text"><strong>Fecha:</strong> {event.date} </p>
                  <p className="card-text"><strong>Hora:</strong> {event.time}</p>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-info">
              <h6 className="mb-3">Invitar un fotografo al evento:</h6>
              <form className="row g-3 mb-3">
                <div className="col-6">
                  <select id="inputState" className="form-select">
                    <option selected>Seleccionar...</option>
                    {photographers.map((photographer) => {
                      return (
                        <option key={photographer.id}>{photographer.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Enviar invitacion</button>
                </div>
              </form>
            </div>
          </div>
          <Link to={"/eventos"} type="button" class="btn btn-primary">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
        </div>
      </div>
    </div>
  );
}