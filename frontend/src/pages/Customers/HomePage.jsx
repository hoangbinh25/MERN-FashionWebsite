
import Content from "~/components/Layouts/HomePage/Content";

export default function HomePage() {
  return (
    <div className="sm:col-span-1">

      <Content />
    </div>
  );
};
import BtnGoToTop from "~/components/buttonGoToTop/btnGoToTop";
import { Footer, Header } from "~/components/Layouts";
import Content from "~/components/Layouts/HomePage/Content";

const HomePage = () => {
  return (
    <div className="sm:col-span-1">
      <Header />
      <Content />
      <BtnGoToTop />
      <Footer />
    </div>
  );
};

export default HomePage;
