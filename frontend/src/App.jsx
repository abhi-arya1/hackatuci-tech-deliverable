import QuoteBox from "/components/quote";
import quote from "/quotebook.png"
import Button from "../components/ui/button";
import DateSlider from "../components/timepicker";
import Typewriter from 'typewriter-effect';
import { useEffect, useState } from "react";
import "./App.css";
import Footer from "../components/ui/footer";


function App() {
	// STATES ////////////////////////////////////
	const [quotes, setQuotes] = useState([]);
	const [dates, setDates] = useState([]); 
	const [selectedDate, setSelectedDate] = useState('');
	const [name, setName] = useState(''); 
	const [message, setMessage] = useState(''); 
	const [filteredQuotes, setFilteredQuotes] = useState([]); 
	const [search, setSearch] = useState('');

	// FUNCTIONS /////////////////////////////////

	/**
	 * getQuotes - Fetches all quotes, or filters by dates with the dateISO parameter
	 * @param {*} dateISO '' if not filtering by date, else the date's ISO string
	 * @param {*} updateDates true if sending a new quote/updating dates, else false 
	 */
	const getQuotes = async (dateISO, updateDates) => {
		try {
			let response; 
			if (dateISO !== '') {
				response = await fetch('/api/quotesdb?date_iso=' + dateISO);
			} else { 
				response = await fetch('/api/quotesdb')
			}
            if (response.ok) {
            	const data = await response.json();
				const _quotes = [...data].sort((a, b) => new Date(b.time) - new Date(a.time))
            	setQuotes(_quotes);
				if (dateISO === '' || updateDates) {
					setDates([..._quotes.map(quote => quote.time)]
								.sort((a, b) => new Date(b.time) - new Date(a.time))
								.reverse()
							);
					setSelectedDate(new Date(_quotes[_quotes.length - 1].time)); 
				}
            } else {
            	throw new Error(response.status + ' ' + response.statusText);
            }
        } catch (error) {
            console.error('Error fetching quotes:', error);
        }
	}

	/**
	 * Handles quote submission
	 * @param {*} e The mouse event that submits the quote's form
	 */
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
			getQuotes('', true);
        } catch (error) {
            console.error("Quote Submission Failed:", error);
        }
    };

	// HOOKS  //////////////////////////////////////
	// Search Hook 
	useEffect(() => {
			setFilteredQuotes(
				quotes.filter(quote => quote.message.toLowerCase().includes(search.toLowerCase()) || 
				quote.name.toLowerCase().includes(search.toLowerCase()))
			);
		}, [search, quotes]); 

	// Date Filtering Hook 
	useEffect(() => {
		/* 
			It may be less api-intensive to do the data filtering on the frontend rather than on date selection, 
			however the datepicker only renders updated dates when you lift your mouse for efficiency and to meet
			parameter query requirements - Abhi 
		*/
		if (selectedDate === '') {
			getQuotes('', true);
		} else { 
			getQuotes(selectedDate.toISOString(), false);
		}
	}, [selectedDate, setSelectedDate])

	// RENDER //////////////////////////////////////
	return (
		<div className="App">

			{ /* HERO AREA + REQUIRED IMAGE  */ }
			<div className="hero">
				<img 
					src={quote} 
					alt="quote" 
					height={60} 
				/>
				<h1 style={{padding: 20}} className="less-shadowed-text">Hack at UCI's QuoteBook</h1>
			</div>

			{ /* QUOTE ADDING TEXT */ }
			<div className="typed-string less-shadowed-text">
				<Typewriter
					onInit={(typewriter) => {
						typewriter.typeString('<span>Add your Quote!</span>')
						.start();
					}}
					options={{
						stringClassName: 'typed-string',
					}}
				/>
			</div>

			{ /* QUOTE ADDING FORM */ }
			<form 
				id="quoteform" 
				onSubmit={submitQuote}
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<label htmlFor="input-name" className="label less-shadowed-text">Name</label>
				<input 
					type="text" 
					name="name" 
					id="input-name" 
					value={name} 
					required 
					onChange={(e) => {setName(e.target.value)}} 
					placeholder="Your Name..."
					className="input-message"
				/>
				<label htmlFor="input-message" className="label less-shadowed-text">Quote</label>
				<textarea
					type="text" 
					name="message" 
					id="input-message" 
					value={message} 
					required 
					onChange={(e) => {setMessage(e.target.value);}} 
					placeholder="Your Quote..."
					className="input-message"
					style={{
						height: '37px',
						minHeight: '37px', 
						minWidth: '180px'
					}}
				/>
				<div style={{padding: '8px'}}/>
				<Button type="submit">Submit</Button>
			</form>

			{ /* PREVIOUS QUOTES/FILTERING DISPLAY */ }
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				columnGap: "30px",
			}}>
				<h2 className="less-shadowed-text">Previous Quotes</h2>
				<DateSlider 
					dates={dates} 
					setSelectedDate={setSelectedDate}
				/>
				<input 
					type="text" 
					name="message" 
					id="input-message" 
					value={search} 
					required 
					onChange={(e) => {setSearch(e.target.value);}} 
					placeholder="Search by Name or Message"
					className="input-message"
					style={{
						fontSize: '12px', 
						padding: '8px',
						width: '185px'
					}}
				/>
			</div>
			
			{ /* QUOTE DISPLAY AREA */ }
			<div className="grid-container" style={{alignItems: "center", justifyContent: "center"}}>
				{   
					filteredQuotes.map((quote, index) => {
						return <QuoteBox key={index} name={quote.name} message={quote.message} time={quote.time} />
					})
				}
			</div>
			
			{ /* FOOTER */ }
			<Footer />
		</div>
	);
}

export default App;
