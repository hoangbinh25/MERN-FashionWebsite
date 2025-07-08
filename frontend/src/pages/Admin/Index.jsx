import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import Dashboard from "~/components/Layouts/admin/dashboad/Index";

export default function Index() {
    return (
        <Fragment>
            <Dashboard />
        </Fragment>
    );
}