import React from "react";
import tomato from "../assets/mail_mssg.png";

//handle the mail pop up message
const MailPopUpMssg = ({ sendScoreByEmail, cancelSending }) => {
  
   // handle for sending score to the email 
  const handleSendScore = () => {
    sendScoreByEmail();
  };

   // handle for canceling sending score to the email
  const handleCancelSendScore = () => {
    cancelSending();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg bg-opacity-80">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 relative">
        <h2 className="text-2xl font-bold mb-4">
          Send your score to your email?
        </h2>
        <img src={tomato} alt="Tomato" className="mx-auto mb-4 w-20 h-20" />
        <div className="flex justify-between">
          <button
            onClick={handleSendScore}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            Yes
          </button>
          <button
            onClick={handleCancelSendScore}
            className="bg-red-500 hover:bg-red-700 text-gray-800 font-bold py-2 px-4 rounded-full "
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailPopUpMssg;
