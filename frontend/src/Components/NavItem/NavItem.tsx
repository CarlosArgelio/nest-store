import { NavLink } from 'react-router-dom';

export type NavItemProps = {
  to: string;
  style: string;
  children: string;
};

const NavItem = ({ to, style, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? style : undefined)}
    >
      {children}
    </NavLink>
  );
};

export { NavItem };
