import { useState } from 'react'

export default function CounterCard({ id, onDelete, handleIncrement, handleDecrement, name, incrementAmount }) {
    const [cardCount, setCardCount] = useState(0)

    function cardIncrement() {
        setCardCount(prev => prev + 1)
    }
    function cardDecrement() {
        if (cardCount > 0){
            setCardCount(prev => prev - 1)
        }
    }
    function reset() {
        setCardCount(prevCount => prevCount = 0)
    }

    const trackedCountTotal = cardCount * incrementAmount
    return (
        <>
            
           <div className="card-content radius">
            <h2 className="card-name">{name}</h2>
           
            <p><span>{trackedCountTotal}</span> times</p>
            <div className="card-buttons">
                <button className="card-btn radius" onClick={() => {
                                handleIncrement();
                                cardIncrement();
                }}>+{incrementAmount}</button>
                <button className="card-btn radius" onClick={() => {
                                handleDecrement();
                                cardDecrement();
                }}>-{incrementAmount}</button>
                <button className="card-btn radius" onClick={reset}>Reset</button>
                <button className="card-btn radius" onClick={() => onDelete(id)}>Delete</button>
            </div> 
            </div> 
        </>
    )
}