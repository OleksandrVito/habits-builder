const getQuote = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com",
    },
  };

  const response = await fetch(
    "https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1",
    options
  );

  return await response.json();
};

export default getQuote;
