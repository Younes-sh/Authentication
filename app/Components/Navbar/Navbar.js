import Link from "next/link";

export default function Navbar () {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" href="/">Navbar</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" href="/">Home</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/product">Product</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div>
          <Link href='/auth/register'>Register</Link>
        </div>
      </div>
    </nav>
  )
}