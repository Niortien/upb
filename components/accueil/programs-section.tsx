"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { programmes } from "@/data/programme.data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ------------------------
// INTERFACE
// ------------------------
export interface Programme {
  id: number;
  niveau: "licence" | "master" | "doctorat";
  title: string;
  description: string;
  img: string;
  debouche?: string[];
  contenu?: string[];
  evolution?: string[];
}

// ------------------------
// TABLEAU UNIQUE
// ------------------------

// ------------------------
// COMPONENT
// ------------------------
const ProgrammesPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Programme | null>(null);

  const openDialog = (prog: Programme) => {
    setSelected(prog);
    setOpen(true);
  };

  const renderSection = (title: string, niveau: Programme["niveau"]) => {
    const items = programmes.filter((p) => p.niveau === niveau);

    return (
      <section className="mt-16">
        
        <h2 className="text-3xl font-bold mb-6">{title}</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 italic">Pas encore disponible</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {items.map((prog) => (
              <Card key={prog.id} className="overflow-hidden p-0 shadow-lg">
                <Image
                  src={prog.img}
                  width={500}
                  height={300}
                  alt={prog.title}
                  className="w-full h-48 object-cover"
                />

                <CardHeader className="pt-0 px-4 pb-2 font-bold">
                  <CardTitle>{prog.title}</CardTitle>
                </CardHeader>

                <CardContent className="px-4 pb-4">
                  <p className="text-gray-700 line-clamp-3">
                    {prog.description}
                  </p>

                  <Button
                    className="mt-4 w-full"
                    onClick={() => router.push(`/formation-detail/${prog.id}`)}
                  >
                    En savoir plus 
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="w-full py-10 px-6 md:px-20">
      {renderSection("Programmes Licence", "licence")}
      {renderSection("Programmes Master", "master")}
      {renderSection("Programmes Doctorat", "doctorat")}

      {/* DIALOG */}
    </div>
  );
};

export default ProgrammesPage;
