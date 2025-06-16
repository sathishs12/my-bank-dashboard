const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p className="text-gray-600">
        © {currentYear} CBU-Bank. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;