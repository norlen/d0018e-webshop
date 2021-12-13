import Navigation from "@components/navigation/nav";
import Footer from "@components/footer/foot";

const Layout = ({ children }: any) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

export default Layout;
