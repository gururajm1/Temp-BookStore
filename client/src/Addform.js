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
    uniqueId: "",
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
      const email = localStorage.getItem("book-bug"); // Retrieve email from localStorage

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
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Author Name"
        onChange={handleChange}
        name="authorName"
        value={formData.authorName}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Subtitle"
        onChange={handleChange}
        name="subtitle"
        value={formData.subtitle}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Description"
        onChange={handleChange}
        name="description"
        value={formData.description}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="number"
        label="Book Price"
        onChange={handleChange}
        name="bookPrice"
        value={formData.bookPrice}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Publisher"
        onChange={handleChange}
        name="publisher"
        value={formData.publisher}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="number"
        label="Publication Year"
        onChange={handleChange}
        name="publicationYear"
        value={formData.publicationYear}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="number"
        label="Pages"
        onChange={handleChange}
        name="pages"
        value={formData.pages}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Image Link"
        onChange={handleChange}
        name="imageLink"
        value={formData.imageLink}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Unique Id (ISBN-13)"
        onChange={handleChange}
        name="uniqueId"
        value={formData.uniqueId}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
      />
      <TextField
        type="text"
        label="Language"
        onChange={handleChange}
        name="language"
        value={formData.language}
        sx={{
          width: "90%",
          "& .MuiInputBase-root": { height: 40 },
          "& .MuiInputBase-input": { fontSize: "0.875rem" },
        }}
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
