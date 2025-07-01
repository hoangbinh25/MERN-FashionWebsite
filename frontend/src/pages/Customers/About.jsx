import { OurMission, OurStory } from "~/components/Layouts/About";

import { Footer, Header } from "~/components/Layouts";
import { OurMission, OurStory } from "~/components/Layouts/About";

// Layout
import Banner from "~/components/Layouts/DefaultLayout/Customers/Banner";

export default function About() {
    return (
        <div>

            <OurStory />
            <OurMission />

            <Header />
            <Banner heightClass="h-[240px]" />
            <OurStory />
            <OurMission />
            <Footer />

        </div>
    );
}
