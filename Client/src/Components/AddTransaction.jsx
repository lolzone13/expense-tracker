import React, { useState, useContext } from 'react'
import { GlobalContext } from '../Context/GlobalState';

function AddTransaction() {

    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext);

    function onSubmit(event) {
        event.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),// use uiud 
            text: text,
            amount: parseFloat(amount)
        }

        addTransaction(newTransaction);
    }

    return (
        <div>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount" >Amount <br />
                        (negative - expense, positive - income)
                    </label >
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn" >Add transaction</button>
            </form>
        </div>
    )
}

export default AddTransaction
