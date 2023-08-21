import styles from './products.module.css'
import { ProductType } from './types'
import { Image as DatoImage } from 'react-datocms'

import { Archivo } from 'next/font/google'
import Link from 'next/link'

const archivoRegular = Archivo({
  weight: '400',
  subsets: ['latin']
})

const archivoBold = Archivo({
  weight: '600',
  subsets: ['latin']
})

const Product = ({ product }: { product: ProductType}) => {
  return (
    <Link href={`/product/${product.name}`}>
      <div className={styles.productCard}>
        <div className={styles.productHeader}>
          <DatoImage className={styles.productImage} data={product.mainImage.responsiveImage} />
        </div>
        <div className={styles.productContent} >
          <p className={archivoBold.className}>SEK {product.price}</p>
          <p className={archivoRegular.className}>{product.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default Product
