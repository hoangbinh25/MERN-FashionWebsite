import { Footer, Header } from "~/components/Layouts";
import Banner from "./Banner";

export default function DefaultLayout() {
    return (<div>
        <Header />
        <Banner />
        <Footer />
    </div>);
}
