import { Footer, Header } from "~/components/Layouts";
import Banner from "./Banner";
import BtnGoToTop from "~/components/Button/BtnGoToTop";

export default function DefaultLayout({ children, bannerHeight, showBanner }) {
    return (<div>
        <Header />
        {showBanner && <Banner bannerHeight={bannerHeight} />}
        <div>
            {children}
        </div>
        <BtnGoToTop />
        <Footer />
    </div>);
}
