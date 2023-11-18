import { useState } from 'react';

import Player from './components/Player.jsx';
import TimerChallenge from "./components/TimerChallenge";
import Results from "./components/Results.jsx"

function App() {
  const difficultyTable = {1:"BEGINNER", 3:"EASY", 5:"MEDIUM", 10:"HARD"}
  const [results, setResults] = useState([])

  const [playerName, setPlayerName] = useState('')

  function handleNameChange(newName) {
    setPlayerName(newName.toUpperCase())
  }

  function submitResult(score, targetTime){
      const resultId = Math.random()
      const newResult = {
        player: playerName,
        score: score,
        id: resultId,
        difficulty: difficultyTable[targetTime]
      }
      setResults([newResult, ...results]);
  }

  function nameIsEmpty (playerName) {
    console.log(!playerName.length > 0)
    return !playerName.length > 0
  }

  return (
    <> 
    <section className="content-center h-screen max-h-screen">
      <header className='p-8 mx-auto text-center'>
          <h1 className='text-2xl font-bold sm:text-4xl lg:text-6xl text-accent'>THE FINAL COUNTDOWN</h1>
          <p className='text-xl font-light text-accent-content opacity-40'>Stop the timer once you estimate that time is (almost) up</p>
      </header>

      <Player playerName={playerName} handleNameChange={handleNameChange}/>

        <div className="grid items-center justify-around gap-6 mx4 md:pt-8 md:mx-10 lg:mx-24 md:gap-4 lg:gap-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-4 md:p-4 xl:p-5">
          <TimerChallenge targetTime={1} title={"beginner"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={3} title={"easy"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={5} title={"medium"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
          <TimerChallenge targetTime={10} title={"hard"} submitResult={submitResult} nameIsEmpty={nameIsEmpty(playerName)}/>
        </div>
      
        <div className="flex mx-auto ">
        <div class="mt-6 w-96  mx-auto text-center">
        {results.length > 0 ? <Results results={results}/> :'' }
        </div>
        </div>
        
    </section>
    </>
  );
}

export default App;
