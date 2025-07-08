import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import Store from "~/components/Layouts/admin/store";

export default function Index() {
    return (
        <Fragment>
            <Store />
        </Fragment>
    );
}