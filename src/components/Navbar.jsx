import { Link } from "react-router-dom";

//navbar component
const Navbar = () => {
  return (
    <nav className="bg-red-400 py-4 px-6 flex justify-between items-center z-20">
      <div>
        <span className="text-black text-3xl font-semibold">Tomato Twist</span>
      </div>
      <div className="flex items-center space-x-4 text-xl">
        <Link to="/home" className="text-black hover:underline">
          Home
        </Link>
        <Link to="/profile" className="text-black hover:underline">
          Profile
        </Link>
        <Link to="/leaderboard" className="text-black hover:underline">
          Leaderboard
        </Link>
        <Link to="/logout" className="text-black hover:underline">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
