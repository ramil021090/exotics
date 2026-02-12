interface LabelProps {
  title: string;
}
const Label = ({ title }: LabelProps) => {
  return (
    <>
      <h2 className="">{title}</h2>
    </>
  );
};

export default Label;
