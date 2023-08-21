const seoMetaTagsQuery = (page: string) => {
  return `{
    page(filter: {title: { eq: "${page}" }}) {
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }`
}

export default seoMetaTagsQuery
