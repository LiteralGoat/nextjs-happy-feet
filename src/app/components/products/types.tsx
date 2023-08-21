export interface ProductType {
  name: string,
  price: number,
  mainImage: {
    responsiveImage: {
      sizes: string
      src: string
      width: number
      height: number
      base64: string
    }
  }
}