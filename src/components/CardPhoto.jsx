import { Link } from "react-router-dom";

export default function CardPhoto({ id, icon, title, price}) {
  return (
    <div className="card shadow border-white">
      <img src="https://res.cloudinary.com/dwhmsrfva/image/upload/v1696700327/room_m7ooqc.png" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">{ price }</p>
        <div className="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
          <button className="btn btn-outline-primary">
          <i className="bi bi-pencil-square"></i> Editar
          </button>
          <Link className="btn btn-outline-primary" to="">
            <i className="bi bi-eye" /> Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}