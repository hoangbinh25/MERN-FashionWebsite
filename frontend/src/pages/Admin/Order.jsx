import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import Orders from "~/components/Layouts/admin/order";

export default function Index() {
    return (
        <Fragment>
            <Orders />
        </Fragment>
    );
}