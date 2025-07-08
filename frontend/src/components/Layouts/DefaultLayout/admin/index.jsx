import { Fragment } from "react";
import { useState } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";

export default function Index({children}) {
    const [showAside, setShowAside] = useState(false);

    return (
        <div className="flex">
            <Aside show={showAside} onClose={() => setShowAside(false)} />
            <div className="flex-1 flex flex-col">
                <Nav onMenuClick={() => setShowAside(true)} />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}