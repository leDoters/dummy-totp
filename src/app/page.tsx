
'use client';
import { TOTP, Secret } from 'otpauth';
import { useState } from 'react';

export default function Home() {
  const [token, setToken] = useState("");
  const [createdToken, setCreatedToken] = useState(false);
  const [secret, setSecret] = useState("");

  const getToken = () => {
    if ((!createdToken || token == "") && secret !== "") {
      const totp = new TOTP({
        secret: Secret.fromUTF8(secret),
        algorithm: 'SHA256',
        digits: 6,
        period: 30
      });
      const newToken = totp.generate();
      setToken(`${newToken}`);
      setCreatedToken(true);
      setTimeout(() => {
        setCreatedToken(false);
        setToken(null);
      }, 30 * 1000);
    };
  }

  return (
    <div className="flex flex-col items-center  min-h-screen py-2 h-screen w-full">
      <h1 className="text-4xl font-bold my-6">Generador de OTP</h1>
      <div className="flex flex-col items-center">
        <h2 className="my-4 text-2xl font-bold" >Ingresa la clave secreta utlizada para generara tu OTP</h2>
        <input
          type="text"
          placeholder="Enter secret"
          onChange={(e) => setSecret(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <h2 className="my-4 text-2xl font-bold" >Clave secreta: {secret ?? ""}</h2>
      </div>
      <h2 className="my-4 text-2xl font-bold">Generar OTP</h2>
      <button
        className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-300"
        type="button" onClick={getToken}>
        Generate
      </button>
      {
        token && (
          <div className='flex flex-col items-center mt-4'>
            <h2 className='my-4 text-2xl font-bold'>OTP: {token}</h2>
            <h3 className='my-4 text-xl font-bold'>Puedes crear un token despues de 30 segundos Cuando se cumpla el tiempo el token y el mensaje desapareceran</h3>
          </div>
        )
      }
    </div>
  );
}
