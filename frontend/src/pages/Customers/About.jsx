import { Footer, Header } from "~/components/Layouts";
import { OurMission, OurStory } from "~/components/Layouts/About";

// Layout
import Banner from "~/components/Layouts/DefaultLayout/Customers/Banner";

export default function About() {
    return (
        <div>
            <Header />
            <Banner heightClass="h-[240px]" />
            <OurStory />
            <OurMission />
            <Footer />
        </div>
    );
}
