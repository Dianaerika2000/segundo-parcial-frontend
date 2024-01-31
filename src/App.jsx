import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';
import HomePage from './pages/HomePage';
import Events from './pages/events/Events';
import CreateEvent from './pages/events/CreateEvent';
import PhotographsPage from './pages/photographs/PhotographsPage';
import ReadEventPage from './pages/events/ReadEventPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import EventDetailPage from './pages/photographs/EventDetailPage';
import UploadPhotoPage from './pages/photographs/uploadPhotoPage';

function App() {
  // options
  let arNavBarOption = [
    { option: 'bi bi-question-circle', to: '/ayuda' },
    { option: 'bi bi-gear', to: '/configuracion' },
  ];

  const menuItemsFotografo = [
    { icon: 'bi-grid-fill', name: 'Inicio', route: '/fotografos' },
    { icon: 'bi-calendar', name: 'Mis Eventos', route: '/fotografos/eventos' },
    // { icon: 'bi-camera', name: 'Gestionar Fotografos', route: '/fotografos/fotografos' },
  ];
  const menuItemsOrganizador = [
    { icon: 'bi-grid-fill', name: 'Inicio', route: '/organizadores' },
    { icon: 'bi-grid-fill', name: 'Gestionar Eventos', route: '/organizadores/eventos' },
    { icon: 'bi-calendar', name: 'Gestionar Invitados', route: '/organizadores/fotografos' },
    // { icon: 'bi-camera', name: 'Gestionar Fotografos', route: '/fotografos' },
  ];
  return (
    <div>
      <BrowserRouter>
        <NavBar opciones={arNavBarOption} />

        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />}/>
          {/* <Route path='/' element={<LoginPage/>} /> */}

          <Route path='/organizadores' element={
            <div className='d-flex'>
              <div className="col-2">
                <SideBar menuItems={menuItemsOrganizador}/>
              </div>
              <Outlet />
            </div>
          }>
            <Route index element={<PhotographsPage />} />                    {/* Aqui debe ir la vista con el listado de fotografias como home */}
            <Route path='eventos' element={<Events />} />
            <Route path='eventos/crear' element={<CreateEvent />} />
            <Route path='fotografos' element={<CreateEvent />} />
            <Route path=':id' element={<ReadEventPage />} />
          </Route>

          <Route path='/fotografos' element={
            <div className='d-flex'>
              <div className="col-2">
                <SideBar menuItems={menuItemsFotografo}/>
              </div>
              <Outlet />
            </div>
          }>
            <Route index element={<PhotographsPage />} />
            <Route path='eventos' element={<PhotographsPage />} />
            <Route path='eventos/:id' element={<EventDetailPage />} />
            <Route path='eventos/:id/images' element={<UploadPhotoPage />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
