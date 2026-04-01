interface LogoProps {
  classname?: string;
}
const Logo = ({ classname }: LogoProps) => {
  return (
    <>
      <img
        className={`h-24 w-20  mb-6 shrink ${classname}`}
        src="../images/rocketride.png"
        alt="rocketride"
      />
    </>
  );
};

export default Logo;
