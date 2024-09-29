export type Cart = {
  userId: string
  items: Array<{
    id: string
    name: string
    priceStat: number
    quantity: number
    imageString: string
  }>
}
