import Navigation from "@components/navigation/nav";
import Footer from "@components/footer/foot";

const Layout = ({ children }: any) => (
  <div className="bg-white">
    <Navigation />
    {children}
    <Footer />
  </div>
);

export default Layout;
