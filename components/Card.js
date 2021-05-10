import Link from 'next/link'
import Image from 'next/image'

export default function Card({ wonder }) {
  const { title, slug, distanceFromLondon, thumbnail } = wonder.fields

  return (
    <div className="card">
      <div className="featured">
       <Link href={'/wonders/' + slug}><a>
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={550}
          height={420}
        />
        </a></Link>
      </div>
      <div className="content">
        <div className="info">
          <h4>{ title }</h4>
          <p>{title} is about { distanceFromLondon } from London</p>
        </div>
        <div className="actions">
          <Link href={'/wonders/' + slug}><a>Find out more</a></Link>
        </div>
      </div>
      <style jsx>{`
        .card {
          
           border-radius: 50%;
        }
        .content {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          margin: 0;
          position: relative;
          top: -40px;
          left: -10px;
           border-radius: 5%;
        }
        .info {
          padding: 10px;
        }
        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }
        .info p {
          margin: 0;
          color: #777;
        }
        .actions {
          margin-top: 5px;
          display: flex;
          justify-content: flex-center;
          border-radius: 5%;
        }
        .actions a {
          color: #fff;
          background: #7a49a5;
          padding: 16px 24px;
          text-decoration: none;
          border-radius: 5%;
        }
      `}</style>
    </div>
  )
}