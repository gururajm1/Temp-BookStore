import React from "react";
//import Button from "@/components/ui/button";


export default function details() {
  return (
    <div className="grid md:grid-cols-[1fr_400px] gap-8 p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4">
          <img
            src="/placeholder.svg"
            alt="Book Cover"
            width={400}
            height={500}
            className="rounded-lg shadow-lg object-cover mt-20 fixed"
          />
          <div className="grid grid-cols-4 gap-2">
            {/* <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={150}
                className="aspect-[2/3] object-cover"
              />
              <span className="sr-only">View Image 1</span>
            </button>
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={150}
                className="aspect-[2/3] object-cover"
              />
              <span className="sr-only">View Image 2</span>
            </button>
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={150}
                className="aspect-[2/3] object-cover"
              />
              <span className="sr-only">View Image 3</span>
            </button>
            <button className="border hover:border-primary rounded-lg overflow-hidden transition-colors">
              <img
                src="/placeholder.svg"
                alt="Preview thumbnail"
                width={100}
                height={150}
                className="aspect-[2/3] object-cover"
              />
              <span className="sr-only">View Image 4</span>
            </button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="space-y-2 mt-16">
          <h1 className="text-3xl font-bold">The Alchemist</h1>
          <p className="text-muted-foreground">By Paulo Coelho</p>
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 fill-black" />
            <StarIcon className="w-5 h-5 fill-black" />
            <StarIcon className="w-5 h-5 fill-black" />
            <StarIcon className="w-5 h-5 fill-black" />
            <StarIcon className="w-5 h-5" />
            <span className="text-muted-foreground">(4.0)</span>
          </div>
        </div>
        <p className="text-muted-foreground">
          The Alchemist is a novel by Brazilian author Paulo Coelho that was
          first published in 1988. The story follows a young Andalusian shepherd
          in his journey to the pyramids of Egypt, after having a recurring
          dream of finding a treasure there.
        </p>
        <div className="flex items-center justify-between mt-5">
          <div className="text-2xl font-bold">$12.99</div>
          <div className="flex gap-4">
            <button size="lg">Buy Now</button>
            {/* <button variant="outline" size="lg">
              Add to Cart
            </button> */}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="mt-7">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-muted-foreground">
              The Alchemist is a novel by Brazilian author Paulo Coelho that was
              first published in 1988. The story follows a young Andalusian
              shepherd in his journey to the pyramids of Egypt, after having a
              recurring dream of finding a treasure there.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3 mt-3">Details</h2>
            <ul className="grid gap-2 text-muted-foreground">
              <li>
                <span className="font-medium">Publisher:</span> HarperOne
              </li>
              <li>
                <span className="font-medium">Publication Date:</span> April 25,
                1993
              </li>
              <li>
                <span className="font-medium">Language:</span> English
              </li>
              <li>
                <span className="font-medium">Paperback:</span> 208 pages
              </li>
              <li>
                <span className="font-medium">ISBN-10:</span> 0062315005
              </li>
              <li>
                <span className="font-medium">ISBN-13:</span> 978-0062315007
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
