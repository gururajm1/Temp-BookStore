import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

const BookDetails = () => {
  const { isbn13 } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    name: "",
    subtitle: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchBookData = async () => {
      if (location.pathname.includes("/added")) {
        // Fetch the user and check the added books
        const email = localStorage.getItem("book-bug");
        try {
          const userResponse = await axios.get(
            `http://localhost:5000/api/users/${email}`
          );
          const user = userResponse.data;
          const addedBook = user.added.find((b) => b.isbn13 === isbn13);

          if (addedBook) {
            setBook(addedBook);
            setEditFields({
              name: addedBook.name,
              subtitle: addedBook.subtitle,
              price: addedBook.price,
              image: addedBook.image,
            });
          } else {
            setError("Book not found in the added list.");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err.message);
        }
      } else {
        // Fetch book data from the API
        try {
          const response = await axios.get(
            `https://api.itbook.store/1.0/books/${isbn13}`
          );
          setBook(response.data);
          setEditFields({
            name: response.data.title,
            subtitle: response.data.subtitle,
            price: response.data.price,
            image: response.data.image,
          });
        } catch (err) {
          console.error("Error fetching book data:", err);
          setError(err.message);
        }
      }
    };

    fetchBookData();
  }, [isbn13, location.pathname]);

  const handleDelete = async () => {
    try {
      const email = localStorage.getItem("book-bug");
      await axios.delete("http://localhost:5000/api/delete-book", {
        data: { email, isbn13 },
      });

      alert("Book deleted successfully");
      navigate("/dash");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditFields({
      ...editFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const email = localStorage.getItem("book-bug");
      await axios.put("http://localhost:5000/api/update-book", {
        email,
        isbn13,
        ...editFields,
      });

      setBook({
        ...book,
        name: editFields.name,
        subtitle: editFields.subtitle,
        price: editFields.price,
        image: editFields.image,
      });

      alert("Book updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating book:", error);
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
                src={editFields.image || "/placeholder.svg"}
                alt={book.name}
                width={400}
                height={500}
                className="rounded-lg shadow-lg object-cover mt-20 transition-transform transform hover:scale-105 cursor-pointer fixed"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2 mt-16">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editFields.name}
                    onChange={handleChange}
                    className="text-3xl font-bold border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="subtitle"
                    value={editFields.subtitle}
                    onChange={handleChange}
                    className="text-muted-foreground border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="price"
                    value={editFields.price}
                    onChange={handleChange}
                    className="text-2xl font-bold border border-gray-300 rounded-lg p-2"
                  />
                  <input
                    type="text"
                    name="image"
                    value={editFields.image}
                    onChange={handleChange}
                    className="text-muted-foreground border border-gray-300 rounded-lg p-2"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">{book.name}</h1>
                  <p className="text-muted-foreground">{book.subtitle}</p>
                  <div className="text-2xl font-bold">{book.price}</div>
                </>
              )}
              <p className="text-muted-foreground">By {book.author}</p>
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIcon className="w-5 h-5 fill-black" />
                <StarIconOutline className="w-5 h-5" />
                <span className="text-muted-foreground">(4.0)</span>
              </div>
            </div>
            <p className="text-muted-foreground">{book.desc}</p>
            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-4">
                <button
                  onClick={handleEditToggle}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  >
                    Save
                  </button>
                )}
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
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default BookDetails;
