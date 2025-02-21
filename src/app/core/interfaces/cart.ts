import { Product } from "./product"

export interface Cart {
    _id: string
    cartOwner: string
    products: Product[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}  