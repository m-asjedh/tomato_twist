import { Link } from "react-router-dom";
import Particle from "../../components/Particle.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context.jsx";

// logout component
const Logout = () => {
  const { setUser } = useContext(AuthContext);

  // handle logout
  /*remove the toekn  from local 
  storage weh user log outs*/
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <div>
        <Particle />
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <p className="text-lg mb-4">Do you want to exit the game?</p>
          <div className="flex justify-between">
            <Link
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              onClick={handleLogout}
              to="/"
            >
              Yes
            </Link>
            <Link
              to="/home"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              No
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
