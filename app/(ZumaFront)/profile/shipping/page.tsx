import React from 'react'
import { ShippingDetails } from './UserProfileRoute'

export default function shippingDetails() {
  return (
    <div>
        <ShippingDetails data={{
        id: '',
        line1: '',
        line2: undefined,
        city: '',
        state: '',
        postal_code: '',
        country: '',
        userId: ''
      }} />
    </div>
  )
}
