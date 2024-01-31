import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import api from "../../api/gatewayApi";
import { useEffect, useState } from "react";

export default function LoginPage() {
  // navigate
  const navigate = useNavigate();

  // states
  const [roles, setRoles] = useState([]);
  const [rol, setRole] = useState("");

  //form
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

  // ESTA FUNCION ES PARA MANEJAR LA NAVEGACION DEL USUARIO DESPUES DE LOGUEARSE

  // const handleUser = () => {
  //     const fetchUser = async () => {
  //     try {
  //         const token = localStorage.getItem("token");
  //         const response = await api.get('/usuario/token', {
  //             headers: {
  //                 "x-token": token
  //             }
  //         })
  //         .then((response)=>{
  //           usuario = response.data.usuario;

  //           switch (usuario.rol.name) {
  //             case 'Organizador':
  //                 return navigate('/organizadores')
  //             case 'Fotografo':
  //                 return navigate('/fotografos')
  //             default:
  //                 return navigate('/')
  //           }
  //         });
  //     } catch (error) {
  //         console.error(error);
  //     }
  //     };
  //     fetchUser();
  // };

  const handleProviderSubmit = (data) => {
    if (rol === "Organizador") {
      // Iniciar sesion como organizador
      api
        .post("/auth/organizer/signin", data)
        .then((res) => {
          localStorage.setItem("idOganizer", res.data.id);
          navigate("/organizadores/eventos");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      // iniciar sesion como fotografo
      api
        .post("/auth/photographer/signin", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("idPhotographer", res.data.id);
          navigate('/fotografos');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center text-center">
          <img
            className="img-fluid col-3" 
            src={logo} 
            alt="logo"
          />
      </div>
      <div className="row justify-content-center text-start">
        <div className="col-6">
          <form
            className="row g-3"
            onSubmit={handleSubmit(handleProviderSubmit)}
          >
            <div className="col-12">
              <label className="form-label">Tipo de usuario:</label>
              <select 
                className="form-select" 
                aria-label="Default select example"
                value={rol}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Seleccionar</option>
                {roles.map((rol) => {
                  return (
                    <option key={rol.id} value={rol.name}>{rol.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Correo Electronico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="form-control" id="email" />
              {errors?.email?.type === "required" && <p className="text-red-600">El campo correo electronico es obligatorio*</p>}
            </div>
            <div className="col-12">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="form-control" id="password"
              />
              {errors?.password?.type === "required" && <p className="text-red-600">El campo contraseña es obligatorio*</p>}
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesion
              </button>
              <Link
                to="/registro"
                className="btn link-primary"
              >
                Aun no tienes una cuenta?, registrate
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
