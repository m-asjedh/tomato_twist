import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../../assets/landing.jpg";

//landingpage when the user first start to play
const LandingPage = () => {
  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bg}), radial-gradient(circle at 30% 30%, #f38181, #e06868, #c84b4b, #b73131, #a71818)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 4, ease: "easeInOut" }}
    >
      <h1 className="mt-48 text-6xl font-bold text-center text-black mb-8 font-signature">
        Tomato Twist
      </h1>
      <div className="flex gap-4">
        <Link to="/signup">
          <motion.button
            whileHover={{
              scale: 1.2,
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md focus:outline-none"
          >
            Sign Up
          </motion.button>
        </Link>
        <Link to="/login">
          <motion.button
            whileHover={{
              scale: 1.2,
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className="py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md focus:outline-none"
          >
            Login
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LandingPage;
