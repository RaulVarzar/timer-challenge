import { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup } from "framer-motion";

import Player from './components/Player.jsx';
import TimerChallenge from "./components/TimerChallenge";
import Results from "./components/Results.jsx"
import Results2 from './components/Results.jsx';
import Header from './components/Header.jsx';


function App() {
  const storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
  const storedName = JSON.parse(localStorage.getItem('storedName')) || '';

  const difficultyTable = {
    "beginner": 1, 
    "easy": 3, 
    "medium": 5, 
    "hard": 10
}

  const [results, setResults] = useState(storedResults)

  const [playerName, setPlayerName] = useState(storedName)

  function handleNameChange(newName) {
    setPlayerName(newName.toUpperCase())
    localStorage.setItem(
      'storedName', 
      JSON.stringify(newName.toUpperCase()));
  }

  function submitResult(score, title){
      const resultId = Math.random()
      const newResult = {
        id: resultId,
        player: playerName,
        score: score,
        difficulty: title
      }
      localStorage.setItem(
        'storedResults', 
        JSON.stringify([newResult, ...storedResults]));
      setResults([newResult, ...results]);
  }

  function nameIsEmpty (playerName) {
    return !playerName.length > 0
  }

  function clearResults () {
      localStorage.removeItem(
        'storedResults');
      setResults([]);
  }

  return (
    <main className="flex flex-col min-h-screen pb-16 overflow-auto bg-base-300"> 
          <Header />
          <Player playerName={playerName} handleNameChange={handleNameChange}/> 
          
      <div className="flex flex-col items-start justify-center grow-0 py-[10vh]">

      {!playerName && 
        <motion.h3 
          className='px-6 py-4 mx-auto mb-4 font-bold lg:text-2xl rounded-2xl text-primary bg-base-100'
          initial={{y:"-100%", opacity:0}}
          animate={{y:0, opacity:1}}
          transition={{ delay:0.5, duration:0.3}}
        >
            ENTER YOUR NAME TO START PLAYING
        </motion.h3>
      }

        <div className={"grid items-center content-center grid-cols-2 gap-2 px-2 mt-0 max-w-7xl md:pt-8 md:mx-10 lg:mx-24 xl:mx-auto md:gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-4 md:p-4 xl:p-5 " + (!playerName && " opacity-30")}>
          <TimerChallenge targetTime={difficultyTable.beginner} title={"beginner"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.easy} title={"easy"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.medium} title={"medium"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.hard} title={"hard"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
        </div>
      </div>
      
      {playerName &&
        <Results2 results={results} playerName={playerName} onClear={clearResults}/>
      }
      
    </main>
  );
}

export default App;
