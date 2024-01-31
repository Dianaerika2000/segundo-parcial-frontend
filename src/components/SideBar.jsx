import { NavLink } from 'react-router-dom';

export default function SideBar() {
  return (
    <aside className="bg-white shadow-sm text-dark w-full">
      <div className="text-center border-bottom pb-3">
        <h2 className="text-2xl font-[Georgia] font-bold">YourEvents</h2>
      </div>
      <nav>
        <ul className='nav flex-column vh-100'>
          {/* p-3 flex items-center rounded-sm hover:bg-firstop bg-opacity-100 hover:text-primary */}
          <li className="my-1 mx-2">
            <NavLink to="/"
              className={({ isActive }) => (isActive ? "nav-link active bg-primary rounded text-light" : "nav-link")}
            >
              <i className="bi bi-grid-fill icono"></i>&nbsp;
              Inicio
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/eventos"
              className={({ isActive }) => (isActive ? "nav-link active bg-primary rounded text-light" : "nav-link")}
            >
              <i className="bi bi-calendar icono"></i>&nbsp;
              Gestionar Eventos
            </NavLink>
          </li>
          <li className="my-1 mx-2">
            <NavLink to="/fotografos"
              className={({ isActive }) => (isActive ? "nav-link active bg-primary rounded text-light" : "nav-link")}
            >
              <i className="bi bi-calendar icono"></i>&nbsp;
              Gestionar Fotografos
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
{/* <li className="my-1 mx-2">
    <NavLink to="/usuarios"
        className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary text-white bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary_light bg-opacity-100")}
    >
        <UserIcon className="h-5 w-5 mr-2" />
        Gestion de Usuarios
    </NavLink>
</li>
<li className="my-1 mx-2">
    <NavLink to="/eventos"
        className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary text-white bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary_light bg-opacity-100")}
    >
        <CalendarIcon className="h-5 w-5 mr-2" />
        Gestion de Eventos
    </NavLink>
</li>
<li className="my-1 mx-2">
    <NavLink to="/fotografias"
        className={({ isActive }) => (isActive ? "p-3 flex items-center rounded-md bg-primary text-white bg-opacity-100" : "p-3 flex items-center rounded-md hover:bg-primary_light bg-opacity-100")}
    >
        <CameraIcon className="h-5 w-5 mr-2" />
        Gestion de Fotografias
    </NavLink>
</li> */}