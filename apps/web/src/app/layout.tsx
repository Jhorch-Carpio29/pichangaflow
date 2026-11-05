import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const fuenteTexto = Inter({ variable: "--fuente-texto", subsets: ["latin"] });
const fuenteTitulo = Sora({ variable: "--fuente-titulo", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "PichangaFlow", template: "%s · PichangaFlow" },
  description: "Gestiona reservas, pagos, tienda y eventos de tu complejo deportivo en un solo lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${fuenteTexto.variable} ${fuenteTitulo.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
