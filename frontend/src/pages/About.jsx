import { Footer, Header } from "~/components/Layouts";
import Banner from "~/components/Layouts/DefaultLayout/customers/Banner";

export default function About() {
    return (
        <div>
            <Header />
            <Banner heightClass="h-[240px]" />
            <Footer />
        </div>
    );
}
