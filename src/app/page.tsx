import connectMongoDB from "../../config/mongodb";

export default function Home() {
  connectMongoDB();
  return (
    <div> Hello
    </div>
  );
}
