import Image from 'next/image'
import zuma from '../../asset/zuma.png'

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <h1 className="text-black font-bold text-xl lg:text-3xl">
          <span className="text-primary flex">
            Shop
            <Image src={zuma} alt="zuma-logo" width={100} height={100} />{' '}
          </span>
        </h1>
        <p className="text-lg leading-5 text-gray-700">
          &copy; 2024 Zuma Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
