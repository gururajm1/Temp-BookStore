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
    title: "",
    subtitle: "",
    price: "",
    image: "",
  });
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const isAddedPath = location.pathname.includes("/added");

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        let bookData;
        if (isAddedPath) {
          const email = localStorage.getItem("book-bug");
          const userResponse = await axios.get(
            `http://localhost:7001/api/users/${email}`
          );
          const user = userResponse.data;

          bookData = user.added.find((b) => b.isbn13 === isbn13);
          if (bookData) {
            setBook(bookData);
            setEditFields({
              title: bookData.title,
              subtitle: bookData.subtitle,
              price: bookData.price,
              image: bookData.image,
            });

            const storedReviews =
              JSON.parse(localStorage.getItem("book-reviews")) || [];
            const filteredReviews = storedReviews.filter(
              (review) => review.isbn13 === isbn13
            );
            setReviews(filteredReviews);
          } else {
            setError("Book not found in the added list.");
          }
        } else {
          const response = await axios.get(
            `https://api.itbook.store/1.0/books/${isbn13}`
          );
          bookData = response.data;
          setBook(bookData);
          setEditFields({
            title: bookData.title,
            subtitle: bookData.subtitle,
            price: bookData.price,
            image: bookData.image,
          });

          const storedReviews =
            JSON.parse(localStorage.getItem("book-reviews")) || [];
          const filteredReviews = storedReviews.filter(
            (review) => review.isbn13 === isbn13
          );
          setReviews(filteredReviews);
        }
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError(err.message);
      }
    };

    fetchBookData();
  }, [isbn13, location.pathname]);

  const handleDelete = async () => {
    try {
      const email = localStorage.getItem("book-bug");
      await axios.delete("http://localhost:7001/api/delete-book", {
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
      const url = isAddedPath
        ? "http://localhost:7001/api/added-update"
        : "http://localhost:7001/api/update-book";

      await axios.put(url, {
        email,
        isbn13,
        ...editFields,
      });

      setBook({
        ...book,
        ...editFields,
      });

      alert("Book updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  const handleReviewSubmit = () => {
    if (!review) return;

    const newReview = {
      isbn13,
      by: localStorage.getItem("book-bug"),
      text: review,
    };

    const storedReviews =
      JSON.parse(localStorage.getItem("book-reviews")) || [];
    storedReviews.push(newReview);
    localStorage.setItem("book-reviews", JSON.stringify(storedReviews));

    setReviews([...reviews, newReview]);
    setReview("");
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
                alt={editFields.title}
                width={400}
                height={500}
                className="rounded-lg shadow-lg object-cover mt-20 transition-transform transform hover:scale-105 cursor-pointer hidden md:block lg:mx-0 lg:fixed"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="space-y-2 mt-16">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editFields.title}
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
                  <h1 className="text-3xl font-bold">
                    {isAddedPath ? book.name : book.title}
                  </h1>
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
                {!isAddedPath && (
                  <>
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
                  </>
                )}
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
                    <span className="font-medium">ISBN-13:</span> {book.isbn13}
                  </li>
                  <li>
                    <span className="font-medium">Pages:</span> {book.pages}
                  </li>
                  <li>
                    <span className="font-medium">Language:</span>{" "}
                    {book.language}
                  </li>
                  <li>
                    <span className="font-medium">Authors:</span> {book.author}
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2 mt-3">All Reviews</h2>
                <ul className="grid gap-2">
                  {reviews.map((review, index) => (
                    <li
                      key={index}
                      className="border border-gray-300 p-4 rounded-lg"
                    >
                      <p className="text-muted-foreground">{review.by} says:</p>
                      <p>
                        Opinion:
                        <br />
                        {review.text}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Write your review here..."
                  />
                  <button
                    onClick={handleReviewSubmit}
                    className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
