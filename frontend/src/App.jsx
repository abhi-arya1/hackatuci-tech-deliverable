import QuoteBox from "/components/quote";
import quote from "/quotebook.png"
import "./App.css";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

function App() {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		getQuotes();
	}, []);

	const getQuotes = async () => {
		const response = await fetch("/api/quotesdb");
		const data = await response.json();
		setQuotes(data);
	}

	return (
		<div className="App">
			<div className="hero">
				<img src={quote} alt="quote" height={60} />
				<h1 style={{padding: 20}}>Hack at UCI's QuoteBook</h1>
			</div>

			<h2>Submit a quote</h2>
			<form onSubmit={(e) => {e.preventDefault(); console.log("HI");}}>
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" onClick={getQuotes} >Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			<div className="messages">
				{   
					quotes.map((quote, index) => {
						return <QuoteBox key={index} name={quote.name} message={quote.message} />
					})
				}
			</div>
		</div>
	);
}

export default App;
