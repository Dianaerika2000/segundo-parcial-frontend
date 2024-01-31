import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import api from "../../api/gatewayApi";
import { useEffect, useState } from "react";
export default function RegisterPage() {
  //navigate
  const navigate = useNavigate();

  // states
  const [roles, setRoles] = useState([]);

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api
      .get("/rol")
      .then((res) => {
        console.log(res.data);
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handlers
  const handleProviderSubmit = (data) => {
    console.log('id', data.rolId)
    if (data.rolId == "2") {
      // registrar organizador
      api
        .post("/auth/organizer/signup", {...data, rolId: +data.rolId})
        .then((res) => {
          localStorage.setItem("idOganizer", res.data.id);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }else{
      // registrar fotografo
      api.post("/auth/photographer/signup", {
        ...data, 
        rolId: +data.rolId, 
        photographicSpecialties: 'Por definir'
      })
      .then((res) => {
        localStorage.setItem("idPhotographer", res.data.id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center text-center">
        <img
          className="img-fluid col-2"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="row justify-content-center text-start">
        <div className="col-9">
          <form
            className="row g-3"
            onSubmit={handleSubmit(handleProviderSubmit)}>
            <div className="col-12">
              <label className="form-label">Tipo de usuario:</label>
              <select className="form-select" aria-label="Default select example"
                {...register("rolId")}>
                <option>Seleccionar</option>
                {roles.map((rol) => {
                  return (
                    <option key={rol.id} value={rol.id}>{rol.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="form-control" id="name" />
              {errors?.name?.type === "required" && <p className="text-danger">El campo username es obligatorio*</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Correo Electronico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="form-control"
                id="email" />
              {errors?.email?.type === "required" && <p className="text-danger">El campo correo electronico es obligatorio*</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Celular</label>
              <input
                type="number"
                {...register("cellphone", { required: true })}
                className="form-control"
                id="cellphone" />
              {errors?.cellphone?.type === "required" && <p className="text-danger">El campo celular es obligatorio*</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                {...register("address", { required: true })}
                className="form-control"
                id="address" />
              {errors?.address?.type === "required" && <p className="text-danger">El campo dirección es obligatorio*</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Compañia</label>
              <input
                type="text"
                {...register("company", { required: true })}
                className="form-control"
                id="company" />
              {errors?.company?.type === "required" && <p className="text-danger">El campo compañia es obligatorio*</p>}
            </div>
            <div className="col-6">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control"
                id="password" />
              {errors?.password?.type === "required" && <p className="text-danger">El campo contraseña es obligatorio*</p>}
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Registrarse
              </button>
              <Link
                to="/"
                className="btn link-primary"
              >
                Iniciar Sesion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}