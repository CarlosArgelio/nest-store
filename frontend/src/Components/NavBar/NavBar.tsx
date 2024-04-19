import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav>
      <ul>
        carlosargelio0104@gmail.com
        <li>
          <NavLink to={'/my-orders'}>My Orders</NavLink>
        </li>
        <li>
          <NavLink to={'/my-account'}>My Account</NavLink>
        </li>
        <li>
          <NavLink to={'/sign-in'}>Sign In</NavLink>
        </li>
        <li>CARRITO 0</li>
        <li>
          <NavLink to={'/furnitures'}>Furnitures</NavLink>
        </li>
        <li>
          <NavLink to={'/toys'}>Toys</NavLink>
        </li>
        <li>
          <NavLink to={'/others'}>Others</NavLink>
        </li>
      </ul>
    </nav>
  );
};
