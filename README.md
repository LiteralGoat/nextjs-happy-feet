This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Description
The task is to create an e-commerce website with a headless CMS. The choice for this project is DatoCMS.
### Has to be included 
- [x] Use Next.js (https://nextjs.org/)
- [x] Use a headless CMS
- [x] The website should contain at least one editorial page (/about)
- [x] The website should contain at least one product list page (/)
- [x] The website should contain product pages (/product/[slug])

### Extras
- [ ] Create a shopping cart with state management, e.g. Redux (https://redux.js.org/)
- [ ] Create a checkout with the ability to buy (suffices with a buy button that shows the next step)
- [ ] Create a confirmation page that shows after you finish a purchase

## How it went

### Time Limit and Fun
I knew from the start that the time I would have for this would be severely limited. Furthermore, there were some incidents during the week that further limited the time I had to spend on this project. Therefore I wanted to make it both interesting and productive as this was my only free time. To do this I started out with a figma design instead of using one of the finished templates provided by DatoCMS or Next.

The design can be found [here](https://www.figma.com/file/x7y4GnaBV1EEVPTqowhLMy/happy-feet?type=design&node-id=0%3A1&mode=design&t=nUxQpRvxFYfFG9Ij-1)

A flaw in the design is that I should have started mobile first as this is something that fell behind in the finished product.

### Initial Setup
The next step was to get the Next.js project up and running. I used the getting started guide at https://nextjs.org/ and the integration guide
provided by DatoCMS at https://www.datocms.com/docs/next-js.

Then I abstracted the queries into a separate folder as it was a repeating pattern. However, for the product page I used a custom query specifically for the product.

The DatoCMS api functionality:
```typescript
// Create a datocms helper in /lib/datocms.ts
export const performRequest = async ({ query, variables = {}, includeDrafts = false }: { query: string, variables?: object, includeDrafts?: boolean }) => {
  const response = await fetch("https://graphql.datocms.com/", {
    headers: {
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    method: "POST",
    body: JSON.stringify({ query, variables }),
  });
  
  const responseBody = await response.json();
  
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }
  
  return responseBody;
}

// Create the pageQuery function in /queries/pageQuery.ts
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

// Fetching the page data in a page.tsx file
const { data: { page } } = await performRequest({
  query: pageQuery('Page')
})
```

### The Meat
After getting the initial structure I went on to create the product listing and about page. I became lazy with the about and just added the StructuredText component from DatoCMS with the content feature they have:

```html
<StructuredText data={page.content} />
```

To display images from DatoCMS I used their Image component:
```html
<DatoImage data={image} />
```
The query for the data in the component was the following
```graphql
query page {
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
}
```

### Dynamic Metadata from DatoCMS
In order to create dynamic SEO content from DatoCMS I used their `toNextMetadata` and `seoMetaTagsQuery` functionality. It was rather easy to setup:
```typescript
const generateMetadata = async () => {
  // Grab the SEO meta tags from DatoCMS
  const { data: { page: { _seoMetaTags }}} = await performRequest({query: seoMetaTagsQuery('Collections')});

  // Use their toNextMetadata function to format the SEO content.
  return toNextMetadata([..._seoMetaTags])
}

export { generateMetadata }
```

### Checkout functionality
To be done...