import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const ResultModal = forwardRef (function ResultModal({targetTime, timeRemaining, onReset, score}, ref){

    const dialog = useRef()

    const formattedRemainingTime = (timeRemaining / 1000).toFixed(2)

    const userLost = timeRemaining <= 0

    useImperativeHandle(ref, () => {
        return{
            open() {
                dialog.current.showModal()
            }
        }
    })

    return createPortal( 
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2 className="lost">You lost</h2> }
            {!userLost && <h2>Your score is: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            {!userLost && <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;