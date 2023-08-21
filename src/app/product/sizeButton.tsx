import styles from './product.module.css'

import { Archivo } from 'next/font/google'

const archivo = Archivo({
  weight: '400',
  subsets: ['latin']
})

const SizeButton = ({active, children, onClick}: { active: boolean, children: string, onClick?: () => void }) => {
  return <button onClick={onClick} className={`${styles.sizeButton} ${archivo.className} ${active ? styles.active : ''}`}>{children}</button>
}

export default SizeButton
