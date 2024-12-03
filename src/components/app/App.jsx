import React from 'react';


import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from '../../pages/main-page/MainPage'
import ServicePage from '../../pages/service-page/ServicePage'
import ServiceDetailPage from '../../pages/service-detail-page/ServiceDetailPage'
import Mainlayout from '../../pages/layout/Mainlayout'
// import NotFoundPage from '../../pages/not-found-page/NotFoundPage'
import LoginPage from '../../pages/login/login';
import ProfilePage from '../../pages/profile/ProfilePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <Mainlayout/> } >
          <Route index element = { <MainPage/> } />
          <Route path='/services' element = { <ServicePage/> } />
          <Route path='/services/:id' element = { <ServiceDetailPage/> } />
          {/* <Route path='*' element={ <NotFoundPage/> } /> */}
          <Route path='/login' element={ <LoginPage/> } />
          <Route path='/profile' element={ <ProfilePage/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
