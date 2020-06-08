import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
      <footer className="app-footer">
        <span className="d-inline-block">Copyright Desalitech &copy; {currentYear}</span>
      </footer>
    );
  }
;

export default Footer;
