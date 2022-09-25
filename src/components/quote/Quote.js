import { useState } from "react";
import getQuote from "../../service/getQuote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
// import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./quote.css";
import { useEffect } from "react";

let day = new Date().getDate();
if (!localStorage.getItem("day") || +localStorage.getItem("day") !== day) {
  localStorage.setItem("quote", "");
  localStorage.setItem("author", "");
}

const Quote = () => {
  // const [day, setDay] = useState(localStorage.getItem("day"));
  const [quote, setQuote] = useState(localStorage.getItem("quote"));
  const [author, setAuthor] = useState(localStorage.getItem("author"));

  useEffect(() => {
    let day = new Date().getDate();
    let quote;
    let author;
    if (!localStorage.getItem("day") || +localStorage.getItem("day") !== day) {
      console.log("це той випадок");
      getQuote().then((response) => {
        console.log(response);
        quote = response[0].quote;
        author = response[0].author;
        localStorage.setItem("quote", quote);
        localStorage.setItem("author", author);
        setQuote(quote);
        setAuthor(author);
      });

      localStorage.setItem("day", day);
    }
  }, []);

  return (
    <div className="quote-box">
      <blockquote>
        <FontAwesomeIcon icon={faQuoteLeft} />
        {quote}
        {/* <FontAwesomeIcon icon={faQuoteRight} /> */}
      </blockquote>
      <cite>{author}</cite>
    </div>
  );
};

export default Quote;
