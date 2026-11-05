"use client";

import { useState } from "react";
import { PlantillaPanel } from "@/components/panel/plantilla-panel";
import { Selector } from "@/components/ui/selector";
import { Pestanas } from "@/components/ui/pestanas";
import { Etiqueta } from "@/components/ui/etiqueta";
import { MENUS, ROLES, type Rol } from "@/config/menus";
import { GaleriaComponentes } from "./galeria-componentes";
import { ResumenEjemplo } from "./resumen-ejemplo";

const opcionesDeRol = ROLES.map((rol) => ({ valor: rol, nombre: MENUS[rol].nombreRol }));

function primeraOpcion(rol: Rol) {
  const opcion = MENUS[rol].grupos[0]?.opciones[0];
  return { destino: opcion?.destino ?? "", nombre: opcion?.nombre ?? "" };
}

export function VistaPrevia() {
  const [rol, setRol] = useState<Rol>("admin-empresa");
  const [opcion, setOpcion] = useState(() => primeraOpcion("admin-empresa"));

  function cambiarRol(valor: string) {
    const nuevoRol = valor as Rol;
    setRol(nuevoRol);
    setOpcion(primeraOpcion(nuevoRol));
  }

  return (
    <PlantillaPanel
      menu={MENUS[rol]}
      rutaActual={opcion.destino}
      titulo={opcion.nombre}
      usuario={{ nombre: "Usuario Ejemplo", detalle: MENUS[rol].nombreRol }}
      alElegir={({ destino, nombre }, evento) => {
        evento.preventDefault();
        setOpcion({ destino, nombre });
      }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Etiqueta tono="aviso">Datos de ejemplo</Etiqueta>
          <p className="text-sm text-texto-suave">Vista solo para desarrollo. No aparece en producción.</p>
        </div>
        <Selector
          etiqueta="Rol de la vista previa"
          etiquetaOculta
          opciones={opcionesDeRol}
          valor={rol}
          alCambiar={cambiarRol}
          className="w-full sm:w-52"
        />
      </div>
      <Pestanas
        etiqueta="Secciones de la vista previa"
        pestanas={[
          { valor: "resumen", nombre: "Pantalla de ejemplo", contenido: <ResumenEjemplo /> },
          { valor: "componentes", nombre: "Componentes", contenido: <GaleriaComponentes /> },
        ]}
      />
    </PlantillaPanel>
  );
}
