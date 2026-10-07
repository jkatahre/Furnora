import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../components/Icons";
import CustomFurniture from "../components/sections/CustomFurniture";
import Reviews from "../components/sections/Reviews";
import { store } from "../config/store";

export default function CustomFurniturePage() {
  useEffect(() => {
    document.title = `Custom furniture · ${store.name}`;
  }, []);

  const { custom, policies } = store;
  return (
    <>
      <div className="-mt-8 md:-mt-12">
        <CustomFurniture heading="h1" />
      </div>

      <section className="container-page mt-14 grid gap-10 md:mt-20 md:grid-cols-2">
        <div>
          <h2 className="section-title">What we make to order</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {custom.examples.map((item) => (
              <li key={item} className="flex min-h-12 items-center gap-2 rounded-lg bg-surface px-4 font-semibold">
                <CheckIcon width={18} height={18} className="text-success" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-title">What you can change</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {policies.customisationOptions.map((item) => (
              <li key={item} className="flex min-h-12 items-center gap-2 rounded-lg bg-brand-soft px-4 font-semibold text-brand-dark">
                <CheckIcon width={18} height={18} /> {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-muted">
            Want to see fabrics and wood finishes first?{" "}
            <Link to="/contact" className="font-semibold text-brand underline underline-offset-4">
              Visit our showroom
            </Link>
            .
          </p>
        </div>
      </section>

      <Reviews />
    </>
  );
}
