from datetime import datetime, timezone, timedelta
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse

from services.database import JSONDatabase

app = FastAPI()


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)

    quote = Quote(name=name, message=message, time=now.isoformat())
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


@app.get("/quotesdb")
def get_quotes(date_iso: str="") -> list[Quote]:
    """
    Retrieve all quotes from the database.
    """
    if(date_iso):
        time = datetime.fromisoformat(date_iso.replace("Z", "+00:00"))
        if date_iso:
            time = datetime.fromisoformat(date_iso.replace("Z", "+00:00"))
            time = time.astimezone(timezone(offset=timedelta(hours=-8))) 

            quotes = []
            for quote in database["quotes"]:
                quote_time = datetime.fromisoformat(quote["time"])
                quote_time = quote_time.replace(tzinfo=timezone(offset=timedelta(hours=-8))) 
                print(quote_time, time) 
                if quote_time >= time:
                    quotes.append(quote)
        return quotes
    return database["quotes"]
