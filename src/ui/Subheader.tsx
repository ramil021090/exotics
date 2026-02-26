interface SubheaderProps {
  title: string;
}
const Subheader = ({ title }: SubheaderProps) => {
  return <div className="text-3xl p-3  font-medium ">{title}</div>;
};

export default Subheader;
