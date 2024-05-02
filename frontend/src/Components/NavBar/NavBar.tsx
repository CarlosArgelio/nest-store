import { NavItem } from './../NavItem';
import { ShoppingCartContext } from './../../Context';
import { useContext } from 'react';

export const NavBar = () => {
  const context = useContext(ShoppingCartContext);

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-slate-100">
      <ul className="flex items-center gap-3">
        {NavItems[0].map((item) => (
          <li key={item.id} className={item.styleLi ? item.styleLi : ''}>
            <NavItem to={item.to} style={item.styleItem} children={item.text} />
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">carlosargelio0104@gmail.com</li>
        {NavItems[1].map((item) => (
          <li key={item.id} className={item.styleLi ? item.styleLi : ''}>
            <NavItem to={item.to} style={item.styleItem} children={item.text} />
          </li>
        ))}
        <li>🛒 {context.count}</li>
      </ul>
    </nav>
  );
};

const NavItems = [
  [
    {
      id: 1,
      styleLi: 'font-semibold text-lg',
      to: '/shopi',
      styleItem: 'underline underline-offset-4',
      text: 'Ecommerce',
    },
    {
      id: 2,
      styleLi: '',
      to: '/',
      styleItem: 'underline underline-offset-4',
      text: 'All',
    },
    {
      id: 3,
      styleLi: '',
      to: '/clothes',
      styleItem: 'underline underline-offset-4',
      text: 'Clothes',
    },
    {
      id: 4,
      styleLi: '',
      to: '/electronics',
      styleItem: 'underline underline-offset-4',
      text: 'Electronics',
    },
    {
      id: 5,
      styleLi: '',
      to: '/furnitures',
      styleItem: 'underline underline-offset-4',
      text: 'Furnitures',
    },
    {
      id: 6,
      styleLi: '',
      to: '/toys',
      styleItem: 'underline underline-offset-4',
      text: 'Toys',
    },
    {
      id: 7,
      styleLi: '',
      to: '/others',
      styleItem: 'underline underline-offset-4',
      text: 'Others',
    },
  ],
  [
    {
      id: 8,
      styleLi: '',
      to: '/my-orders',
      styleItem: 'underline underline-offset-4',
      text: 'My Orders',
    },
    {
      id: 9,
      styleLi: '',
      to: '/my-account',
      styleItem: 'underline underline-offset-4',
      text: 'My Account',
    },
    {
      id: 10,
      styleLi: '',
      to: '/sign-in',
      styleItem: 'underline underline-offset-4',
      text: 'Sign In',
    },
  ],
];
