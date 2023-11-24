import { useState } from 'react';

import Player from './components/Player.jsx';
import TimerChallenge from "./components/TimerChallenge";
import Results from "./components/Results.jsx"


function App() {
  const storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
  const storedName = JSON.parse(localStorage.getItem('storedName')) || '';

  const difficultyTable = {1:"BEGINNER", 3:"EASY", 5:"MEDIUM", 10:"HARD"}
  
  const [results, setResults] = useState(storedResults)

  const [playerName, setPlayerName] = useState(storedName)

  function handleNameChange(newName) {
    setPlayerName(newName.toUpperCase())
    localStorage.setItem(
      'storedName', 
      JSON.stringify(newName.toUpperCase()));
  }

  function submitResult(score, targetTime){
      const resultId = Math.random()
      const newResult = {
        id: resultId,
        player: playerName,
        score: score,
        difficulty: difficultyTable[targetTime]
      }
      const storedResults = JSON.parse(localStorage.getItem('storedResults')) || [];
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
    <> 
    <section className="content-center min-h-screen">
      <header className='p-8 mx-auto text-center animate-fade animate-duration-500 animate-delay-300'>
          <h1 className='text-2xl font-bold sm:text-4xl lg:text-6xl text-neutral-content'>THE FINAL COUNTDOWN</h1>
          <p className='font-light lg:text-xl text-stone-400 opacity-70'>Stop the timer once you estimate that time is (almost) up</p>
      </header>

      <Player playerName={playerName} handleNameChange={handleNameChange}/>

        <div className="grid items-center justify-around gap-6 mt-0 md:pt-8 md:mx-10 lg:mx-24 md:gap-4 lg:gap-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-4 md:p-4 xl:p-5">
          <TimerChallenge targetTime={1} title={"beginner"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={3} title={"easy"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={5} title={"medium"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={10} title={"hard"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
        </div>
      
        <div className="flex mx-auto ">
        <div className="mx-auto mt-6 text-center w-96">
        {results.length > 0 ? <Results results={results} playerName={playerName} onClear={clearResults}/> :'' }
        </div>
        </div>
        
    </section>
    </>
  );
}

export default App;
