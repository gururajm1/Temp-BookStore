import { useState, useMemo } from "react";
import { Link } from "react-router-dom"; 


const Button = ({ variant, className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md";
  const variantStyles =
    variant === "outline" ? "border border-gray-300" : "bg-primary text-white";
  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    />
  );
};

const Card = ({ className, children }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-md transition-transform transform hover:scale-105 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};


const DropdownMenu = ({ children, isOpen }) => (
  <div className={`relative ${isOpen ? "block" : "hidden"}`}>{children}</div>
);

const DropdownButton = ({ children, onClick }) => {
  return (
    <button className="bg-gray-100 p-2 rounded-md" onClick={onClick}>
      {children}
    </button>
  );
};

const DropdownMenuContent = ({ children }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md">
      {children}
    </div>
  );
};

const DropdownItem = ({ children, onClick }) => {
  return (
    <button
      className="w-full text-left px-4 py-2 hover:bg-gray-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DropdownMenuTrigger = ({ children, onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};


const SearchIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4a7 7 0 1 1-7 7 7 7 0 0 1 7-7zm0-2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm2 9h-4v2h4v-2zm0-4h-4v2h4V7z"
      fill="currentColor"
    />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 5h18v2H3V5zm0 4h18v2H3V9zm0 4h18v2H3v-2zm0 4h18v2H3v-2z"
      fill="currentColor"
    />
  </svg>
);

const ListOrderedIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 6h14v2H7V6zm0 4h14v2H7v-2zm0 4h14v2H7v-2zm0 4h14v2H7v-2z"
      fill="currentColor"
    />
  </svg>
);

const BookIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2h12v20H6V2zm10 2H8v16h8V4zm-2 2H10v2h4V6z"
      fill="currentColor"
    />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.27l-7.19-.62L12 2 9.19 8.65 2 9.27l5.46 4.7L5.82 21 12 17.27z"
      fill="currentColor"
    />
  </svg>
);


export default function Component() {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "A classic novel about the decadence and excess of the Roaring Twenties.",
      genre: "Fiction",
      price: 12.99,
      rating: 4.5,
      cover: "/placeholder.svg",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "A powerful story of racial injustice and the courage to stand up for what is right.",
      genre: "Fiction",
      price: 9.99,
      rating: 4.8,
      cover: "/placeholder.svg",
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      description:
        "A magical and inspirational tale about following your dreams.",
      genre: "Fiction",
      price: 7.99,
      rating: 4.6,
      cover: "/placeholder.svg",
    },
    {
      id: 4,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      description:
        "A story of friendship, betrayal, and redemption set in Afghanistan.",
      genre: "Fiction",
      price: 11.99,
      rating: 4.7,
      cover: "/placeholder.svg",
    },
    {
      id: 5,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      description:
        "A dystopian thriller about a young girl fighting for survival in a brutal competition.",
      genre: "Science Fiction",
      price: 8.99,
      rating: 4.6,
      cover: "/placeholder.svg",
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description:
        "The classic fantasy adventure that introduced the world to Middle-earth.",
      genre: "Fantasy",
      price: 14.99,
      rating: 4.8,
      cover: "/placeholder.svg",
    },
    {
      id: 7,
      title: "The Fault in Our Stars",
      author: "John Green",
      description:
        "A poignant and emotional story about two teenagers dealing with cancer.",
      genre: "Young Adult",
      price: 10.99,
      rating: 4.5,
      cover: "/placeholder.svg",
    },
    {
      id: 8,
      title: "The Book Thief",
      author: "Markus Zusak",
      description:
        "A unique and powerful story set in Nazi Germany, narrated by Death itself.",
      genre: "Historical Fiction",
      price: 13.99,
      rating: 4.7,
      cover: "/placeholder.svg",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState({
    genre: [],
    price: { min: 0, max: Infinity },
    rating: { min: 0, max: 5 },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const { genre, price, rating } = filterBy;
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (genre.length === 0 || genre.includes(book.genre)) &&
          book.price >= price.min &&
          book.price <= price.max &&
          book.rating >= rating.min &&
          book.rating <= rating.max
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating-asc":
            return a.rating - b.rating;
          case "rating-desc":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [books, searchTerm, filterBy, sortBy]);

  const handleSortChange = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            to="/"
            className="text-2xl font-bold text-primary flex items-center"
          >
            <BookIcon className="w-8 h-8 text-primary mr-2" />
            Bookstore
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md p-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownMenuTrigger
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Button variant="outline">
                  Sort by: {sortBy.replace("-", " ")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownItem onClick={() => handleSortChange("relevance")}>
                  Relevance
                </DropdownItem>
                <DropdownItem onClick={() => handleSortChange("price-asc")}>
                  Price (Low to High)
                </DropdownItem>
                <DropdownItem onClick={() => handleSortChange("price-desc")}>
                  Price (High to Low)
                </DropdownItem>
                <DropdownItem onClick={() => handleSortChange("rating-asc")}>
                  Rating (Low to High)
                </DropdownItem>
                <DropdownItem onClick={() => handleSortChange("rating-desc")}>
                  Rating (High to Low)
                </DropdownItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {filteredBooks.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:cursor-pointer"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-sm mt-2">{book.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold">${book.price.toFixed(2)}</span>
                    <span className="flex items-center">
                      <StarIcon className="w-5 h-5 text-black" />
                      <span className="ml-1 text-sm">
                        {book.rating.toFixed(1)}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
