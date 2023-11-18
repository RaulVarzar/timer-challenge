import { useState } from "react";

export default function Player({playerName, handleNameChange}) {

  const [showInputField, setshowInputField] = useState(false)
  const onShowInput = () => setshowInputField(true)

  const [inputData, setInputData] = useState('')

  function handleInputChange(value){
    setInputData(value)
  }

  function handleNewName(inputData){
    handleNameChange(inputData)
    setshowInputField(false)
  }

  return (
    <>
      <section className="h-24 mx-auto text-center">
        {playerName && !showInputField ?
          <div className="animate-fade-up animate-duration-100">
            <h2 className="inline mx-4 text-xl text-gray-600">Good luck, {playerName}!</h2>
            <button className="inline text-stone-500 btn btn-xs hover:text-stone-700" onClick={onShowInput}>change name</button>
            </div> 
          : ' '
        }
        
        { showInputField || !playerName ? 
            <div className="join animate-fade-down animate-duration-100">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full max-w-xs input input-bordered join-item" 
                  onChange={(event) => handleInputChange(event.target.value)}
                />
                <button 
                  className="btn btn-secondary join-item" 
                  onClick={() => handleNewName(inputData)}>
                    Set Name
                </button>
            </div> : null }

          
        
      </section>
    </>
  );
}
