import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dash() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("book-bug");
        if (!email) {
          navigate("/signup");
          return;
        }

        const response = await axios.get(
          `http://localhost:7001/api/users/${email}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Welcome to the Dashboard
        </h2>
        {user ? (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-2 text-gray-700">
                User Info
              </h3>
              <p className="text-lg text-gray-600">Name: {user.name}</p>
              <p className="text-lg text-gray-600">Email: {user.email}</p>
              <p className="text-lg text-gray-600">Age: {user.age}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-700">
                Books
              </h3>
              {user.books.length > 0 ? (
                <ul className="space-y-4">
                  {user.books.map((book, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-xl font-bold text-gray-800">
                            {book.title}
                          </p>
                          <p className="text-gray-600">{book.subtitle}</p>
                          <p className="text-blue-600 font-semibold">
                            Price: {book.price}
                          </p>
                          <p className="text-blue-600 font-semibold">
                            Reviews: {book.reviews.length}
                          </p>
                          {/* <p>
                            <strong>URL:</strong>{" "}
                            <a
                              href={book.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {book.url}
                            </a>
                          </p> */}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No books available.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Dash;
