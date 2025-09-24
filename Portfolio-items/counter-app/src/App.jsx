import { useState } from 'react'
import CounterCard from './CounterCard'

export default function App() {
  const [count, setCount] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [cards, setCards] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    incrementAmount: ''
  })
  function handleIncrement() {
    setCount( prev => prev + 1 )
  }
  function handleDecrement() {
    if (count > 0) {
      setCount( prev => prev - 1 )
    }
  }

  function handleShowForm() {
    setShowForm(showForm => !showForm)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit(formData) {
    
    const data = Object.fromEntries(formData)
    const newCard = {
      id: crypto.randomUUID(),
      ...data
    }
    setCards(prevCards => [...prevCards, newCard])
    setFormData({
      name: '',
      incrementAmount: ''
    })
    setShowForm(showForm => !showForm)
  }
  function handleDelete(id) {
    setCards(cards.filter(card => card.id !== id))
  }
 
  return (
    <>
      <h1>Counter App</h1>
      <div className="box">

      <div id="add-new" className='radius'>
      <button className="radius">Total: {cards.length > 0 ? count : 0}</button>
      {/* <button>TotalCount: {totalCount}</button> */}
      <button className="radius">Total Cards: {cards.length}</button>
      <button className="radius" onClick={handleShowForm}>{showForm ? '- Cancel Counter -' : '+ Add New Counter'}</button>
      
      </div>
      
     {showForm && <div id="new-tracker-form" className="radius">
        <form action={handleSubmit} id="form" className="radius">
         
          <label 
            htmlFor="new-input">
              New Trackers Name: 
          </label>
          <input 
            type="text" 
            id="new-input" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
         
          <label 
            htmlFor="increment">
              Increment Amount: 
          </label>
          <input 
            type="number" 
            id="increment" 
            name="incrementAmount"
            value={formData.incrementAmount}
            onChange={handleChange}
            />
          <div className="form-buttons">

            <button className="radius" value="submit" onClick={() => {handleShowForm}}>
              Create Counter
            </button>
            <button className="radius" onClick={handleShowForm}>
              Cancel
            </button>
          </div>
        </form>
      </div>}
    
        <div id="card-section">
        {cards.length === 0 ? <p className="nada">nothing to count</p> : 
        
        cards.map((card) => (
          <CounterCard 
          key={card.id}
          id={card.id}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement} 
          count={count}
          name={card.name}
          incrementAmount={card.incrementAmount}
          onDelete={handleDelete}
          />))}
        </div>
      </div>
    </>
  )
}


