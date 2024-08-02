import React, { useEffect, useState } from "react";

const Dummy = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://api.itbook.store/1.0/new");
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (data.books) {
            setBooks(data.books);

            console.log("Sending data to backend:", data.books);

            const backendResponse = await fetch(
              "/api/books",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data.books),
              }
            );

            if (!backendResponse.ok) {
              throw new Error(`Backend error: ${backendResponse.statusText}`);
            }

            setLoading(false);
          } else {
            throw new Error("Unexpected response format: No 'books' key");
          }
        } catch (e) {
          throw new Error(`Unexpected response format: ${text}`);
        }
      } catch (error) {
        console.error("Fetching books failed:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!books.length) {
    return <div>No books data available</div>;
  }

  return (
    <div>
      <h1>Book List</h1>
      {books.map((book) => (
        <div key={book.isbn13}>
          <h2>{book.title}</h2>
          <img src={book.image} alt={book.title} />
          <p>{book.subtitle}</p>
          <p>Price: {book.price}</p>
          <a href={book.url} target="_blank" rel="noopener noreferrer">
            More info
          </a>
        </div>
      ))}
    </div>
  );
};

export default Dummy;
