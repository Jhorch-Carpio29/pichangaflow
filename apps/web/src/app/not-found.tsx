import type { Metadata } from "next";
import Link from "next/link";
import { PantallaMensaje } from "@/components/marca/pantalla-mensaje";
import { Boton } from "@/components/ui/boton";

export const metadata: Metadata = { title: "Página no encontrada" };

export default function NoEncontrado() {
  return (
    <PantallaMensaje titulo="No encontramos esta página" descripcion="Es posible que el enlace haya cambiado o que ya no exista.">
      <Boton comoHijo>
        <Link href="/">Volver al inicio</Link>
      </Boton>
    </PantallaMensaje>
  );
}
