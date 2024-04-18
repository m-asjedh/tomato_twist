import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";
import { Scores } from "../../class/Scores.js";
import MailPopUpMssg from "../../components/MailPopUpMssg.jsx";
import { motion } from "framer-motion";
import { HiSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import BgAudio from "../../components/BgAudio.jsx";
import { AuthContext } from "../../context/Auth.context.jsx";
import Particle from "../../components/Particle.jsx";

// Initialize score instance
const score = new Scores();

// Homepage component
const HomePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctNumber, setCorrectNumber] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [audioPlay, setAudioPlay] = useState(false);

  //function fetching the tomato API
  const fetchAPI = async () => {
    try {
      const url = "https://marcconrad.com/uob/tomato/api.php";
      const outParam = "json";
      const base64Param = "no";

      const response = await axios.get(url, {
        params: { out: outParam, base64Param: base64Param },
      });

      if (response.data && response.data.question) {
        setImageUrl(response.data.question);
        setCorrectNumber(response.data.solution);
        setSelectedNumber(null);
        console.log("Correct Answer:", response.data.solution);
        setShowCorrectMessage(false);
        setShowWrongMessage(false);
      } else {
        throw new Error("Image URL not found in API response");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  //fetch api and reset score on  component mount
  useEffect(() => {
    fetchAPI();
    score.resetScore();
  }, []);

  //updaitng the user score
  useEffect(() => {
    const updateScore = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:3001/update-score",
          { score: score.getScore() },
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating score:", error);
      }
    };

    updateScore();
  }, [score.getScore()]);

  //handle selection of the correct answer
  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    if (number === correctNumber) {
      score.increaseScore();
      setShowCorrectMessage(true);
    } else {
      setShowWrongMessage(true);
      loseHeart();
    }
    fetchAPI();
  };

  //handles loosing a heart
  const loseHeart = () => {
    setHearts(hearts - 1);
    if (hearts === 1) {
      setGameOver(true);
      setShowPopUp(true);
      setTimeLeft(0);
    } else {
      setTimeLeft(60);
      fetchAPI();
    }
  };

  //update timer duration based on score
  useEffect(() => {
    let timerDuration = 60;

    if (score.getScore() >= 5 && score.getScore() < 10) {
      timerDuration = 50;
    } else if (score.getScore() >= 10 && score.getScore() < 15) {
      timerDuration = 40;
    } else if (score.getScore() >= 15 && score.getScore() < 20) {
      timerDuration = 30;
    } else if (score.getScore() >= 20) {
      timerDuration = 20;
    }
    setTimeLeft(timerDuration);
  }, [score.getScore()]);

  //timer countdown
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !gameOver) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      loseHeart();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  //handle restart button click
  const handleRestart = () => {
    setImageUrl("");
    setTimeLeft(60);
    score.resetScore();
    setHearts(3);
    setGameOver(false);
    fetchAPI();
  };

  //Send score to email
  const { user } = useContext(AuthContext);
  const sendScoreByEmail = async () => {
    try {
      await axios.post("http://localhost:3001/send-email", {
        userEmail: user.email,
        score: score.getScore(),
      });
      console.log("Email sent to the user");
      setShowPopUp(false);
    } catch (error) {
      console.error("Error sendiing email: ", error);
    }
  };

  //cancel sending the core to the email
  const cancelSending = () => {
    setShowPopUp(false);
  };

  //Toggle audio on or off
  const toggleAudio = () => {
    setAudioPlay(!audioPlay);
  };

  return (
    <div>
      <Particle />
      <div>
        {audioPlay && <BgAudio />}
        <Navbar />
        <div className="flex flex-col items-center">
          <div className="w-3/4 p-5">
            <div className="flex justify-center items-center h-full">
              <img
                src={imageUrl}
                alt="Tomato"
                className="h-[250px] w-[450px] border-4 border-black rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-[340px] flex flex-col items-center ">
            <div className="text-center font-bold">Number Palette</div>
            <div className="flex flex-wrap justify-center">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index}
                  className={`mx-2 my-2 text-lg bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-800 hover:text-black`}
                  onClick={() => handleNumberClick(index)}
                  disabled={selectedNumber !== null || gameOver}
                >
                  {index}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center ">
            <div>
              Time:{" "}
              <span className="text-4xl font-bold text-red-600">
                {timeLeft}
              </span>{" "}
              secs left
            </div>
            <div>
              Tries:{" "}
              <span className="text-2xl text-red-600">
                {Array.from({ length: hearts }, (_, index) => (
                  <span key={index}>&#10084;</span>
                ))}
              </span>
            </div>
            <div>
              Score:{" "}
              <span className="text-lg font-bold">{score.getScore()}</span>
            </div>
            {showCorrectMessage && (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3 }}
                className="text-green-600 text-2xl font-bold"
              >
                Correct
              </motion.div>
            )}
            {showWrongMessage && (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3 }}
                className="text-red-600 text-2xl font-bold"
              >
                Wrong
              </motion.div>
            )}
            {gameOver && (
              <div>
                <h1 className="text-4xl text-red-700 font-bold">Game Over!</h1>
                <button
                  onClick={handleRestart}
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Restart
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="m-4">
          {audioPlay ? (
            <HiSpeakerWave
              size={30}
              onClick={toggleAudio}
              className="cursor-pointer"
            />
          ) : (
            <HiMiniSpeakerXMark
              size={30}
              onClick={toggleAudio}
              className="cursor-pointer"
            />
          )}
        </div>
        {showPopUp && (
          <MailPopUpMssg
            sendScoreByEmail={sendScoreByEmail}
            cancelSending={cancelSending}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
