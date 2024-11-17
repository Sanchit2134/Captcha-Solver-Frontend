import React, { useEffect, useState } from "react";
import Captcha from "./Capcha";
import CoinBalance from "./CoinBalance";
import axios from "axios";

const Home = () => {
  const [captchaId, setCaptchaId] = useState("");
  const [coins, setCoins] = useState(0);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(10); // Timer for CAPTCHA expiration
  



  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/captcha/verify", {
        userId: "test-user",
        captchaId,
        input,
      });
      setCoins(response.data.coins);
      setInput("");
      alert(response.data.message);
    } catch (error) {
      alert("Invalid CAPTCHA. Try again.");
    }
  };

   // Handle CAPTCHA "Skip"
   const handleSkip = () => {
    setInput("");
    setTimer(15); // Reset timer
    // Logic to fetch a new CAPTCHA
    setCaptchaId(""); // Reset CAPTCHA ID if needed
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
    {/* Coin Balance Display */}
    <CoinBalance coins={coins} />

    {/* Captcha Component */}
    <Captcha setCaptchaId={setCaptchaId} />

    {/* Timer Display */}
    <div className="text-sm text-red-600 font-semibold mt-2">{timer}s</div>

    {/* Input Field */}
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter CAPTCHA"
      className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Buttons */}
    <div className="flex space-x-4 mt-4">
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
      <button
        onClick={handleSkip}
        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
      >
        Skip
      </button>
    </div>

    {/* Refer & Earn Section */}
    <button className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
      Refer & Earn
    </button>

    {/* Score Indicators */}
    <div className="flex space-x-4 mt-6">
      <div className="flex items-center justify-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        16
      </div>
      <div className="flex items-center justify-center bg-red-100 text-red-600 px-3 py-1 rounded-full">
        17
      </div>
      <div className="flex items-center justify-center bg-green-100 text-green-600 px-3 py-1 rounded-full">
        {coins}
      </div>
    </div>

    {/* Rules Section */}
    <div className="mt-4 text-xs text-gray-600">
      <p>* All words are case sensitive.</p>
      <p>* Calculative CAPTCHAs must be solved.</p>
      <p>* Length of CAPTCHAs will be between 6 to 12 characters.</p>
      <p>* Results can also be negative numbers (e.g., 5 - 8 = -3).</p>
    </div>
  </div>
);
};


export default Home;


