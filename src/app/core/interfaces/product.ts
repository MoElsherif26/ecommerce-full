import { Category } from './category';
import { Subcategory } from './subcategory';
import { Brand } from './brand';

export interface Product {
  sold: number
  count: number
  product: Product
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  isWishlisted: boolean
}
