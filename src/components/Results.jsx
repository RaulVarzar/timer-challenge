export default function Results ({results}) {
    
    const highestScore = Math.max(...results.map(result => result.score))

    return(
        <>
            <div className='mb-10'>
            <h2 className="text-4xl font-bold md:my-2 text-stone-500">RESULTS</h2>
            <table className="table font-extralight">
                <thead >
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>
                {results.map((item) =>
                    <tr className={`${item.score === highestScore ? "bg-base-200 text-teal-500" : ""}`} key={item.id}>
                        <th className="font-bold">{item.player}</th>
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