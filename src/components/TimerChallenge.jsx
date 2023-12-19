import { useState, useRef } from "react"
import ResultModal from './ResultModal.jsx';
import { motion } from "framer-motion";


export default function TimerChallenge({title, targetTime, submitResult, nameIsEmpty}){
    const timer = useRef()
    const dialog = useRef()

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000
   
    const score = Math.round((1- timeRemaining / (targetTime * 1000)) * 100)

    if(timeRemaining < 0) { // executes if time runs out, aka you lost
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleReset (score, targetTime) {
        setTimeRemaining(targetTime * 1000)
        if(timeRemaining>0){
            submitResult(score, title)
        }
    }

    function handleStart() {
        if (!nameIsEmpty) {
          timer.current = setInterval(() => { 
                setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
          }, 10);
        } 
    }

    function handleStop() { // executes if you stop the timer in time
        dialog.current.open()
        clearInterval(timer.current)
        
    }

    const inactive = 'w-fit sm:w-96 md:w-auto group pt-4 md:pt-8 pb-2 px-4 text-center overflow-hidden  rounded-lg cursor-pointer group elevation-7 hover:elevation-0 bg-primary bg-opacity-80 hover:bg-opacity-100'
    const active = 'content-center w-fit sm:w-96 md:w-auto bg-accent group pt-4 md:pt-8 pb-2 px-4 text-center overflow-hidden rounded-lg cursor-pointer group elevation-7 '

    return (
        <>
            <ResultModal 
                ref={dialog} 
                targetTime={targetTime} 
                timeRemaining={timeRemaining} 
                onReset = {() => handleReset(score, targetTime)}
                score = {score}
            />
           
            <motion.div
                layout
                initial={{opacity:0}}
                animatee={{ opacity: 1 }}
                whileHover={{scale:1.02}}
                onClick={timerActive ? () => handleStop() : handleStart} 
                className={timerActive ? active : inactive}
            >
                <h1 className="text-2xl font-bold leading-none text-white uppercase md:text-4xl">{!timerActive ? title : 'RUNNING...' }</h1> 
                <p className={"mb-2 text-lg text-info-content transition duration-300 md:mb-6 group-hover:text-white " + (timerActive? " opacity-0" :'')}>
                    {targetTime} second{targetTime > 1? 's': ''}
                </p> 
                <div className="p-0 m-0 md:divider"></div>
                {!nameIsEmpty ? 
                <h2 className="transition duration-200 text-stone-400 group-hover:text-white">Click to {timerActive ? 'stop' : 'start'} timer</h2> 
                    : 
                <h2 className="transition duration-200 opacity-25 group-hover:opacity-80 text-accent-content">You need to set your name first</h2>
                }
            </motion.div>

            

        </>
    )
}