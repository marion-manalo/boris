import Searchbar from "@/components/Searchbar";

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Stock Dashboard</h1>
            <Searchbar />
        </div>
        </main>
    );
}