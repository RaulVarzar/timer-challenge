import { useState } from "react";
import {motion} from "framer-motion"

export default function Player({playerName, handleNameChange}) {

  const [showInputField, setshowInputField] = useState(false)
  const onShowInput = () => setshowInputField(true)
  const onHideInput = () => setshowInputField(false)

  const [inputData, setInputData] = useState(playerName)

  function handleInputChange(value){
    if (value.length <= 10)
    setInputData(value)
  }

  function handleOnEnter (e){
    if (inputData && e.key === 'Enter'){
    handleNameChange(inputData)
    setshowInputField(false)}
  }

  function handleNewName (){
    if (inputData)  {
      handleNameChange(inputData.toUpperCase())
      setshowInputField(false)
    }
  }

  return (
    <>
      <motion.section
        initial={{y:"-100%", opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{ delay:0.4, duration:0.3}} 
        className="h-12 mx-auto mt-2 text-center md:h-16"
      >
        {playerName && !showInputField ?
          <div className="cursor-pointer animate-fade-down animate-duration-150 animate-delay-500 " onClick={onShowInput}>
            <h2 className="inline mx-4 text-gray-400 align-middle md:text-xl text-md">Good luck, <span className="text-info">{playerName}</span>!</h2>
            
            <button className="inline text-stone-500 btn btn-xs hover:text-stone-700">change name</button>
          </div> 
          : ' '
        }
        
        { showInputField || !playerName ? 
            <div className="join animate-fade-down animate-duration-100">
                <input 
                  value={inputData}
                  autoFocus
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full h-8 max-w-xs text-center md:h-12 input join-item bg-base-200" 
                  onChange={(event) => handleInputChange(event.target.value)}
                  onKeyDown={handleOnEnter}
                />
                <button 
                  className={inputData ? "btn-primary btn join-item btn-sm md:btn-md " : " btn join-item btn-sm md:btn-md btn-disaled btn-error"}
                  onClick={inputData ? () => handleNewName(inputData) : onHideInput}>
                    {inputData 
                      ? <i className="px-2 fa-solid fa-check fa-lg text-stone-500"></i>
                      : <i className="px-2 text-info-content fa-solid fa-xmark fa-lg"></i>
                    }
                </button>
            </div> : null }

          
        
      </motion.section>
    </>
  );
}
