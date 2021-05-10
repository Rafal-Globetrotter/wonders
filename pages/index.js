import { createClient } from 'contentful';
import Card from '../components/Card';


export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	})

	const res = await client.getEntries({ content_type: 'movies'})

	return {
		props: {
			wonderscontent: res.items
		},
		revalidate: 1
	}
}

export default function Recipes({ wonderscontent }) {
 

  return (
    <div className="wonder-list">
     {wonderscontent.map(wonder => (
    <Card key={wonder.sys.id} wonder={wonder} />
     	))}

     <style jsx>{`
          .wonder-list {
          	display: grid;
          	grid-template-columns: 1fr 1fr;
          	grid-gap: 20px 60px;
          }
     	`}</style>
    </div>
  )
}