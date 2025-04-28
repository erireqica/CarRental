import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} AutoRent. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
