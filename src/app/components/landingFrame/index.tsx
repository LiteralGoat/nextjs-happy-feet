import styles from './landingframe.module.css'
import { Bangers } from 'next/font/google'
import Button from '../Button'
import { Image as DatoImage } from 'react-datocms'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin']
})

interface LandingFrameProps {
  image: {
    sizes: string,
    src: string,
    width: number,
    height: number
    alt: null | string,
    title: null | string,
    base64: string
  }
}

const LandingFrame = ({image}: LandingFrameProps) => {
  return (
    <div className={styles.frameContainer}>
      <div className={styles.frameCta} >
        <h1 className={`${bangers.className} ${styles.header}`}>PUT A <span className={styles.smile} >SMILE</span> <br /> ON YOUR FEET</h1>
        <div>
          <Button type="medium" color="blue"> <a href="#products">Shop some socks!</a></Button>
        </div>
      </div>
      <div className={styles.frameImage}>
        <DatoImage data={image} style={{width: 1000, marginTop: '-50%', marginRight: '50%'}} />
      </div>
    </div>
  ) 
}

export default LandingFrame
