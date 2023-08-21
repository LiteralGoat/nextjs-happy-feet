import styles from './products.module.css'
import Product from './product'
import { ProductType } from './types'
import { Bangers } from 'next/font/google'
const bangers = Bangers({
  weight: '400',
  subsets: ['latin']
})

const Products = ({products}: {products: ProductType[]}) => {
  return (
    <div id="products" className={styles.productsContainer}>
      <h2 className={`${bangers.className} ${styles.title}`}>Happy collection</h2>
      <div className={styles.products}>
        {products.map((product: ProductType) => {
          return <Product key={product.name} product={product} />
        })}
      </div>
    </div>
  )
}

export default Products
