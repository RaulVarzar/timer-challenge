import { useState, useEffect, useRef } from 'react';
import { motion, LayoutGroup } from "framer-motion";

import Player from './components/Player.jsx';
import TimerChallenge from "./components/TimerChallenge";
import Results from "./components/Results.jsx"
import Results2 from './components/Results.jsx';


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
    
      <div className=' grow-0'>
        <header className='p-3 mx-auto text-center md:p-8 animate-fade h-fit animate-duration-500 animate-delay-300'>
          <h1 className='text-2xl font-bold sm:text-4xl lg:text-6xl text-neutral-content'>THE FINAL COUNTDOWN</h1>
          <p className='text-sm font-light tracking-tighter lg:text-xl text-stone-400 opacity-70'>Stop the timer once you estimate that time is (almost) up</p>
        </header>
          <Player playerName={playerName} handleNameChange={handleNameChange}/> 
      </div>

      <div className="flex items-start pt-[10vh] grow">
        <div className="grid items-center justify-around grid-cols-2 gap-2 px-2 mt-0 max-w-7xl md:pt-8 md:mx-10 lg:mx-24 xl:mx-auto md:gap-4 lg:gap-8 xl:grid-cols-4 md:p-4 xl:p-5">
          <TimerChallenge targetTime={difficultyTable.beginner} title={"beginner"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.easy} title={"easy"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.medium} title={"medium"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={difficultyTable.hard} title={"hard"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
        </div>
      </div>
        
        <Results2 results={results} playerName={playerName} onClear={clearResults}/>
    </main>
  );
}

export default App;
