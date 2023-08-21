'use client'
import styles from './product.module.css'
import { useState } from 'react'
import SizeButton from './sizeButton'

// TODO: makes this dynamic from DatoCMS
const sizes = ['xs', 's', 'm', 'l', 'xl']

const Sizes = () => {
  const [chosenSize, setChosenSize] = useState<string>('m')

  return (
    <div className={styles.sizesOptions}>
      {sizes.map((size: string) => <SizeButton onClick={() => setChosenSize(size)} active={chosenSize === size} key={size}>{size}</SizeButton>)}
    </div>
  )
}

export default Sizes
