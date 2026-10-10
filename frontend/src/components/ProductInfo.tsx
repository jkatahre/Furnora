import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { store } from "../config/store";
import { useEnquiry } from "../context/EnquiryContext";
import type { Category, Product } from "../types/product";
import { openStatus, telUrl, whatsappLink } from "../utils/contact";
import { formatPrice, inShowroom, isCustomisable, leadTime, priceMode, showsPrice, statusLabels, toInches } from "../utils/format";
import { CheckIcon, LeafIcon, PaletteIcon, PhoneIcon, RulerIcon, ShieldIcon, StoreIcon, ToolsIcon, TruckIcon, WhatsAppIcon } from "./Icons";
import PriceTag from "./PriceTag";
import { Stars } from "./Rating";

interface ProductInfoProps {
  product: Product;
  category?: Category;
}

/** Name, price and the answers to "what size, what material, when, can I customise it, where can I see it". */
export default function ProductInfo({ product, category }: ProductInfoProps) {
  const enquire = useEnquiry();
  const reviews = store.reviews.filter((r) => r.productSlug === product.slug);
  const available = product.status === "active";
  const fixedPrice = showsPrice(product) && priceMode(product) === "fixed";
  const u = product.dimension_unit;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        {category && (
          <Link to={`/catalog?category=${category.slug}`} className="font-semibold text-brand hover:text-brand-dark">
            {category.name}
          </Link>
        )}
        {reviews.length > 0 && (
          <a href="#reviews" className="flex items-center gap-1.5 text-muted">
            <Stars value={reviews.reduce((s, r) => s + r.rating, 0) / reviews.length} size={14} />
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </a>
        )}
      </div>

      <h1 className="mt-1.5 text-[1.45rem] leading-tight sm:mt-2 sm:text-4xl">{product.name}</h1>

      <div className="mt-4">
        <PriceTag product={product} size="lg" details />
      </div>

      {!available && <p className="mt-3 rounded-lg bg-warning/10 px-3 py-2 text-sm font-semibold text-warning">{statusLabels[product.status]}: ask us for similar designs</p>}

      {/* Key facts */}
      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
        <Fact icon={<RulerIcon />} label="Size (W × D × H)">
          {toInches(product.width, u)}" × {toInches(product.depth, u)}" × {toInches(product.height, u)}"
          <span className="block text-xs font-normal text-muted">
            {product.width} × {product.depth} × {product.height} {u}
          </span>
        </Fact>
        <Fact icon={<LeafIcon />} label="Material">
          {product.material}
        </Fact>
        <Fact icon={<TruckIcon />} label="Delivery">
          {leadTime(product)}
        </Fact>
        <Fact icon={<ToolsIcon />} label="Installation">
          {store.policies.installation.split(" by ")[0]}
        </Fact>
        <Fact icon={<ShieldIcon />} label="Warranty">
          {product.warranty}
        </Fact>
        <Fact icon={<PaletteIcon />} label="Customisable">
          {isCustomisable(product) ? "Yes: size, fabric, finish" : "No"}
        </Fact>
      </dl>

      {product.colors && product.colors.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-semibold">Colour</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <li key={c} className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 text-sm">
                <span className="h-6 w-6 rounded-full border border-ink/10" style={{ background: store.colours[c] ?? "#ccc" }} aria-hidden="true" />
                {c}
              </li>
            ))}
            {isCustomisable(product) && (
              <li>
                <button type="button" onClick={() => enquire({ intent: "custom", product })} className="flex min-h-8 items-center rounded-full border border-dashed border-ink/30 px-3 text-sm text-ink-soft hover:border-ink">
                  + Other colours
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      <DeliveryCheck />

      {/* Actions */}
      <div className="mt-6 space-y-3">
        {product.buy_url && available && (
          <a href={product.buy_url} target="_blank" rel="noopener" className="btn-dark w-full">
            Buy now
          </a>
        )}
        <a href={whatsappLink(fixedPrice && !store.pricing.bestPriceButton ? "product" : "price", product)} target="_blank" rel="noopener" className="btn-whatsapp w-full text-base">
          <WhatsAppIcon width={22} height={22} /> {fixedPrice ? (store.pricing.bestPriceButton ? "Get best price on WhatsApp" : "Enquire on WhatsApp") : "Get price on WhatsApp"}
        </a>
        <div className="grid grid-cols-2 gap-3">
          <a href={telUrl} className="btn-outline">
            <PhoneIcon width={18} height={18} /> Call store
          </a>
          <button type="button" onClick={() => enquire({ product })} className="btn-outline">
            Enquire now
          </button>
        </div>
        {isCustomisable(product) && (
          <button type="button" onClick={() => enquire({ intent: "custom", product })} className="btn w-full bg-brand-soft text-brand-dark hover:bg-brand-soft/70">
            <RulerIcon width={18} height={18} /> Need a different size? Request customisation
          </button>
        )}
      </div>

      {inShowroom(product) && <ShowroomNote />}
    </div>
  );
}

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-2.5 bg-canvas p-3 sm:p-4">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-brand">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-muted">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold leading-snug">{children}</dd>
      </div>
    </div>
  );
}

/** Pick a city, see the delivery charge and time. */
function DeliveryCheck() {
  const areas = store.deliveryAreas;
  const [city, setCity] = useState(areas[0]?.city ?? "");
  const area = areas.find((a) => a.city === city);
  if (areas.length === 0) return null;
  return (
    <div className="mt-5 rounded-xl bg-surface p-4">
      <label className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <TruckIcon width={18} height={18} className="text-brand" /> Deliver to
        </span>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="min-h-11 flex-1 rounded-lg border border-line bg-canvas px-3 text-[15px] font-semibold">
          {areas.map((a) => (
            <option key={a.city}>{a.city}</option>
          ))}
          <option value="">Other city</option>
        </select>
      </label>
      <p className="mt-2 text-sm" aria-live="polite">
        {area ? (
          <>
            <span className={area.fee === 0 ? "font-semibold text-success" : "font-semibold"}>
              {area.fee === 0 ? "Free delivery" : `Delivery ${formatPrice(area.fee)}`}
            </span>{" "}
            · {area.time} · {store.policies.installation.toLowerCase().startsWith("free") ? "free installation" : "installation available"}
          </>
        ) : (
          <span className="text-muted">{store.deliveryNote}. WhatsApp us for a quote.</span>
        )}
      </p>
    </div>
  );
}

function ShowroomNote() {
  const status = openStatus();
  return (
    <Link to="/contact#showroom" className="mt-5 flex items-center gap-3 rounded-xl border border-line p-4 hover:border-ink/30">
      <StoreIcon className="shrink-0 text-brand" width={26} height={26} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">See it at our showroom</span>
        <span className="block truncate text-[13px] text-muted">
          {store.showroom.addressLines[0]} · <span className={status.open ? "text-success" : ""}>{status.label}</span>
        </span>
      </span>
      <CheckIcon className="shrink-0 text-success" />
    </Link>
  );
}
