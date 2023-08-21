import styles from '../product.module.css'
import { performRequest } from '@/lib/datocms'
import { Image as DatoImage } from 'react-datocms'
import { Archivo, Bangers } from 'next/font/google'
import Button from '@/app/components/Button'
import Sizes from '../sizes'

const archivoBold = Archivo({
  weight: '600',
  subsets: ['latin']
})

const archivoRegular = Archivo({
  weight: '400',
  subsets: ['latin']
})

const bangers = Bangers({
  weight: '400',
  subsets: ['latin']
})

const productQuery = (productName: string) => `{
  product(filter: { name: {eq: "${productName}"} }) {
    name
    price
    mainImage {
      responsiveImage {
        sizes
        src
        width
        height
        alt
        title
        base64
      }
    }
  }
}`

interface Props {
  params: {
    slug: string
  }
}

const generateMetadata = async ({ params: { slug } }: Props) => {
  const { data: { product } } = await performRequest({query: productQuery(slug)})

  return {
    title: `Happy Feet - ${product.name}`,
    description: 'Buy yourself some socks that rocks.'
  }
}

const ProductPage = async ({ params: { slug } }: Props) => {
  const { data: { product } } = await performRequest({query: productQuery(slug)})

  return (
    <main>
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <DatoImage style={{width: 500, height: 500}} data={product.mainImage.responsiveImage} />
        </div>
        <div className={styles.productContent}>
          <div className={styles.productText}>
            <h1 className={bangers.className}>{product.name}</h1>
            <h2 className={archivoRegular.className}>SEK {product.price}</h2>
          </div>
          <div className={styles.sizes}>
            <h3 className={`${styles.sizesTitle} ${archivoBold.className}`}>Size</h3>
            <Sizes />
          </div>
          <div>
            <Button stretch type="large" color="yellow">Add to cart</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export { generateMetadata }
export default ProductPage
