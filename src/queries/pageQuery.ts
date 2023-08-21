const pageQuery = (page: string) => {
  return `{
    page(filter: {title: { eq: "${page}" }}) {
      title
      mainImage {
        responsiveImage(imgixParams: { fit: fill, auto: format }) {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
      content {
        value
      }
    }
  }`
}

export default pageQuery
