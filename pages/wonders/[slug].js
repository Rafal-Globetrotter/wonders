import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Scafold from '../../components/Scafold';
import Link from 'next/link';


const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	})

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: 'movies'
	})

	
const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'movies',
    'fields.slug': params.slug
  })

  if (!items.length) {
 return {
 	redirect: {
 		destination: '/',
 		permanent: false
 	}
 }
  }

  return {
    props: { movie: items[0] },
    revalidate: 10
  }

}


export default function RecipeDetails({ movie }) {
    if (!movie) return <Scafold />

  const { featuredImage, title, distanceFromLondon, countryOfDestination, thingstoknow } = movie.fields
  

  return (
    <div>
      <div className="banner">
      <div className="return">
          <Link href='/'><a>Return to the MainPage</a></Link>
        </div>
        <Image 
          src={'https:' + featuredImage.fields.file.url}
          width={1200}
          height={800}
        />
        <h2>{ title }</h2>
      </div>

      <div className="info">
        <p>{title} is placed { distanceFromLondon } from London</p>
        <h3>The country you need to discover is: {countryOfDestination}</h3>

      </div>
        
      <div className="method">
        <h3>Things you need to know:</h3>
        <div>{documentToReactComponents(thingstoknow)}</div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  )
}