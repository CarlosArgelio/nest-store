import { NavItem } from './../NavItem';

export const NavBar = () => {
  const activeStyle = 'underline';

  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavItem to="/shopi" style={activeStyle} children="Ecommerce" />
        </li>
        <li>
          <NavItem to="/clothes" style={activeStyle} children="Clothes" />
        </li>
        <li>
          <NavItem
            to="/electronics"
            style={activeStyle}
            children="Electronics"
          />
        </li>
        <li>
          <NavItem to="/furnitures" style={activeStyle} children="Furnitures" />
        </li>
        <li>
          <NavItem to="/toys" style={activeStyle} children="Toys" />
        </li>
        <li>
          <NavItem to="/others" style={activeStyle} children="Others" />
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li>carlosargelio0104@gmail.com</li>
        <li>
          <NavItem to="/my-orders" style={activeStyle} children="My Orders" />
        </li>
        <li>
          <NavItem to="/my-account" style={activeStyle} children="My Account" />
        </li>
        <li>
          <NavItem to="/sign-in" style={activeStyle} children="Sign In" />
        </li>
        <li>🛒 0</li>
      </ul>
    </nav>
  );
};
