"use client";

import { PantallaMensaje } from "@/components/marca/pantalla-mensaje";
import { Boton } from "@/components/ui/boton";

export default function PaginaError({ retry }: { retry: () => void }) {
  return (
    <PantallaMensaje titulo="Algo salió mal" descripcion="No pudimos mostrar esta página. Vuelve a intentarlo en unos segundos.">
      <Boton onClick={() => retry()}>Volver a intentar</Boton>
    </PantallaMensaje>
  );
}
