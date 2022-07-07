import RichTextEditor from "../components/Rte";
import PreviewRichText from "../components/PreviewRichText";
import { useEffect, useState } from "react";

const Wrapper = ({ className, ...props }) => (
  <div {...props} className="max-w-2xl mx-auto p-5" />
);

const ExampleContent = (props) => <Wrapper {...props} className="bg-white" />;

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const content = localStorage.getItem("content");
    setContent(JSON.parse(content));
  }, []);

  if (!content) return null;

  return (
    <div className="bg-[#f3f3f3] min-h-screen py-28">
      <ExampleContent>
        <RichTextEditor />
        <div className="mt-8">
          <PreviewRichText initialValue={content} />
        </div>
      </ExampleContent>
    </div>
  );
};

export default Home;
