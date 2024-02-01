import profile from '../assets/profile.png';

import { Link } from 'react-router-dom';
export default function NavBar({ opciones }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand text-light" to="">
          {/* <img src="https://res.cloudinary.com/dwhmsrfva/image/upload/v1696700327/room_m7ooqc.png" alt="Logo" width="60" height="80" className="d-inline-block align-text-top"/> */}
          {/* <span className="material-symbols-outlined custom-icon">Snap</span> */}
        </Link>
        {/* Button collapse */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Nav content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {opciones.map((opcion, index) => {
              return (
                <li className="nav-item" key={index}>
                  <Link className="nav-link text-uppercase active" to={opcion.to}>
                    <i className={`${opcion.option} icono`}></i>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
