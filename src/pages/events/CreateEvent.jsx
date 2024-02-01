import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/gatewayApi";

export default function CreateEvent() {
  // navigate
  const navigate = useNavigate();

  const [guests, setGuests] = useState([]);
  const [email, setEmail] = useState("");
  const [cant, setCant] = useState(0);
  const [photographer, setPhotographer] = useState("");
  const [photographers, setPhotographers] = useState([]); 

  const organizerId = +localStorage.getItem("idOganizer");

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handlers
  const handleCreateEvent = (data) => {
    const eventData = { ...data, people: guests, organizerId: organizerId, photographerEmail: photographer};
    console.log('eventData', eventData);
    //crear
    api
      .post("/event", eventData)
      .then((res) => {
        navigate("/organizadores/eventos");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClicAddPerson = () => {
    setGuests([...guests, { email: email, cant: cant }]);
    console.log(guests);
  }

  const handleDeleteGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);

    setGuests(updatedGuests);
  };
  
  // initial values
  useEffect(() => {
    api
      .get("/photographer")
      .then((res) => {
        console.log(res.data);
        setPhotographers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container m-5">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit(handleCreateEvent)} className="row">
        <div className="col-4">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="form-control" id="name" />
          {errors?.name?.type === "required" && <p className="text-danger">El campo nombre es obligatorio*</p>}
        </div>
        <div className="col-4">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="form-control" id="date"
          />
          {errors?.date?.type === "required" && <p className="text-danger">El campo fecha es obligatorio*</p>}
        </div>
        <div className="col-4">
          <label className="form-label">Hora De Inicio:</label>
          <input
            type="time"
            {...register("time", { required: true })}
            className="form-control" id="time"
          />
          {errors?.time?.type === "required" && <p className="text-danger">El campo hora es obligatorio*</p>}
        </div>
        <div className="col-6">
          <label className="form-label">Descripcion:</label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="form-control" id="description"
          />
          {errors?.description?.type === "required" && <p className="text-danger">El campo descripcion es obligatorio*</p>}
        </div>
        <div className="col-6">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            {...register("address", { required: true })}
            className="form-control" id="address"
          />
          {errors?.address?.type === "required" && <p className="text-danger">El campo dirección es obligatorio*</p>}
        </div>

        <h4 className="m-5 text-center">Invita a un fotografo a cubrir el evento</h4>
        <div className="row d-flex align-items-end">
          <select className="form-select" 
            aria-label="Default select example"
            value={photographer}
            onChange={(e) => setPhotographer(e.target.value)}
          >
            <option selected>Seleccionar un fotografo</option>
            {photographers.map((photographer) => {
              return (
                <option key={photographer.id} value={photographer.email}>{photographer.name}</option>
              );
            })}
          </select>
        </div>



        <h4 className="m-3 text-center">Ingresa los datos de los invitados</h4>

        <div className="row d-flex align-items-end">
          <div className="col-5">
            <label className="form-label">Correo Electronico del Invitado:</label>
            <input
              type="email"
              className="form-control" id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email?.type === "required" && <p className="text-danger">El campo correo electronico es obligatorio*</p>}
          </div>
          <div className="col-5">
            <label className="form-label">Cantidad de acompañantes permitidos:</label>
            <input
              type="number"
              className="form-control" id="cantPeople"
              onChange={(e) => setCant(+e.target.value)}
            />
            {errors?.cantPeople?.type === "required" && <p className="text-danger">El campo cantidad es obligatorio*</p>}
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={handleClicAddPerson}>
              Agregar
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table text-center my-5">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Correo Electronico</th>
                  <th scope="col">Cantidad de Personas</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, index) => {
                  return (
                    <tr key={index}>
                      <td>{guest.email}</td>
                      <td>{guest.cant}</td>
                      <td>
                        <button className="btn btn-danger"
                          onClick={() => handleDeleteGuest(index)}>
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12 text-end mt-3">
          <Link className="btn btn-secondary me-2" to={'/organizadores/eventos'}>
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary">
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
}