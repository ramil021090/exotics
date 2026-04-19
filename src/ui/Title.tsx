interface TitleProps {
  text: string;
}
const Title = ({ text }: TitleProps) => {
  return <h1 className=" text-slate-500  ">{text}</h1>;
};

export default Title;
