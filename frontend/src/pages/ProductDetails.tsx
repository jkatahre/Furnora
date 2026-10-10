import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DimensionPlan } from "../components/Dimensions";
import { ChevronRightIcon, WhatsAppIcon } from "../components/Icons";
import PriceTag from "../components/PriceTag";
import ProductGallery from "../components/ProductGallery";
import ProductGrid from "../components/ProductGrid";
import ProductInfo from "../components/ProductInfo";
import ProductSpecifications from "../components/ProductSpecifications";
import SectionHeading from "../components/SectionHeading";
import Reviews from "../components/sections/Reviews";
import { EmptyState, ErrorState } from "../components/States";
import { store } from "../config/store";
import { useEnquiry } from "../context/EnquiryContext";
import { useAsync } from "../hooks/useAsync";
import { NotFoundError, productService } from "../services/productService";
import type { Product } from "../types/product";
import { whatsappLink } from "../utils/contact";

export default function ProductDetails() {
  const { slug = "" } = useParams();

  const { data, loading, error, reload } = useAsync(async () => {
    const product = await productService.getProductBySlug(slug);
    const [categories, images, related] = await Promise.all([
      productService.getCategories(),
      productService.getProductImages(product.product_id),
      productService.getRelatedProducts(product, 4),
    ]);
    return { product, categories, images, related };
  }, [slug]);

  useEffect(() => {
    if (data) document.title = `${data.product.name} · ${store.name}`;
  }, [data]);

  if (error instanceof NotFoundError) {
    return (
      <div className="container-page py-16">
        <EmptyState
          title="Product not found"
          message="This piece may have been renamed or sold out."
          action={
            <Link to="/catalog" className="btn-primary">
              See all furniture
            </Link>
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-page py-16">
        <ErrorState onRetry={reload} />
      </div>
    );
  }

  if (loading || !data) return <DetailsSkeleton />;

  const { product, categories, images, related } = data;
  const category = categories.find((c) => c.category_id === product.category_id);

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page hidden pt-5 sm:block">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <Crumb />
          {category && (
            <>
              <li>
                <Link to={`/catalog?category=${category.slug}`} className="hover:text-ink">
                  {category.name}
                </Link>
              </li>
              <Crumb />
            </>
          )}
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="container-page grid grid-cols-1 gap-6 sm:mt-5 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <div className="lg:sticky lg:top-[calc(6rem+var(--credit-h))]">
            <ProductGallery images={images} product={product} />
          </div>
        </div>
        <div className="min-w-0 lg:col-span-5">
          <ProductInfo product={product} category={category} />
        </div>
      </section>

      <section className="container-page mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <ProductSpecifications product={product} category={category} />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <DimensionPlan product={product} label={product.size ?? category?.name ?? "Product"} />
        </div>
      </section>

      <div id="reviews" className="scroll-mt-24">
        <Reviews productSlug={product.slug} title="Customer reviews" />
      </div>

      {related.length > 0 && (
        <section className="container-page mt-10 md:mt-20">
          <SectionHeading title="You may also like" />
          <ProductGrid products={related} />
        </section>
      )}

      <ProductActionBar product={product} />
    </>
  );
}

/** Sticky price + WhatsApp + Enquire on phones. */
function ProductActionBar({ product }: { product: Product }) {
  const enquire = useEnquiry();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="min-w-0 flex-1 [&_p]:text-[11px]">
          <PriceTag product={product} />
        </div>
        <button type="button" onClick={() => enquire({ product })} className="btn-outline px-3 text-sm">
          Enquire
        </button>
        <a href={whatsappLink("price", product)} target="_blank" rel="noopener" className="btn-whatsapp px-3 text-sm">
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </div>
  );
}

function Crumb() {
  return (
    <li aria-hidden="true">
      <ChevronRightIcon width={12} height={12} />
    </li>
  );
}

function DetailsSkeleton() {
  return (
    <div className="container-page pt-6" role="status">
      <span className="sr-only">Loading product…</span>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="skeleton aspect-square sm:aspect-[4/3] lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-10 w-4/5" />
          <div className="skeleton h-9 w-48" />
          <div className="skeleton mt-6 h-40 w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
