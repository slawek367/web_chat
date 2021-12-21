import { Routes as RoutesDOM, Route, Link } from 'react-router-dom';

import { MainPage } from 'modules/MainPage';
import { LoginPage } from 'modules/LoginPage';

export const Routes = () => {
  return (
    <RoutesDOM>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </RoutesDOM>
  );
};
