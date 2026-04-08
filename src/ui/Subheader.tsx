interface SubheaderProps {
  title: string;
  classname?: string;
}
const Subheader = ({ title, classname }: SubheaderProps) => {
  return (
    <div className={` flex   text-center font-bold mb-2 ${classname} `}>
      {title}
    </div>
  );
};

export default Subheader;
