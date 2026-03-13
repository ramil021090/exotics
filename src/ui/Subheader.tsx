interface SubheaderProps {
  title: string;
  classname?: string;
}
const Subheader = ({ title, classname }: SubheaderProps) => {
  return (
    <div className={`text-3xl p-3  font-medium ${classname} `}>{title}</div>
  );
};

export default Subheader;
