import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <aside
      className="    sticky 
    top-0 
    left-0 
    self-start 
    h-screen 
    z-50 
    w-64 
    shrink-0 
    // overflow-y-auto 
    py-5 
    px-10 
    hidden 
    md:flex
    md:flex-col"
    >
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
