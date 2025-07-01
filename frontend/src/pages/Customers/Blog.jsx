
import Section from "~/components/Layouts/Blog/Section";

import { Footer, Header } from "~/components/Layouts";
import Section from "~/components/Layouts/Blog/Section";
import Banner from "~/components/Layouts/DefaultLayout/Customers/Banner";


export default function Blog() {
    return (
        <div>
            <Section />

            <Header />
            <Banner heightClass="h-[240px]" />
            <Section />
            <Footer />

        </div>
    );
}
