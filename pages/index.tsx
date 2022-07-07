import type { NextPage } from "next";
import { cx, css } from "@emotion/css";
import RichTextExample from "../components/Rte";

const Wrapper = ({ className, ...props }: { className: string }) => (
  <div {...props} className="max-w-2xl mx-auto p-5" />
);

const ExampleContent = (props: any) => (
  <Wrapper {...props} className="bg-white" />
);

const Home: NextPage = () => {
  return (
    <div className="bg-[#f3f3f3] min-h-screen py-28">
      <ExampleContent>
        <RichTextExample />
      </ExampleContent>
    </div>
  );
};

export default Home;
