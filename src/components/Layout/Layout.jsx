import { Suspense, Outlet } from "react";
import Header from "../Header/Header";

export default function Layout() {
    return (
        <>
            <Header />
            <Suspense>
                <Outlet/>
            </Suspense>
        </>
    )
};