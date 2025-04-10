import Welcome from "./Welcome";
import Searchbar from "./Searchbar";

const Splash = () => {
  return (
    <div className="flex flex-col items-start justify-center h-screen bg-gray-100">
      <Welcome />
      <Searchbar />
    </div>
  );
};

export default Splash;
