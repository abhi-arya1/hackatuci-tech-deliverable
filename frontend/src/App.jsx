import QuoteBox from "/components/quote";
import quote from "/quotebook.png"
import "./App.css";

function App() {

	const getQuotes = async () => {
		const response = await fetch("/api/quotesdb");
		const data = await response.json();
		console.log(data);
		return data;
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<img src={quote} alt="quote" />
			<h1>Hack at UCI's QuoteBook</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form onSubmit={(e) => {e.preventDefault(); console.log("HI");}}>
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit" onClick={getQuotes} >Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<div className="messages">
				<QuoteBox name="John Doe" message={"Testing"} />
			</div>
		</div>
	);
}

export default App;
