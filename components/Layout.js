import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Wonders of the Planet</span>
              <span>Are you making plans for vacations?</span>
            </h1>
            <h2>Check those places first of all</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 All Wonders in One Place</p>
      </footer>
    </div>
  )
}