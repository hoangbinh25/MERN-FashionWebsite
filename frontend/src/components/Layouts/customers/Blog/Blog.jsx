
import BlogDetail from "./BlogDetail";
import BlogListPage from "./BlogListPage";
import Sidebar from "./Sidebar";

export default function Blog() {
    return (
        <div className="flex flex-col md:flex-row mt-8 max-w-screen-2xl mx-auto">
            <main className="w-full md:w-2/3">
                <BlogListPage />
            </main>
            <Sidebar />
        </div>
    )
}