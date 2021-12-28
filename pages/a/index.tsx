import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <button
      type="button"
      onClick={() => {
        throw new Error("Sentry Frontend Error");
      }}
    >
      Throw error
    </button>
  );
};

export default Home;
