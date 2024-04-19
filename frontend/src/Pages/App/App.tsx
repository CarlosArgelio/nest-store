// React
import { useRoutes, BrowserRouter } from 'react-router-dom';

// Components
import { NavBar } from './../../Components/NavBar';

// Pages
import { Home } from './../Home';
import { MyAccount } from './../MyAccount';
import { MyOrder } from './../MyOrder';
import { MyOrders } from './../MyOrders';
import { NotFound } from './../NotFound';
import { SignIn } from './../SignIn';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-order', element: <MyOrders /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <NavBar />
    </BrowserRouter>
  );
};

export { App };
