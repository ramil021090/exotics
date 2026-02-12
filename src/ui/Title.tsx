interface TitleProps {
  text: string;
}
const Title = ({ text }: TitleProps) => {
  return <div className="font-semibold ">{text}</div>;
};

export default Title;
