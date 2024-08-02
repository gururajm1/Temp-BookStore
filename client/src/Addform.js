import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addform = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookName: "",
    authorName: "",
    subtitle: "",
    description: "",
    bookPrice: "",
    publisher: "",
    publicationYear: "",
    pages: "",
    imageLink: "",
    isbn13: "", // Ensure this matches the field in the form
    language: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log(formData);
      const email = localStorage.getItem("book-bug");

      if (!email) {
        throw new Error("User email not found");
      }

      const response = await axios.post("http://localhost:5000/api/add-book", {
        email,
        bookData: formData,
      });

      console.log("Form submitted successfully:", response.data);
      window.alert("Book data added successfully!");
      navigate("/dash");
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="grid"
      margin="0 auto"
      padding="20px"
      maxWidth="600px"
      gap="15px"
      gridTemplateColumns="1fr"
      sx={{
        "& .MuiTextField-root": { width: "100%" },
        overflow: "hidden",
      }}
    >
      <TextField
        type="text"
        label="Book Name"
        onChange={handleChange}
        name="bookName"
        value={formData.bookName}
      />
      <TextField
        type="text"
        label="Author Name"
        onChange={handleChange}
        name="authorName"
        value={formData.authorName}
      />
      <TextField
        type="text"
        label="Subtitle"
        onChange={handleChange}
        name="subtitle"
        value={formData.subtitle}
      />
      <TextField
        type="text"
        label="Description"
        onChange={handleChange}
        name="description"
        value={formData.description}
      />
      <TextField
        type="number"
        label="Book Price"
        onChange={handleChange}
        name="bookPrice"
        value={formData.bookPrice}
      />
      <TextField
        type="text"
        label="Publisher"
        onChange={handleChange}
        name="publisher"
        value={formData.publisher}
      />
      <TextField
        type="number"
        label="Publication Year"
        onChange={handleChange}
        name="publicationYear"
        value={formData.publicationYear}
      />
      <TextField
        type="number"
        label="Pages"
        onChange={handleChange}
        name="pages"
        value={formData.pages}
      />
      <TextField
        type="text"
        label="Image Link"
        onChange={handleChange}
        name="imageLink"
        value={formData.imageLink}
      />
      <TextField
        type="text"
        label="Unique Id (ISBN-13)"
        onChange={handleChange}
        name="isbn13" // Correct field name in formData
        value={formData.isbn13} // Correct field name in formData
      />

      <TextField
        type="text"
        label="Language"
        onChange={handleChange}
        name="language"
        value={formData.language}
      />

      <button
        type="submit"
        className={`mt-6 px-4 py-3 bg-zinc-800 text-white font-bold rounded hover:bg-gray-700 transition duration-300 ease-in-out ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Add Data"}
      </button>
    </Box>
  );
};

export default Addform;
