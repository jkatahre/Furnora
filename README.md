# Furnora

A premium furniture catalog website for browsing, searching, filtering and exploring furniture products.
It is a catalog only: there is no cart, checkout or user accounts.

## Structure

```
frontend/   React + TypeScript + Tailwind CSS + React Router
backend/    API server (placeholder for now)
```

### Frontend (`frontend/src`)

| Folder | Contents |
| --- | --- |
| `pages/` | Home, Catalog, ProductDetails, Categories, About, Contact, NotFound |
| `components/` | Header, Footer, ProductCard, ProductGrid, ProductGallery, ProductInfo, ProductSpecifications, CategoryCard, SearchBar, FilterPanel, SortDropdown, … |
| `layouts/` | Shared page layout (header, footer, skip link) |
| `services/` | `productService`: async data access, ready to point at the backend API |
| `data/` | Products (162), categories (15) and which photo belongs to which product |
| `types/` | `Product`, `Category`, `ProductImage` and filter types |
| `hooks/` | `useAsync` (loading/error state), `useCatalogFilters` (filters stored in the URL) |
| `utils/` | Price/dimension formatting, filtering, sorting, related products, image paths |

## Images

All images are `.webp` files in `frontend/public/images/`. See
[`frontend/public/images/README.md`](frontend/public/images/README.md) for the exact file names.
Missing images show a neutral placeholder.

## Getting started

```bash
npm install
npm run dev:frontend    # http://localhost:5173
```

Production build: `npm run build --workspace frontend`
