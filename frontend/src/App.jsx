import QuoteBox from "/components/quote";
import quote from "/quotebook.png"
import "./App.css";
import Button from "../components/ui/button";
import { useEffect, useState } from "react";
import FilterMenu from "../components/timepicker";

function App() {
	const [quotes, setQuotes] = useState([]);
	const [name, setName] = useState(''); 
	const [message, setMessage] = useState(''); 

	useEffect(() => {
		getQuotes(); 
	}, [])

	const getQuotes = async () => {
		try {
            const response = await fetch('/api/quotesdb');
            if (response.ok) {
            	const data = await response.json();
            	setQuotes([...data].sort((a, b) => new Date(b.time) - new Date(a.time)));
            } else {
            	throw new Error(response.status + ' ' + response.statusText);
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
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

			<h2>Add your Quote</h2>
			<form id="quoteform" onSubmit={submitQuote}>
				<label htmlFor="input-name" className="label">Name</label>
				<input 
					type="text" 
					name="name" 
					id="input-name" 
					value={name} 
					required 
					onChange={(e) => {setName(e.target.value)}} 
					placeholder="Your Name..."
				/>
				<label htmlFor="input-message" className="label">Quote</label>
				<input 
					type="text" 
					name="message" 
					id="input-message" 
					value={message} 
					required 
					onChange={(e) => {setMessage(e.target.value);}} 
					placeholder="Your Quote..."
				/>
				<Button type="submit">Submit</Button>
			</form>

			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				columnGap: '0.5rem'
			}}>
				<h2>Previous Quotes</h2>
				<FilterMenu />
			</div>
			<div className="grid-container" style={{alignItems: "center", justifyContent: "center"}}>
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
