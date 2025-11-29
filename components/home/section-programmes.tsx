import Link from "next/link";

export function SectionProgrammes() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold">Nos Programmes Académiques</h2>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto">
        Découvrez nos formations modernes adaptées aux métiers du futur.
      </p>
      <Link
        href="/formations"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
      >
        Voir les programmes
      </Link>
    </section>
  );
}
