type LayoutProp = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return <div className="flex flex-col items-center mt-20">{children}</div>;
};

export { Layout };
