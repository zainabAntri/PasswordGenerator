import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "#$%^&*!?-+{}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div
      className="w-full max-w-xl max-auto shadow-md 
        rounded-lg px-6 my-10 text-orange-500 bg-gray-700"
    >
      <h2 className="text-4xl text-center text-bold my-3">
        Password Generator
      </h2>
      <div>
        <div className="flex  shadow  rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            readOnly
            value={password}
            ref={passwordRef}
          ></input>
          <button
            className="outline-none
           bg-blue-700 px-3 py-0.5 shrink-0 text-white"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                id="length"
                min={8}
                max={100}
                className="cursor-pointer"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              ></input>
            </div>
            <label htmlFor="length"> Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            ></input>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="charactersInput"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            ></input>
            <label htmlFor="charactersInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
