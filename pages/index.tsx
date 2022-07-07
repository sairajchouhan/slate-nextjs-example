import type { NextPage } from "next";
import { cx, css } from "@emotion/css";
import RichTextExample from "../components/Rte";

const Wrapper = ({ className, ...props }: { className: string }) => (
  <div
    {...props}
    className={cx(
      className,
      css`
        max-width: 42em;
        margin: 0 auto;
        padding: 20px;
      `
    )}
  />
);

const ExampleContent = (props: any) => (
  <Wrapper
    {...props}
    className={css`
      background: white;
    `}
  />
);

const Home: NextPage = () => {
  return (
    <div
      className={css`
        background-color: #f3f3f3;
        min-height: 100vh;
        padding-top: 100px;
      `}
    >
      <ExampleContent>
        <RichTextExample />
      </ExampleContent>
    </div>
  );
};

export default Home;
