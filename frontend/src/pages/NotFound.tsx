import { Link } from "react-router-dom";
import { whatsappLink } from "../utils/contact";
import { WhatsAppIcon } from "../components/Icons";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">We couldn't find that page</h1>
      <p className="mt-4 max-w-md text-muted">It may have moved. Browse our furniture or message us and we'll help.</p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link to="/catalog" className="btn-primary">
          See all furniture
        </Link>
        <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp">
          <WhatsAppIcon /> WhatsApp us
        </a>
      </div>
    </div>
  );
}
