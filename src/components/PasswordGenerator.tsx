import React, { useState, useEffect } from "react";
import "../assets/styles/byPages/PasswordGenerator.css";
import CrackTime from "../utils/CrackTime";

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(8);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<string>("");
  const [crackTime, setCrackTime] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    let characterPool = "";
    if (includeUpper) characterPool += upperCase;
    if (includeLower) characterPool += lowerCase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (characterPool.length === 0) {
      setPassword("");
      setStrength("Invalid");
      setCrackTime("N/A");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);

    const passwordDisplay = document.querySelector(".password-display");
    if (passwordDisplay) {
      passwordDisplay.classList.add("change");

      setTimeout(() => {
        passwordDisplay.classList.remove("change");
      }, 500);
    }
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;
    
    if (pwd.length < 8) {
      setStrength('Weak');
      setCrackTime(CrackTime(pwd));
      return;
    }

    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    
    if (score <= 2) {
      setStrength('Weak');
      setCrackTime('Seconds');
    } else if (score === 3) {
      setStrength('Good');
      setCrackTime('Minutes');
    } else {
      setStrength('Strong');
      setCrackTime('Hours');
    }

    setCrackTime(CrackTime(pwd));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="PasswordGenerator">
      <div>
        <label>
          Length: <span>{length}</span>
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="0"
            max="100"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          Include Uppercase Letters [A-Z]
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          Include Lowercase Letters [a-z]
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers [0-9]
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols {"[!@#$%^&*()_+~`|}{[]:;?><,./-=]"}
        </label>
      </div>
      <div>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      {password && (
        <>
          <div className="password-display">
            <span id="pass">{password}</span>
          </div>
          <div className="password-actions">
            <button
              onClick={copyToClipboard}
              className={copied ? "copied" : ""}
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
          <div className="strength">
            <strong>Strength: </strong>
            <span>{strength}</span>
          </div>
          <div className="strength">
            <strong>Estimated Time to Crack: </strong>
            <span>{crackTime}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordGenerator;
