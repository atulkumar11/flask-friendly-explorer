
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-lg">Sakha AI</p>
            <p className="text-sm text-gray-600">Your emotionally-aware learning companion</p>
          </div>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary">About</Link>
            <Link to="/" className="text-gray-600 hover:text-primary">Contact</Link>
            <Link to="/" className="text-gray-600 hover:text-primary">Terms</Link>
            <Link to="/" className="text-gray-600 hover:text-primary">Privacy</Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Sakha AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
