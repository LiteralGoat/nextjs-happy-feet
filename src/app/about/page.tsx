import styles from './about.module.css'
import { StructuredText, Image as DatoImage, toNextMetadata } from "react-datocms";
import { performRequest } from '@/lib/datocms'
import pageQuery from '@/queries/pageQuery';
import { Archivo } from 'next/font/google';
import seoMetaTagsQuery from '@/queries/seoMetaTags';
const archivo = Archivo({
  weight: ['400', '600'],
  subsets: ['latin']
})

const generateMetadata = async () => {
  const { data: { page: { _seoMetaTags }}} = await performRequest({query: seoMetaTagsQuery('About')});

  return toNextMetadata([..._seoMetaTags])
}

const About = async () => {
  const { data: { page } } = await performRequest({query: pageQuery('About')})

  return (
    <main className={`${archivo.className}`}>
      <DatoImage data={page.mainImage.responsiveImage} />
      <div className={styles.aboutContent}>
        <StructuredText data={page.content} />
      </div>
    </main>
  )
}

export { generateMetadata }
export default About
