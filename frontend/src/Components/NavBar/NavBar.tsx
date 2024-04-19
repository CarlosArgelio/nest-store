import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={'/shopi'}>Ecommerce</NavLink>
        </li>
        <li>
          <NavLink to={'/clothes'}>Clothes</NavLink>
        </li>
        <li>
          <NavLink to={'/electronics'}>Electronics</NavLink>
        </li>
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
      <ul className="flex items-center gap-3">
        <li>carlosargelio0104@gmail.com</li>
        <li>
          <NavLink to={'/my-orders'}>My Orders</NavLink>
        </li>
        <li>
          <NavLink to={'/my-account'}>My Account</NavLink>
        </li>
        <li>
          <NavLink to={'/sign-in'}>Sign In</NavLink>
        </li>
        <li>🛒 0</li>
      </ul>
    </nav>
  );
};
