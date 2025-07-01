
import BlogDetail from "./BlogDetail";
import Sidebar from "./Sidebar";

export default function Section() {
    return (
        <div className="flex flex-col md:flex-row mt-8 max-w-screen-2xl mx-auto">
            <main className="w-full md:w-2/3">
                <BlogDetail />
            </main>
            <Sidebar />
        </div>
    )
}