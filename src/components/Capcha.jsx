import React, { useState, useEffect } from "react";
import axios from "axios";

const Captcha = ({ setCaptchaId }) => {
  const [captcha, setCaptcha] = useState(null);

  const loadCaptcha = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/captcha");
      setCaptcha(response.data);
      setCaptchaId(response.data.id);
    } catch (error) {
      console.error("Error fetching CAPTCHA:", error);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  return (
    <div>
      {captcha && <div dangerouslySetInnerHTML={{ __html: captcha.svg }} />}
      <button className="bg-black text-white px-8 py-3 rounded-lg mt-3" onClick={loadCaptcha}>Reload CAPTCHA</button>
    </div>
  );
};

export default Captcha;