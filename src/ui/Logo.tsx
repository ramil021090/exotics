interface LogoProps {
  classname?: string;
}
const Logo = ({ classname }: LogoProps) => {
  return (
    <>
      <img
        className={`h-24 max-w-1.5xl mb-6 shrink ${classname}`}
        src="../images/rocketride.png"
        alt="rocketride"
      />
    </>
  );
};

export default Logo;
