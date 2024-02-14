import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import cls from './App.module.scss';
import { Header } from './components/Header/Header';
import { Loader } from './components/Loader/Loader';
import { useEventNotification } from './lib/hooks/useEventNotification';
import LoginPage from './pages/LoginPage/LoginPage';
import MessagePageLazy from './pages/MessagesPage/MessagesPageLazy';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import SignupPage from './pages/SignupPage/SignupPage';
import UsersPageLazy from './pages/UsersPage/UsersPageLazy';
import authStore from './store/authStore';

const App = observer(() => {

  useEffect(() => {
    authStore.initAuthData();
  }, []);

  useEventNotification();

  return (
    <div className={cls.App}>
      <Header />
      <div className={cls.container}>
        {authStore.isAuthorizedChecked ? (
          <div className={cls.content}>
            <Suspense fallback="">
              <Routes>
                <Route path={'/'} element={<Navigate to='/profile' />} />
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/signup'} element={<SignupPage />} />
                <Route path={'/profile/:userId?'} element={<ProfilePage />} />
                <Route path={'/users'} element={<UsersPageLazy />} />
                <Route path={'/messages'} element={<MessagePageLazy />} />
              </Routes>
            </Suspense>
          </div>
        ) : <Loader />}

      </div>
    </div>
  )
});

export default App;
