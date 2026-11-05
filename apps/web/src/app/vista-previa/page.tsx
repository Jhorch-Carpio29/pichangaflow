import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VistaPrevia } from "./vista-previa";

export const metadata: Metadata = {
  title: "Vista previa",
  robots: { index: false },
};

export default function PaginaVistaPrevia() {
  if (process.env.NODE_ENV === "production") notFound();

  return <VistaPrevia />;
}
