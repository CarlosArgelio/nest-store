import { NavItem } from './../NavItem';

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        {NavItems[0].map((item) => (
          <li className={item.styleLi ? item.styleLi : ''}>
            <NavItem to={item.to} style={item.styleItem} children={item.text} />
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">carlosargelio0104@gmail.com</li>
        {NavItems[1].map((item) => (
          <li className={item.styleLi ? item.styleLi : ''}>
            <NavItem to={item.to} style={item.styleItem} children={item.text} />
          </li>
        ))}
        <li>🛒 0</li>
      </ul>
    </nav>
  );
};

const NavItems = [
  [
    {
      styleLi: 'font-semibold text-lg',
      to: '/shopi',
      styleItem: 'underline underline-offset-4',
      text: 'Ecommerce',
    },
    {
      styleLi: '',
      to: '/',
      styleItem: 'underline underline-offset-4',
      text: 'All',
    },
    {
      styleLi: '',
      to: '/clothes',
      styleItem: 'underline underline-offset-4',
      text: 'Clothes',
    },
    {
      styleLi: '',
      to: '/electronics',
      styleItem: 'underline underline-offset-4',
      text: 'Electronics',
    },
    {
      styleLi: '',
      to: '/furnitures',
      styleItem: 'underline underline-offset-4',
      text: 'Furnitures',
    },
    {
      styleLi: '',
      to: '/toys',
      styleItem: 'underline underline-offset-4',
      text: 'Toys',
    },
    {
      styleLi: '',
      to: '/others',
      styleItem: 'underline underline-offset-4',
      text: 'Others',
    },
  ],
  [
    {
      styleLi: '',
      to: '/my-orders',
      styleItem: 'underline underline-offset-4',
      text: 'My Orders',
    },
    {
      styleLi: '',
      to: '/my-account',
      styleItem: 'underline underline-offset-4',
      text: 'My Account',
    },
    {
      styleLi: '',
      to: '/sign-in',
      styleItem: 'underline underline-offset-4',
      text: 'Sign In',
    },
  ],
];
