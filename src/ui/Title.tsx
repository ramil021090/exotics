interface TitleProps {
  text: string;
}
const Title = ({ text }: TitleProps) => {
  return <div className="font-semibold py-4 ">{text}</div>;
};

export default Title;
