import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import Category from "~/components/Layouts/admin/category";

export default function Index() {
    return (
        <Fragment>
            <Category />
        </Fragment>
    );
}