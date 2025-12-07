
import FiliereHeader from "@/components/formation/filiere-header";
import { programmes } from "@/data/programme.data";

interface ProductPageProps {
  params: Promise<{
    id: string; // Updated: params is now a Promise
  }>;
}

export default async function FormationPage({ params }: ProductPageProps) {
  // 1. Await the params object before destructuring
  const { id } = await params; 
  
  console.log(id);

  const filiere = programmes.find((item) => item.id == Number(id));
  console.log('la filiere est ', filiere);

  // Si la filière n’existe pas
  if (!filiere) {
    return (
      <div className="w-full py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Filière non trouvée</h1>
        <p className="text-gray-500">Cette filière n’existe pas ou a été supprimée.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xlxl mx-auto py-10 px-6">
      <FiliereHeader programme={filiere} />
      {/* Tu peux ajouter ici les sections Débouchés / Contenu / Évolution */}
    </div>
  );
}