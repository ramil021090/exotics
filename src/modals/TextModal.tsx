interface TextModalProps {
  text: string;
}
const TextModal = ({ text }: TextModalProps) => {
  return <p className=" p-4 bg-amber-50 font-bold text-3xl">{text} </p>;
};

export default TextModal;
