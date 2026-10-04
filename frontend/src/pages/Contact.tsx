import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { MailIcon, PhoneIcon, PinIcon } from "../components/Icons";
import { products } from "../data/products";

/** Replace with the real studio inbox before launch. */
const CONTACT_EMAIL = "hello@furnora.example";

export default function Contact() {
  const [params] = useSearchParams();
  const product = products.find((p) => p.slug === params.get("product"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    product ? `I'd like to know more about the ${product.name} (${product.sku}).` : "",
  );

  useEffect(() => {
    document.title = "Contact — Furnora";
  }, []);

  // No backend yet: hand the enquiry to the visitor's email app.
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = product ? `Enquiry: ${product.name} (${product.sku})` : "Enquiry from furnora website";
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container-page pt-12 md:pt-16">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 text-5xl sm:text-6xl">We'd love to hear from you</h1>
          <p className="mt-6 max-w-md text-muted">
            Questions about a piece, its materials or dimensions? Our design consultants are happy to help.
          </p>

          <ul className="mt-12 space-y-7">
            <ContactItem icon={<MailIcon />} label="Email">
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent-dark">
                {CONTACT_EMAIL}
              </a>
            </ContactItem>
            <ContactItem icon={<PhoneIcon />} label="Phone">
              +91 00000 00000
            </ContactItem>
            <ContactItem icon={<PinIcon />} label="Showroom">
              Showroom address coming soon
            </ContactItem>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface p-6 sm:p-10 lg:col-span-7">
          <h2 className="text-3xl">Send an enquiry</h2>
          {product && (
            <p className="mt-3 text-sm text-muted">
              Regarding <span className="font-semibold text-ink">{product.name}</span> · {product.sku}
            </p>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <input id="name" required className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="field resize-y"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
            Send enquiry
          </button>
          <p className="mt-4 text-xs text-muted">This opens your email app with the message ready to send.</p>
        </form>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 text-accent-dark">{icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
        <p className="mt-1 text-ink">{children}</p>
      </div>
    </li>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
