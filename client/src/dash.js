import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = ({ variant, className, onClick, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md";
  const variantStyles =
    variant === "outline" ? "border border-gray-300" : "bg-blue-500 text-white";
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      {...props}
    />
  );
};

const Card = ({ className, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children }) => {
  return (
    <div className={`p-4 flex flex-col justify-between h-full ${className}`}>
      {children}
    </div>
  );
};

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
          `http://localhost:5000/api/users/${email}`
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err); // Log error for debugging
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-500">
            Bookstore Dashboard
          </h1>
          <div className="flex items-end gap-14">
            <Button variant="outline" onClick={() => navigate("/add")}>
              Add Book
            </Button>
            <Button variant="outline" className="p-2 bg-red-400">
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold">Welcome</h1>
          {user ? (
            <>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">
                  Books
                </h3>
                {user.books.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {user.books.map((book, index) => (
                      <Card
                        key={index}
                        className="overflow-hidden flex flex-col"
                        onClick={() => navigate(`/details/${book.isbn13}`)}
                      >
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent>
                          <h4 className="text-lg font-semibold text-gray-800">
                            {book.title}
                          </h4>
                          <p className="text-gray-600">{book.subtitle}</p>

                          <div className="flex justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <p className="text-gray-800">Price:</p>
                              <p className="text-green-600 font-semibold">
                                {book.price}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <p>Reviews:</p>
                              <p className="text-blue-600 font-semibold">
                                {book.reviews.length}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No books available.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dash;
