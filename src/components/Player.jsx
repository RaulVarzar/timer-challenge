import { useState } from "react";

export default function Player({playerName, handleNameChange}) {

  const [showInputField, setshowInputField] = useState(false)
  const onShowInput = () => setshowInputField(true)

  const [inputData, setInputData] = useState('')

  function handleInputChange(value){
    setInputData(value)
  }

  function handleOnEnter (e){
    if (inputData && e.key === 'Enter'){
    handleNameChange(inputData)
    setshowInputField(false)}
  }

  function handleNewName (){
    if (inputData)  {
      handleNameChange(inputData)
      setshowInputField(false)
    }
  }

  return (
    <>
      <section className="h-16 mx-auto text-center">
        {playerName && !showInputField ?
          <div className="cursor-pointer animate-fade-up animate-duration-100 " onClick={onShowInput}>
            <h2 className="inline mx-4 text-xl text-gray-500">Good luck, <span className="text-teal-400">{playerName}</span>!</h2>
            
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
                  className="w-full max-w-xs input join-item bg-base-200" 
                  onChange={(event) => handleInputChange(event.target.value)}
                  onKeyDown={handleOnEnter}
                />
                <button 
                  className="bg-teal-400 btn join-item" 
                  onClick={() => handleNewName(inputData)}>
                    {inputData 
                      ? <i className="px-2 fa-solid fa-check fa-lg"></i>
                      : <i className="px-2 fa-solid fa-xmark fa-lg"></i>
                    }
                </button>
            </div> : null }

          
        
      </section>
    </>
  );
}
