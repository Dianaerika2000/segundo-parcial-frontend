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

function App() {
  // options
  let arNavBarOption = [
    { option: 'bi bi-question-circle', to: '/ayuda' },
    { option: 'bi bi-gear', to: '/configuracion' },
  ];
  return (
    <div>
      <BrowserRouter>
        <NavBar opciones={arNavBarOption} />

        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />}/>
          {/* <Route path='/' element={<LoginPage/>} /> */}

          <Route path='/eventos' element={
            <div className='d-flex'>
              <div className="col-2">
                <SideBar />
              </div>
              <Outlet />
            </div>
          }>
            <Route index element={<Events />} />
            <Route path='crear' element={<CreateEvent />} />
            <Route path=':id' element={<ReadEventPage />} />
          </Route>

          <Route path='/fotografos' element={
            <div className='d-flex'>
              <div className="col-2">
                <SideBar/>
              </div>
              <Outlet />
            </div>
          }>
            <Route index element={<PhotographsPage />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
