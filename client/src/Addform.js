import React from "react";
import { Box, useMediaQuery, TextField } from "@mui/material";
import { getIn } from "formik";
import axios from "axios";

const Addform = ({
  type,
  values = {},
  errors = {},
  touched = {},
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("book-bug"); // Retrieve email from local storage

    if (!email) {
      console.log("No email found in local storage.");
      return; // Handle missing email scenario
    }

    const bookData = {
      title: values[formattedName("bookName")],
      subtitle: values[formattedName("subtitle")],
      isbn13: values[formattedName("uniqueId")],
      price: values[formattedName("bookPrice")],
      image: values[formattedName("imageLink")],
      url: "", // or any other relevant field
      reviews: [], // if you have reviews, add them here
    };

    try {
      // Fetch existing user by email
      const userResponse = await axios.get(`/api/users/${email}`);
      const user = userResponse.data;

      if (user) {
        // Add the new book to the existing books array
        user.books.push(bookData);

        // Update the user document
        const updateResponse = await axios.put(`/api/users/${email}`, user);
        console.log(
          "Book added to existing user successfully",
          updateResponse.data
        );
        // Handle successful update, e.g., display a success message
      } else {
        console.log("User not found");
        // Handle user not found, e.g., display an error message
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      display="grid"
      marginX="70px"
      marginTop="90px"
      gap="15px"
      gridTemplateColumns={isNonMobile ? "repeat(4, 1fr)" : "repeat(1, 1fr)"}
      sx={{
        "& .MuiTextField-root": { width: "100%" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="Book Name"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("bookName")}
        error={formattedError("bookName")}
        helperText={formattedHelper("bookName")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Author Name"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("authorName")}
        error={formattedError("authorName")}
        helperText={formattedHelper("authorName")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Subtitle"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("subtitle")}
        error={formattedError("subtitle")}
        helperText={formattedHelper("subtitle")}
        sx={{ gridColumn: "span 4", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Description"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("description")}
        error={formattedError("description")}
        helperText={formattedHelper("description")}
        sx={{ gridColumn: "span 4", width: "90%" }}
      />

      <TextField
        fullWidth
        type="number"
        label="Book Price"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("bookPrice")}
        error={formattedError("bookPrice")}
        helperText={formattedHelper("bookPrice")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Publisher"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("publisher")}
        error={formattedError("publisher")}
        helperText={formattedHelper("publisher")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="number"
        label="Publication Year"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("publicationYear")}
        value={values[formattedName("publicationYear")]} // Ensure this value is controlled
        error={formattedError("publicationYear")}
        helperText={formattedHelper("publicationYear")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="number"
        label="Pages"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("pages")}
        error={formattedError("pages")}
        helperText={formattedHelper("pages")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Image Link"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("imageLink")}
        error={formattedError("imageLink")}
        helperText={formattedHelper("imageLink")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Unique Id (ISBN-13)"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("uniqueId")}
        error={formattedError("uniqueId")}
        helperText={formattedHelper("uniqueId")}
        sx={{ gridColumn: "span 2", width: "90%" }}
      />

      <TextField
        fullWidth
        type="text"
        label="Language"
        onBlur={handleBlur}
        onChange={handleChange}
        name={formattedName("language")}
        error={formattedError("language")}
        helperText={formattedHelper("language")}
        sx={{ gridColumn: "span 4", width: "90%" }}
      />

      <button
        type="submit"
        className="mt-6 col-span-4 px-4 py-3 bg-zinc-800 text-white font-bold rounded hover:bg-gray-700 transition duration-300 ease-in-out"
      >
        Add Data
      </button>
    </Box>
  );
};

export default Addform;
