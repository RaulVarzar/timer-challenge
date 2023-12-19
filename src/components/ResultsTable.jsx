export default function ResultsTable({results, highestScore, playerName, showAll}) {
    return(
    <>
        <table className="table w-10/12 mx-auto mt-2 md:w-1/2 font-extralight ">
                
                <thead >
                <tr>
                    <th>Name</th>
                    <th className="text-center">Score</th>
                    <th className="text-right">Difficulty</th>
                </tr>
                </thead>
                <tbody> 
                {showAll ? 
                    results.map( (result) => 
                            <tr className={(result.score === highestScore ? 'bg-base-100 text-accent ' : '') + "animate-duration-150 animate-fade-down animate-delay-150"} key={result.id}>    
                                <th className="font-bold">{result.player}</th>
                                <td className="text-center">{result.score}</td>
                                <td className="text-right">{result.difficulty}</td>
                            </tr>
                    )
                    : 
                    results.map( (result) => {
                        if (result.player === playerName)
                            return   (
                                <tr className={(result.score === highestScore ? 'bg-base-100 text-accent ' : '') + "animate-duration-150 animate-fade-down animate-delay-150"} key={result.id}>    
                                    <th className="font-bold">{result.player}</th>
                                    <td className="text-center">{result.score}</td>
                                    <td className="text-right">{result.difficulty}</td>
                                </tr>
                            ) 
                        })
                }
                </tbody>
            </table>
    </>
    )
}