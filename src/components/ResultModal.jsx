import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const ResultModal = forwardRef (function ResultModal({timeRemaining, onReset, score}, ref){

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
        <dialog ref={dialog} className="modal" >
            <div className="px-0 pb-0 text-center modal-box hover:scale-101">
                <div className="pt-4">
                {userLost 
                    ? <><h2 className="text-4xl text-error">You lost</h2> 
                        <p className='pt-4 text-stone-400'>Click the button below to continue</p></>
                    : <>
                        <h2 className='text-3xl'>SCORE</h2>
                        <p className='mb-4 text-teal-400 text-7xl'>{score}</p>
                        <h2 className='text-stone-400'>You stopped the timer with <span className='text-teal-600'>{formattedRemainingTime}</span> seconds left</h2>
                      </>
                }
                </div>
                <div className="w-full modal-action">
                    <form className='w-full' method="dialog" onSubmit={onReset}>
                        <button className='rounded-t-none btn btn-block'>close</button>
                    </form>
                </div>
            </div>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;