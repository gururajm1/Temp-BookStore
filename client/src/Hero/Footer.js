import React from "react";

const Footer = () => {
  return (
    <div className="mt-[-40px] bg-zinc-400 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-xl font-bold mb-4">Insurance Co.</h4>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-4">About Us</h6>
            <ul className="text-gray-600">
              <li className="mb-2">Our Company</li>
              <li className="mb-2">Our Team</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Contact Us</li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-4">Insurance Services</h6>
            <ul className="text-gray-600">
              <li className="mb-2">Life Insurance</li>
              <li className="mb-2">Health Insurance</li>
              <li className="mb-2">Car Insurance</li>
              <li className="mb-2">Home Insurance</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <p className="text-gray-600 mb-2">
              123 Insurance Street, City, Country
            </p>
            <p className="text-gray-600 mb-2">Email: info@insuranceco.com</p>
            <p className="text-gray-600 mb-2">Phone: +1 234 5678</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
