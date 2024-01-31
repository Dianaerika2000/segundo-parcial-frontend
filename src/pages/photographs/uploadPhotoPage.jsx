import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/gatewayApi";
import CardPhoto from "../../components/CardPhoto";

export default function UploadPhotoPage() {
  const { id } = useParams();
  const photographerId = +localStorage.getItem("idPhotographer");

  // states
  const [Photographs, setPhotographs] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [price, setPrice] = useState([]);

  // Handlers
  const handleChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("price", price);
    formData.append("photographerId", photographerId);
    formData.append("eventId", id);

    // Imprimir el contenido de formData en la consola
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // api
    //   .post(`/event/${id}/photographers/${photographerId}/images`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data", // Importante especificar el tipo de contenido como 'multipart/form-data'
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // obtener las fotografias
  //   useEffect(() => {
  //     api
  //       .get(`/event/${id}`)
  //       .then((res) => {
  //         setEvent(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     api
  //       .get("/photographer")
  //       .then((res) => {
  //         setPhotographers(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  return (
    <div className="container m-5">
      <div className="row d-flex justify-content-center">
        <div className="col-12">
          <h5>Cargar Fotografias:</h5>
          <form className="row d-flex justify-content-center align-items-center my-3 g-3" onSubmit={handleUploadPhoto}>
            <div className="col-6">
              <label className="form-label">Subir fotografia</label>
              <input type="file"
                className="form-control"
                id="photo"
                onChange={handleChangePhoto}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Precio</label>
              <input
                type="text"
                className="form-control" id="name"
                onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="col-12 text-end">
              <button type="submit" className="btn btn-primary">Subir Fotografía</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row d-flex">
        <div className="col-3">
          <CardPhoto title={`titulo de prueba`} price={`20 Bs.`}/>
        </div>
        <div className="col-3">
          <CardPhoto title={`titulo de prueba`} price={`20 Bs.`}/>
        </div>
        <div className="col-3">
          <CardPhoto title={`titulo de prueba`} price={`20 Bs.`}/>
        </div>
        <div className="col-3">
          <CardPhoto title={`titulo de prueba`} price={`20 Bs.`}/>
        </div>
      </div>
    </div>
  );
}