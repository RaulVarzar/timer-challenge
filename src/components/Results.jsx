import { useState } from "react"

export default function Results ({results, onClear, playerName}) {

    const [showAll, setShowAll] = useState(true)

    function handleChange(){
        setShowAll(!showAll)
    }
    
    const highestScore = Math.max(...results.map(result => result.score))
    
    return(
        <>
        
            <div className='mb-10 animate-fade-up animate-duration-300 animate-delay-[400ms]'>
                
            <div className="flex content-center justify-between">
                <h2 className="text-4xl font-bold text-neutral-content">RESULTS</h2>
                
                <div className="mt-1">
                    <p className="inline text-xs align-middle">ALL</p>
                    <label className="relative inline-flex items-center mx-2 align-middle cursor-pointer">
                        <input id="switch" type="checkbox" className="sr-only peer" onChange={handleChange}/>
                        <div className="peer h-6 w-11 rounded-full border bg-base-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border  after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                    </label>
                    <p className="inline text-xs align-middle">YOU</p>
                </div>
            </div>

            <table className="table font-extralight">
                
                <thead className="text-center">
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody className="text-center"> 
                
                {showAll ? 
                    results.map( (result) => 
                            <tr className={(result.score === highestScore ? 'bg-base-100 text-accent ' : '') + "animate-duration-150 animate-fade-down animate-delay-150"} key={result.id}>    
                                <th className="font-bold">{result.player}</th>
                                <td>{result.score}</td>
                                <td>{result.difficulty}</td>
                            </tr>
                    )
                    : 
                    results.map( (result) => {
                        if (result.player === playerName)
                            return   (
                                <tr className={(result.score === highestScore ? 'bg-base-100 text-accent ' : '') + "animate-duration-150 animate-fade-down animate-delay-150"} key={result.id}>    
                                    <th className="font-bold">{result.player}</th>
                                    <td>{result.score}</td>
                                    <td>{result.difficulty}</td>
                                </tr>
                            ) 
                        })
                }
                
                </tbody>
            </table>
            {showAll ? <button className="mt-4 btn btn-block hover:btn-error elevation-2 hover:elevation-0" onClick={onClear}>CLEAR</button> : ''}
            </div>
        </>
    )
}