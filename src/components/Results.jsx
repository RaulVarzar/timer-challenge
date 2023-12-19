import { motion } from "framer-motion"
import ResultsTable from "./ResultsTable";
import { useState, useRef } from "react"

export default function Results2({results, playerName, onClear}){
    const highestScore = Math.max(...results.map(result => result.score))
    const [showAll, setShowAll] = useState(true)
    
    const windowSize = useRef([window.innerHeight]);
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        open: {
          opacity: 1,
          visibility:"visible"
        },
        closed: {
          opacity: 0,
          visibility:"hidden"
        },
      }
      
    return(
        <>
        <motion.div 
            animate={isOpen ? 'open' : 'closed'}
            exit={{opacity:0}}
            variants={variants}
            transition={{duration:0.4}}
            onClick={() => setIsOpen(false)} 
            className={"absolute top-0 left-0  w-full h-full bg-black bg-opacity-20 cursor-pointer " }
        />
        
        <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          layout: {
            duration: 0.4,
            type: "spring",
          },
        }}
        className="absolute bottom-0 left-0 right-0 flex flex-col justify-center w-full max-w-2xl pb-4 m-auto mx-auto overflow-auto rounded-b-none max-h-[80vh] bg-base-100 rounded-xl"
      >
        {results.length > 0 && !isOpen &&
        <motion.button 
            className="w-full py-2 mx-auto font-bold text-center " 
            onClick={() => setIsOpen(!isOpen)}
        >
           <i className="fa-solid fa-chevron-up"></i>
        </motion.button>
        }
        <motion.h2 
          layout="position" 
          className={"relative top-0 w-full pb-4 text-3xl font-bold text-center bg-base-100 text-neutral-content " + (isOpen && " pt-4")}
        >
          RESULTS
        </motion.h2>
        {!isOpen && results.length>0 && windowSize.current[0]>900 && 
            <>
                <ResultsTable results={results.slice(0, 3)} playerName={playerName} highestScore={highestScore} showAll={true}/>
            </>
        }
        <div className="px-2 overflow-auto">
        {isOpen && results.length>0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="z-50 flex flex-col items-center content-center "
          >
            <div className="flex flex-row gap-4 overflow-auto md:gap-8 ">

                <div className="flex items-center mt-4 min-w-fit">
                    <p className="inline text-xs align-middle">ALL</p>
                    <label className="relative inline-flex items-center mx-2 align-middle cursor-pointer">
                        <input id="switch" type="checkbox" className="sr-only peer" onChange={() => setShowAll(!showAll)}/>
                        <div className="peer h-6 w-11 rounded-full border bg-base-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border  after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                    </label>
                    <p className="inline text-xs align-middle">CURRENT PLAYER</p>
                </div>

                <button className="mt-4 btn btn-md hover:btn-error elevation-2 hover:elevation-0" onClick={() => {onClear(); setIsOpen(false)}}>CLEAR</button> 
            </div>
            
           <ResultsTable results={results} playerName={playerName} highestScore={highestScore} showAll={showAll}/>
          </motion.div>
          
          </>
        )}
        </div>
      
        {!isOpen && results.length < 1 &&
        <p className="mx-auto italic opacity-40">There are no results yet</p>
        }

      </motion.div>
      </>
    )
}