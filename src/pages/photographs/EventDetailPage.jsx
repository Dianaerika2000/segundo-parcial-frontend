import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";

export default function EventDetailPage() {
  const { id } = useParams();
  const photographerId = +localStorage.getItem("idPhotographer");
  // states
  const [event, setEvent] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [photo, setPhoto] = useState([]);

  // Handlers
  const handleChangePhoto = (e) => {
    setPhoto(e.target.files[0]); 
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    api
      .post(`/event/${id}/photographers/${photographerId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante especificar el tipo de contenido como 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          <Link to={"/fotografos/eventos"} type="button" className="btn btn-primary my-3">
            <i className="bi bi-arrow-left"></i> Volver
          </Link>
          <div className="card border-info mb-3" >
            <div className="row">
              <div className="col-5">
                <img src="https://res.cloudinary.com/dwhmsrfva/image/upload/v1696700327/room_m7ooqc.png" className="img-fluid rounded-start" alt="Evento"/>
              </div>
              <div className="col-7">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <p><strong>Dirección:</strong> {event.address}</p>
                  <p className="card-text"><strong>Fecha:</strong> {event.date} </p>
                  <p className="card-text"><strong>Hora:</strong> {event.time}</p>
                  <Link type="button" to={`/fotografos/eventos/${id}/images`} className="btn btn-primary">Cargar fotografias del evento</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}