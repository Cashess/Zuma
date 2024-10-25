import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex justify-center'>
   
      <div>
        <Link href={"/profile/deposit/1/purchase/amount"} className='button text-yellow-800 border-black text-center bg-black p-2 font-bold rounded-2xl'>
        fund
        </Link>
      </div>
    </div>
  )
}
 