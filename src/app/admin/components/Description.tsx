interface Props {
  title: string;
  content: string | React.ReactNode;
}

const Description: React.FC<Props> = ({ content, title }) => {
  return (
    <div>
      <div className="font-[700] text-[#A2A0A0]">{title}</div>
      <div className="break-words mt-[4px]">{content}</div>
    </div>
  );
};
export default Description;
