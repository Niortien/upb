import Image from "next/image";

export function CampusSection() {
  return (
    <section className="py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold">Un Campus Moderne</h2>
        <p className="text-gray-600 mt-4">
          Notre campus offre un cadre idéal pour apprendre : bâtiments modernes,
          laboratoires innovants, bibliothèque numérique et espaces de coworking.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Image
          src="/images/campus1.jpg"
          alt="Campus 1"
          width={300}
          height={200}
          className="rounded-xl object-cover"
        />
        <Image
          src="/images/campus2.jpg"
          alt="Campus 2"
          width={300}
          height={200}
          className="rounded-xl object-cover"
        />
      </div>
    </section>
  );
}