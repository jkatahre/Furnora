import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../components/Icons";
import SmartImage from "../components/SmartImage";
import { siteImages } from "../utils/images";

const values = [
  {
    title: "Design with restraint",
    text: "We remove everything that isn't needed, leaving clean lines and proportions that stay relevant for decades.",
  },
  {
    title: "Material honesty",
    text: "Solid oak, sheesham, teak and mango wood, top-grain leather and natural fibres — chosen for how they feel and how they age.",
  },
  {
    title: "Clear information",
    text: "Every piece is listed with full dimensions, weight, materials and warranty, so you can plan with confidence.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About — Furnora";
  }, []);

  return (
    <>
      <section className="container-page pt-12 md:pt-16">
        <p className="eyebrow">About Furnora</p>
        <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-7xl">
          Furniture with a quiet presence and a lasting point of view
        </h1>
      </section>

      <section className="container-page mt-14 md:mt-20">
        <SmartImage
          src={siteImages.about}
          priority
          alt="A dining room furnished with a solid wood table and upholstered chairs"
          className="aspect-[16/10] w-full md:aspect-[21/9]"
          fallbackLabel="The Furnora Studio"
        />
      </section>

      <section className="container-page mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
        <p className="eyebrow md:col-span-3 md:pt-2">Our Story</p>
        <div className="space-y-6 text-lg leading-relaxed text-ink-soft md:col-span-8">
          <p>
            Furnora began with a simple idea: that well-made furniture should be easy to discover and easy to
            understand. Our catalog brings together sofas, beds, tables, storage and seating designed for contemporary
            homes — each one presented with the details that matter.
          </p>
          <p>
            We work with experienced workshops to craft pieces in solid woods and durable upholstery, refining each
            design until it feels effortless. The result is a collection that mixes naturally across rooms and styles.
          </p>
        </div>
      </section>

      <section className="container-page mt-20 md:mt-28">
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {values.map((value, i) => (
            <div key={value.title} className="bg-canvas p-8 sm:p-10">
              <span className="font-display text-xl text-accent-dark">0{i + 1}</span>
              <h2 className="mt-5 text-3xl">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-20 text-center md:mt-28">
        <h2 className="text-4xl sm:text-5xl">See the collection</h2>
        <Link to="/catalog" className="btn-primary mt-8">
          Explore Collection <ArrowRightIcon width={16} height={16} />
        </Link>
      </section>
    </>
  );
}
