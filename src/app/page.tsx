
import Splash from "../components/Splash";
import connectMongoDB from "../config/mongodb";


export default function Home() {
  connectMongoDB();
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Splash />
    </main>
  );
}
