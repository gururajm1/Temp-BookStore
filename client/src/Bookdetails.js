import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

const BookDetails = () => {
  const { isbn13 } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    title: "",
    subtitle: "",
    price: "",
    image: "",
  });
  const [reviewText, setReviewText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const isAdded = location.pathname.includes("/added");
        let response;

        if (isAdded) {
          const email = localStorage.getItem("book-bug");
          response = await axios.get(
            `http://localhost:5000/api/users/${email}`
          );
          const user = response.data;
          const userAddedBook = user.books.find(
            (book) => book.isbn13 === isbn13
          );

          if (userAddedBook) {
            setBook({
              ...userAddedBook,
              reviews: userAddedBook.reviews || [],
            });
            setEditFields({
              title: userAddedBook.title,
              subtitle: userAddedBook.subtitle,
              price: userAddedBook.price,
              image: userAddedBook.image,
            });
            return;
          }
          setError("Book not found in user's added books");
        } else {
          response = await axios.get(
            `https://api.itbook.store/1.0/books/${isbn13}`
          );
          setBook({
            ...response.data,
            reviews: response.data.reviews || [],
          });
          setEditFields({
            title: response.data.title,
            subtitle: response.data.subtitle,
            price: response.data.price,
            image: response.data.image,
          });
        }
      } catch (err) {
        console.error(
          "Error fetching book data:",
          err.response?.data || err.message
        );
        setError("Error fetching book data");
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
      await axios.put("http://localhost:5000/api/add-book", {
        email,
        book: { ...editFields, isbn13: book.isbn13 },
        added: true,
      });

      setBook({
        ...book,
        title: editFields.title,
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


  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      const email = localStorage.getItem("book-bug");
      const response = await axios.get(
        `http://localhost:5000/api/users/${email}`
      );
      const user = response.data;
      const name = user.name;

      const newReview = {
        userName: name,
        reviewText: reviewText,
      };

      const updatedReviews = [...book.reviews, newReview];
      setBook((prevBook) => ({
        ...prevBook,
        reviews: updatedReviews,
      }));

      await axios.put("http://localhost:5000/api/update-book", {
        email,
        isbn13: book.isbn13,
        reviews: updatedReviews,
      });

      setReviewText("");
      alert("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!book) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto mt-8 shadow-md rounded-lg bg-white">
      <div className="flex flex-col md:flex-row items-center">
        <img
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
          src={book.image}
          alt={book.title}
        />
        <div className="w-full md:w-2/3">
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editFields.title}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="subtitle"
                value={editFields.subtitle}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="price"
                value={editFields.price}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="image"
                value={editFields.image}
                onChange={handleChange}
                className="block w-full mb-2 p-2 border border-gray-300 rounded"
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
              <h2 className="text-xl text-gray-600 mb-2">{book.subtitle}</h2>
              <p className="text-lg text-blue-600 mb-4">{book.price}</p>
            </>
          )}
          <p className="text-gray-600 mb-4">{book.desc}</p>
          <div className="mb-4">
            <span className="font-bold">Authors: </span>
            {book.authors}
          </div>
          <div className="mb-4">
            <span className="font-bold">Publisher: </span>
            {book.publisher}
          </div>
          <div className="mb-4">
            <span className="font-bold">Year: </span>
            {book.year}
          </div>
          <div className="mb-4">
            <span className="font-bold">Pages: </span>
            {book.pages}
          </div>
          <div className="mb-4">
            <span className="font-bold">Language: </span>
            {book.language}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <span className="font-bold">Rating: </span>
              <div className="flex ml-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>
                      {i < book.rating ? (
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <StarIconOutline className="h-5 w-5 text-gray-400" />
                      )}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold">Reviews: </span>
            {book.reviews.length > 0 ? (
              <ul className="list-disc list-inside">
                {book.reviews.map((review, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-bold">{review.userName}:</span>{" "}
                    {review.reviewText}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={handleReviewChange}
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
          {location.pathname.includes("/added") && (
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete Book
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={isEditing ? handleUpdate : handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
