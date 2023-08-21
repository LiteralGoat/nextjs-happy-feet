'use client'
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Cart from '../Cart'

import { Archivo_Black, Bangers } from 'next/font/google'

const archivo_black = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
})

const bangers = Bangers({
  weight: '400',
  subsets: ['latin']
})

const links = [
  {
    path: '/',
    name: 'Socks'
  },
  {
    path: '/about',
    name: 'About'
  }
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbarWrapper}>
          <h3 className={`${styles.title} ${bangers.className}`}><Link href="/">happy feet</Link></h3>
          <div className={`${styles.links} ${archivo_black.className}`}>
            {links.map((link) => {
              const isActive = pathname === link.path

              return (
                <Link
                  href={link.path}
                  key={link.name}
                >
                  <span className={`${styles.link} ${isActive ? styles.activeLink : ''}`}>{link.name}</span>
                </Link>
              )
            })}
          </div>
          <div className={styles.cart}>
            <Cart />
          </div>
        </div>
    </nav>  
  )
}

export default Navbar
