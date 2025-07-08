import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import Products from "~/components/Layouts/admin/product";

export default function Index() {
    return (
        <Fragment>
            <Products />
        </Fragment>
    );
}