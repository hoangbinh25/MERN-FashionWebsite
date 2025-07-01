import { Footer, Header } from "~/components/Layouts";
import Section from "~/components/Layouts/Contact/Section";
import Banner from "~/components/Layouts/DefaultLayout/Customers/Banner";

export default function Contact() {
    return (
        <div>
            <Header />
            <Banner heightClass="h-[240px]" />
            <Section />
            <Footer />
        </div>
    );
}
