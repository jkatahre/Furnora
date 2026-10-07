import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckIcon } from "../components/Icons";
import SmartImage from "../components/SmartImage";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { store } from "../config/store";

export default function About() {
  useEffect(() => {
    document.title = `About us · ${store.name}`;
  }, []);

  return (
    <>
      <section className="container-page grid gap-8 pt-8 md:grid-cols-2 md:items-center md:gap-12 md:pt-12">
        <div>
          <p className="eyebrow">About {store.name}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{store.about.title}</h1>
          <ul className="mt-6 space-y-2 text-lg text-ink-soft">
            {store.about.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="shrink-0 text-success" /> {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/catalog" className="btn-primary">
              See our furniture
            </Link>
            <Link to="/contact" className="btn-outline">
              Visit the showroom
            </Link>
          </div>
        </div>
        <SmartImage src={store.about.image} alt={`Inside ${store.name}`} priority className="aspect-[4/3] rounded-2xl" />
      </section>
      <WhyChooseUs />
    </>
  );
}
