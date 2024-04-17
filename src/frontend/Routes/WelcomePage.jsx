import { Link } from "react-router-dom";
import Particle from "../../components/Particle.jsx";

//game instruction page
const WelcomePage = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <div className="p-8 bg-gray-50 bg-opacity-75 rounded-lg shadow-md w-[800px]  space-y-6 backdrop-filter backdrop-blur-md z-10">
        <h2 className="text-4xl font-bold text-center text-black mb-4">
          Welcome to Tomato Twist 🍅
        </h2>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-center">How to Play</h3>
          <p className="text-lg text-gray-800">
            🕒 You will be given a mathematical equation with tomatoes as
            blanks. <br />
            🍅 Find the suitable numbers that fit the tomato blank. <br />
            ⏱️ At start, you have 60 seconds to find the answer. <br />
            ❌ If the chosen answer is wrong, you will lose a heart. <br />
            ⏱️ When score increases also the the time left decreases <br />
            💔 After losing all three hearts, the game is over. <br />
            🏆 You can view your highest score in the profile. <br />
            ✉️ You can email your score to an email address. <br />
            📊 You can check whether you are in the leader board.
          </p>
        </div>

        <div className="flex justify-center">
          <Link to="/home">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Lets Start
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <Particle />
      </div>
    </div>
  );
};

export default WelcomePage;
