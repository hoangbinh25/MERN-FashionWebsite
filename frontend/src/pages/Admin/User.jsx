import { Fragment } from "react";
import Aside from "~/components/Layouts/DefaultLayout/admin/Aside";
import Nav from "~/components/Layouts/DefaultLayout/admin/Nav";
import User from "~/components/Layouts/admin/user/Index";

export default function Index() {
    return (
        <Fragment>
            <User />
        </Fragment>
    );
}