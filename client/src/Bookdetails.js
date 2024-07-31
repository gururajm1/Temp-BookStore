import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const BookDetails = () => {
  const { isbn13 } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation(); // Use useLocation hook
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `https://api.itbook.store/1.0/books/${isbn13}`
        );
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError(err.message);
      }
    };

    fetchBookData();
  }, [isbn13]);

  const handleDelete = async () => {
    try {
      const email = localStorage.getItem("book-bug"); // Get email from localStorage
      const currentIsbn13 = isbn13; // Use isbn13 from useParams

      // Send DELETE request to backend
      await axios.delete("http://localhost:5000/api/delete-book", {
        data: { email, isbn13: currentIsbn13 },
      });

      alert("Book deleted successfully");
      navigate("/dash"); // Navigate to dashboard
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };


  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid md:grid-cols-[1fr_400px] gap-1 p-4 md:p-8 max-w-6xl mx-auto">
      {book ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4">
              <img
                src={book.image || "/placeholder.svg"}
                alt={book.title}
                width={400}
                height={500}
                className="rounded-lg shadow-lg object-cover mt-20 transition-transform transform hover:scale-105 cursor-pointer fixed"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2 mt-16">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-muted-foreground">By {book.authors}</p>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5" />
                <span className="text-muted-foreground">(4.0)</span>
              </div>
            </div>
            <p className="text-muted-foreground">{book.desc}</p>
            <div className="flex items-center justify-between mt-5">
              <div className="text-2xl font-bold">{book.price}</div>
              <div className="flex gap-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Buy Now
                </button>
                <button
                  onClick={handleDelete}
                  className="border border-red-500 text-red-500 py-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="mt-7">
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <p className="text-muted-foreground">{book.desc}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-3 mt-3">Details</h2>
                <ul className="grid gap-2 text-muted-foreground">
                  <li>
                    <span className="font-medium">Publisher:</span>{" "}
                    {book.publisher}
                  </li>
                  <li>
                    <span className="font-medium">Publication Date:</span>{" "}
                    {book.publishedDate}
                  </li>
                  <li>
                    <span className="font-medium">Language:</span> English
                  </li>
                  <li>
                    <span className="font-medium">Paperback:</span> {book.pages}{" "}
                    pages
                  </li>
                  <li>
                    <span className="font-medium">ISBN-10:</span> {book.isbn10}
                  </li>
                  <li>
                    <span className="font-medium">ISBN-13:</span> {book.isbn13}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;