import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-5 text-5xl sm:text-6xl">This page has moved on</h1>
      <p className="mt-5 max-w-md text-muted">The page you're looking for doesn't exist or may have been moved.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/" className="btn-primary">
          Back to home
        </Link>
        <Link to="/catalog" className="btn-outline">
          Browse the catalog
        </Link>
      </div>
    </div>
  );
}
