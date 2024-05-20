// React
import { useRoutes, HashRouter } from 'react-router-dom';

// Context
import { ShoppingCartProvider } from './../../Context';

// Components
import { NavBar, CheckoutSideMenu } from './../../Components';

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
    { path: '/:category', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <HashRouter>
        <AppRoutes />
        <NavBar />
        <CheckoutSideMenu />
      </HashRouter>
    </ShoppingCartProvider>
  );
};

export { App };
