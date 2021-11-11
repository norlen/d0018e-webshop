import Navigation from "@components/navigation/nav";
import Footer from "@components/footer/foot";

const Layout = ({ children }: any) => (
  <div className="bg-white flex flex-col">
    <Navigation />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

export default Layout;
