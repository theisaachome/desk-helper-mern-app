import React from 'react';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTicket from './pages/NewTicket';
import Register from './pages/Register';
import Ticket from './pages/Ticket';
import Tickets from './pages/Tickets';
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path='/'  element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* must be private routes */}
            <Route path='/new-ticket' element={<NewTicket/>}/>
            <Route  path='tickets' element={<Tickets/>}/>
            <Route path='/ticket/:ticketId' element={<Ticket/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
