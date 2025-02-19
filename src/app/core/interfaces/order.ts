import { CartItem } from "./cartitem"
import { ShippingAddress } from "./shippingaddress"
import { User } from "./user"

export interface Order {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: User
    cartItems: CartItem[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
  }