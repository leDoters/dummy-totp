import React, { useState } from "react";
import "./styles.css";
import { totp } from "otplib";

export default function App() {
  const [token, setToken] = useState(null);
  const [createdToken, setCreatedToken] = useState(null);
  const [secret, setSecret] = useState("");
  const [step, setStep] = useState(30);

  

  const getToken = () => {
    if((!createdToken || !token) && secret !== "" && ( step !== 0 && step !== "" && step !== null && step !== undefined
    && step > 0)){ 
      totp.options = { digits: 6, step: step, algorithm: 'sha256'  };
        const newToken = totp.generate(secret);
        setToken(newToken);
        setCreatedToken(true);
        setTimeout(() => {
          setCreatedToken(false);
          setToken(null);
        }, step * 1000);
    };
  }

  return (
    <div className="App">
      <div>
        <h2>Ingresa el tiempo que quieres que dure el OTP</h2>
        <input
          type="number"
          placeholder="Enter step"
          onChange={(e) => setStep(+e.target.value)}
        />
      </div>
      <div>
        <h2>Ingresa la clave secreta utlizada para generara tu OTP</h2>
        <input
          type="text"
          placeholder="Enter secret"
          onChange={(e) => setSecret(e.target.value)}
        />
        <h2>Clave secreta: {secret ?? ""}</h2>
      </div>
      <h2>Generar OTP</h2>
      <button type="button" onClick={getToken}>
        Generate
      </button>
      {
        token && (
          <div>
            <h2>OTP: {token}</h2>
            <h3>Puedes crear un token despues de {step ?? 0} segundos "Cuando se cumpla el tiempo el token y el mensaje desapareceran"</h3>
          </div>
        )
      }
    </div>
  );

}
