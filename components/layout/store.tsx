import Navigation from "@components/navigation/navigation";

const Layout = ({ children }: any) => (
  <div className="bg-white">
    <Navigation />
    {children}
  </div>
);

export default Layout;
