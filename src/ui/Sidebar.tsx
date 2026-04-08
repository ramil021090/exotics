import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <aside
      className="   
    sticky 
    top-0 
    left-0 
    self-start 
    h-screen 
    z-50 
    shrink-0 
    // overflow-y-auto 
    py-5 
    px-10 
    hidden 
    md:flex
    md:flex-col
    lg:w-64
    xl:w-80 
    2xl:w-120
    "
    >
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
