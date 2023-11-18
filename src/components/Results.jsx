export default function Results ({results}) {
    
    const highestScore = Math.max(...results.map(o => o.score))

    return(
        <>
            <div className=''>
            <h2 className="text-4xl font-bold">RESULTS</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>
                {results.map((item) =>
                    <tr className={`${item.score === highestScore ? "bg-base-300" : ""}`} key={item.id}>
                        <th>{item.player}</th>
                        <td>{item.score}</td>
                        <td>{item.difficulty}</td>
                    </tr>
                )}
                
                </tbody>
            </table>
            </div>
        </>
    )
}