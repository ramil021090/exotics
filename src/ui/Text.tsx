interface TextProps {
  text: string;
}
const Text = ({ text }: TextProps) => {
  return <p className=" text-center text-4xl mt-4">{text}</p>;
};

export default Text;
