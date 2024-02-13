import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import cls from './App.module.scss';
import { Header } from './components/Header/Header';
import { Loader } from './components/Loader/Loader';
import { Navbar } from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import UsersPage from './pages/UsersPage/UsersPage';
import authStore from './store/authStore';

const App = observer(() => {

  useEffect(() => {
    authStore.initAuthData()
  }, []);

  return (
    <div className={cls.App}>
      <Header />
      <div className={cls.container}>
        {/* <div className={cls.sidebar}>
          <Navbar />
        </div> */}
        {authStore.isAuthorizedChecked ? (
          <div className={cls.content}>
            <Suspense fallback="">
              <Routes>
                <Route path={'/'} element={<Navigate to='/profile' />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/signup'} element={<SignupPage />} />
                <Route path={'/profile/:userId?'} element={<ProfilePage />} />
                <Route path={'/users'} element={<UsersPage />} />
              </Routes>
            </Suspense>
          </div>
        ) : <Loader />}

      </div>
    </div>
  )
});

export default App;
