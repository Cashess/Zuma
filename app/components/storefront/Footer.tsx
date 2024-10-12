import React from 'react';
import Image from 'next/image';
import zuma from '../../asset/zuma.png';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <h1 className="text-black font-bold text-xl lg:text-3xl">
          <span className="text-primary flex">
            <Image src={zuma} alt="zuma-logo" width={100} height={100} />{' '}
            Shop
          </span>
        </h1>
        <p className="text-lg leading-5 text-gray-700">
          &copy; 2024 Zuma Shop. All Rights Reserved.
        </p>

        {/* Footer Links Section */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Link href="/privacy-policies">
            <span className="text-gray-600 hover:text-gray-900">Privacy Policy</span>
          </Link>
          <Link href="/terms-use">
            <span className="text-gray-600 hover:text-gray-900">Terms of Service</span>
          </Link>
          <Link href="/refund-policy">
            <span className="text-gray-600 hover:text-gray-900">Refund Policies</span>
          </Link>
          <Link href="/partners">
            <span className="text-gray-600 hover:text-gray-900">Partners</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-600 hover:text-gray-900">About Us</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-600 hover:text-gray-900">Contact Us</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
