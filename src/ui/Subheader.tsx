interface SubheaderProps {
  title: string;
}
const Subheader = ({ title }: SubheaderProps) => {
  return <div className="text-3xl m-3 font-medium ">{title.toUpperCase()}</div>;
};

export default Subheader;
