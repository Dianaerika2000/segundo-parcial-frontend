import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar';
import HomePage from './pages/HomePage';
import Events from './pages/events/Events';
import CreateEvent from './pages/events/CreateEvent';

function App() {
  // options
  let arNavBarOption = [
    { option: 'bi bi-question-circle', to: '/ayuda' },
    { option: 'bi bi-gear', to: '/configuracion' },
  ];
  return (
    <div>
      <BrowserRouter>
        <NavBar opciones={arNavBarOption}/>
          <div className='d-flex'>
            <div className="col-2">
              <SideBar/>
            </div>
            <Routes>
              <Route path='/' element={<HomePage/>} />


              <Route path='/eventos'>
                <Route index element={<Events/>} />
                <Route path='crear' element={<CreateEvent/>} />
              </Route>

            </Routes>
          </div>

      </BrowserRouter>
    </div>
  )
}

export default App
