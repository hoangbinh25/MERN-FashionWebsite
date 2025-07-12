import { Footer, Header } from "~/components/Layouts";
import Banner from "./Banner";
import BtnGoToTop from "~/components/Button/BtnGoToTop";
import ChatBotModal from "~/components/Bot/ChatBot";

export default function DefaultLayout({ children, bannerHeight, showBanner }) {
    return (<div>
        <Header />
        {showBanner && <Banner bannerHeight={bannerHeight} />}
        <div>
            {children}
        </div>
        <BtnGoToTop />
        <ChatBotModal />
        <Footer />
    </div>);
}
