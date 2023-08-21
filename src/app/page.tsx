import { toNextMetadata } from 'react-datocms'
import { performRequest } from '@/lib/datocms'
import seoMetaTagsQuery from '@/queries/seoMetaTags';
import pageQuery from '@/queries/pageQuery';
import LandingFrame from './components/landingFrame';
import Products from './components/products';

const generateMetadata = async () => {
  const { data: { page: { _seoMetaTags }}} = await performRequest({query: seoMetaTagsQuery('Collections')});

  return toNextMetadata([..._seoMetaTags])
}

const query = `
{
  allProducts {
    name
    price
    mainImage {
      responsiveImage {
        sizes
        src
        width
        height
        base64
      }
    }
  }
}
`

const Home = async () => {
  const { data: { page } } = await performRequest({
    query: pageQuery('Collections')
  })
  const { data: { allProducts } } = await performRequest({query})

  return (
    <main>
      <LandingFrame image={page.mainImage.responsiveImage} />
      <Products products={allProducts} />
    </main>
  )
}

export { generateMetadata }
export default Home
