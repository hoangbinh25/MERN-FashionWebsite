import { Footer, Header } from "~/components/Layouts";
import Content from "~/components/Layouts/Content/Content";

const HomePage = () => {
  return (
    <div className="sm:col-span-1">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default HomePage;
