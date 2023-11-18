import { useState, useRef } from "react"
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({title, targetTime, submitResult, nameIsEmpty}){
    const timer = useRef()
    const dialog = useRef()
    const [errorMessage, setErrorMessage] = useState(true)


    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    const score = Math.round((1- timeRemaining / (targetTime * 1000)) * 100)

    if(timeRemaining <= 0) { // executes if time runs out, aka you lost
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleReset () {
        setTimeRemaining(targetTime * 1000)
    }

    function handleStart() {
        if (!nameIsEmpty) {
          timer.current = setInterval(() => { 
                setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
          }, 10);
        } setErrorMessage(true)
    }

    function handleStop(score, targetTime) { // executes if you stop the timer in time
        dialog.current.open()
        clearInterval(timer.current)
        submitResult(score, targetTime)
    }

    const inactive = 'w-96 md:w-auto group pt-8 pb-2 px-4 text-center overflow-hidden transition duration-200 ease-in-out rounded-lg cursor-pointer group elevation-6 hover:elevation-2 bg-accent hover:bg-[#e99258] animate-fade-up animate-duration-300'
    const active = 'w-96 md:w-auto group pt-8 pb-2 px-4 text-center overflow-hidden transition duration-200 ease-in-out rounded-lg cursor-pointer group elevation-6 hover:elevation-2 bg-secondary animate-fade-up animate-duration-300'

    return (
        <>
            <ResultModal 
                ref={dialog} 
                targetTime={targetTime} 
                timeRemaining={timeRemaining} 
                onReset = {handleReset}
                score = {score}
            />
           
            <div 
                onClick={timerActive ? () => handleStop(score, targetTime) : handleStart} 
                className={timerActive ? active : inactive}
                >
            
                <h1 className="text-4xl font-bold leading-none text-white uppercase">{!timerActive ? title : 'RUNNING...' }</h1> 

                <p className="mb-2 text-lg md:mb-10 text-neutral-content">
                    {targetTime} second{targetTime > 1? 's': ''}
                </p> 

                {!nameIsEmpty ? 
                <h2 className="transition duration-200 text-base-100">Click to {timerActive ? 'stop' : 'start'} timer</h2> 
                    : 
                <h2 className="transition duration-200 opacity-25 group-hover:opacity-80 text-accent-content">You need to set your name first</h2>
                }
            </div>

            

        </>
    )
}