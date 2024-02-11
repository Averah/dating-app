import React, { Suspense, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import cls from './App.module.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Header } from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { observer } from 'mobx-react-lite';
import authStore from './store/authStore';
import { SplashPage } from './pages/SplashPage/SplashPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

const App = observer(() => {

  useEffect(() => {
    authStore.initAuthData()
  }, []);


  return (
    <div className={cls.App}>
      <Header />
      <div className={cls.content}>
        <Navbar />
        <Suspense fallback="">
          <Routes>
            <Route path={'/'} element={<Navigate to='/profile' />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/signup'} element={<SignupPage />} />
            <Route path={'/profile'} element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </div>

    </div>
  );
});

export default App;
