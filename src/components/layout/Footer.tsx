// src/components/layout/Footer.tsx

import { Instagram, MessageCircle } from 'lucide-react'; // We'll use MessageCircle for WhatsApp

// A simple component for the TikTok Icon since it's not in the default library
const TikTokIcon = () => (
  <svg
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12 20a8.5 8.5 0 0 1-7.1-3.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 4.5-7.6V11a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V4a8.5 8.5 0 0 1 4.5 7.5z" />
  </svg>
);


export default function Footer() {
  const socialLinks = [
    {
      name: 'TikTok',
      icon: <TikTokIcon />,
      href: 'https://www.tiktok.com/@aesha_alagbo?_r=1&_d=e8m9i9mdk9h74c&sec_uid=MS4wLjABAAAA02HX-XlU9RtHNQSR67z8WF9F0DSJWORxYeayLLXjDvC2Jn7dXxEbhZzrSWXpiI8p&share_author_id=7445750986294346758&sharer_language=en&source=h5_m&u_code=didgcmga3b75l0&ug_btm=b2001,b5836&sec_user_id=MS4wLjABAAAA3slK7mzaZura3FQwpG1rmm7g5twXu9IFnLFAW9MM22B9ZwNPm-4dCjXxJFw_XGmZ&utm_source=copy&social_share_type=5&utm_campaign=client_share&utm_medium=ios&tt_from=copy&user_id=6960008688636396549&enable_checksum=1&share_link_id=D7A37395-3D35-41BF-8BE3-A1F244DA63A1&share_app_id=1233',
    },
    {
      name: 'Instagram',
      icon: <Instagram />,
      href: 'https://www.instagram.com/aish_naturaleaf_herbs?igsh=MTNjNjMzd2VzMHdjMA==',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle />,
      href: 'https://wa.me/2347025690600', // Using the direct WhatsApp chat link format
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} AISH NATURALEAF HERBS</p>
          <p>All Rights Reserved.</p>
        </div>
        <div className="flex justify-center items-center space-x-6 mt-4 md:mt-0">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="hover:text-green-400 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}