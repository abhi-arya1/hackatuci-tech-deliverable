import QuoteBox from "/components/quote";
import quote from "/quotebook.png"
import "./App.css";
import Navbar from "../components/navbar";
import Button from "../components/ui/button";
import { useEffect, useState } from "react";
import DropdownMenuDemo from "../components/timepicker";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [name, setName] = useState(''); 
	const [message, setMessage] = useState(''); 

	useEffect(() => {
		getQuotes(); 
	}, [])

	const getQuotes = async () => {
		const response = await fetch("/api/quotesdb");
		const data = await response.json();
		setQuotes(data);
	}

	const submitQuote = async (e) => {
		e.preventDefault()
        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ name, message }).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error (Status: ${response.status} )`);
            }
            setName('');
            setMessage('');
			getQuotes();
        } catch (error) {
            console.error("Quote Submission Failed:", error);
        }
    };

	return (
		<div className="App">
			<div className="hero">
				<img src={quote} alt="quote" height={60} />
				<h1 style={{padding: 20}}>Hack at UCI's QuoteBook</h1>
			</div>

			<h2>Submit a quote</h2>
			<form id="quoteform" onSubmit={submitQuote}>
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" value={name} required onChange={(e) => {setName(e.target.value)}} />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" value={message} required onChange={(e) => {setMessage(e.target.value);}} />
				<Button type="submit">Submit</Button>
			</form>

			<h2>Previous Quotes</h2>
			<DropdownMenuDemo />
			<div className="messages">
				{   
					quotes.map((quote, index) => {
						return <QuoteBox key={index} name={quote.name} message={quote.message} time={quote.time} />
					})
				}
			</div>
		</div>
	);
}

export default App;
