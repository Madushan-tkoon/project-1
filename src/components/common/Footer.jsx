import React from 'react';
import { Twitter, Linkedin, Youtube, Instagram, Triangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logoSrc from '../../../public/images/logoWhite.png'

const Footer = () => {
  const navItems = [
    {
      title: 'Product',
      links: [
        { name: 'Our Products', href: '#' },
        { name: 'Caelor for Confluence', href: '#' },
        { name: 'Caelor for Jira', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
  ];

  const contactInfo = {
    address: 'Matrix Office Park, Slavonska avenija 1c, Zagreb 10000, Croatia (Hrvatska)',
    email: 'mtkoon99@gmail.com',
  };

  const socialLinks = [
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];


  return (
    <footer className="bg-neutral-900 text-gray-300 antialiased font-sans p-6 md:p-10 rounded-tr-2xl rounded-tl-2xl md:rounded-none shadow-2xl w-full mx-auto">
      <div className="mx-auto max-w-[1200px]">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-700 pb-6 mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Link href="/" className='w-20 md:w-24'>
              <Image src={logoSrc} alt="Logo" className='ml-[-5px]' />
            </Link>
          </div>
          <p className="text-sm text-gray-400">Smarter collaboration. less effort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {navItems.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-2">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-1 flex flex-col space-y-4">
             <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-2">Contact</h3>
             <address className="not-italic text-sm space-y-2">
                <p className="text-gray-400">{contactInfo.address}</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  {contactInfo.email}
                </a>
             </address>
          </div>

          <div className="md:col-span-2 lg:col-span-1 flex flex-col lg:items-end space-y-6">
             <div className="flex space-x-4">
               {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-neutral-800 text-gray-400 hover:bg-white hover:text-neutral-900 transition duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
               ))}
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-neutral-700">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            All rights reserved 2025 &copy; Madushan Thennakoon
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition duration-200">
              MTKOON
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
