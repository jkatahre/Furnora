import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "../components/Icons";
import ProductGallery from "../components/ProductGallery";
import ProductGrid from "../components/ProductGrid";
import ProductInfo from "../components/ProductInfo";
import ProductSpecifications from "../components/ProductSpecifications";
import SectionHeading from "../components/SectionHeading";
import { EmptyState, ErrorState } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { NotFoundError, productService } from "../services/productService";

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
    if (data) document.title = `${data.product.name} — Furnora`;
  }, [data]);

  if (error instanceof NotFoundError) {
    return (
      <div className="container-page py-20">
        <EmptyState
          title="Product not found"
          message="This piece may have been renamed or removed from the catalog."
          action={
            <Link to="/catalog" className="btn-primary">
              Browse the catalog
            </Link>
          }
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-page py-20">
        <ErrorState onRetry={reload} />
      </div>
    );
  }

  if (loading || !data) return <DetailsSkeleton />;

  const { product, categories, images, related } = data;
  const category = categories.find((c) => c.category_id === product.category_id);

  return (
    <>
      <nav aria-label="Breadcrumb" className="container-page pt-6 md:pt-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <li>
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <Crumb />
          <li>
            <Link to="/catalog" className="hover:text-ink">
              Catalog
            </Link>
          </li>
          {category && (
            <>
              <Crumb />
              <li>
                <Link to={`/catalog?category=${category.slug}`} className="hover:text-ink">
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <Crumb />
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="container-page mt-6 grid gap-10 md:mt-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <ProductGallery images={images} productName={product.name} />
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <ProductInfo product={product} category={category} />
          </div>
        </div>
      </section>

      <section id="specifications" className="container-page mt-24 scroll-mt-24 md:mt-32">
        <SectionHeading eyebrow="Product Information" title="Specifications" />
        <ProductSpecifications product={product} category={category} />
      </section>

      {related.length > 0 && (
        <section className="container-page mt-24 md:mt-32">
          <SectionHeading
            eyebrow="Similar Pieces"
            title="You May Also Like"
            description={`Designs that share the category, style or material of the ${product.name}.`}
          />
          <ProductGrid products={related} categories={categories} />
        </section>
      )}
    </>
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
    <div className="container-page pt-8" role="status">
      <span className="sr-only">Loading product…</span>
      <div className="skeleton h-3 w-64" />
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="skeleton aspect-[4/3] lg:col-span-7" />
        <div className="space-y-4 lg:col-span-5">
          <div className="skeleton h-3 w-28" />
          <div className="skeleton h-12 w-4/5" />
          <div className="skeleton h-3 w-32" />
          <div className="skeleton mt-8 h-9 w-48" />
          <div className="skeleton mt-8 h-24 w-full" />
          <div className="skeleton mt-8 h-20 w-full" />
        </div>
      </div>
    </div>
  );
}
