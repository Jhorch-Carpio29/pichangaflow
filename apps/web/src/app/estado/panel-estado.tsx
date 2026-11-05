"use client";

import { useCallback, useEffect, useState } from "react";
import { Database, Monitor, RefreshCw, Server, type LucideIcon } from "lucide-react";
import type { EstadoSistema } from "@pichangaflow/shared";
import { Aviso } from "@/components/ui/aviso";
import { Boton } from "@/components/ui/boton";
import { Esqueleto } from "@/components/ui/esqueleto";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Tarjeta } from "@/components/ui/tarjeta";
import { pedirEstadoSistema } from "@/lib/api";

type Consulta = { cargando: boolean; resultado: EstadoSistema | null };

type Servicio = { nombre: string; descripcion: string; icono: LucideIcon; operativo: boolean };

function serviciosDe(resultado: EstadoSistema | null): Servicio[] {
  return [
    { nombre: "Front", descripcion: "Páginas y paneles", icono: Monitor, operativo: true },
    { nombre: "Back", descripcion: "Reglas de negocio y datos", icono: Server, operativo: resultado !== null },
    {
      nombre: "Base de datos",
      descripcion: "Base de control",
      icono: Database,
      operativo: resultado?.dependencias.baseDeDatos === "disponible",
    },
  ];
}

export function PanelEstado() {
  const [{ cargando, resultado }, setConsulta] = useState<Consulta>({ cargando: true, resultado: null });

  const comprobar = useCallback(async () => {
    setConsulta((actual) => ({ ...actual, cargando: true }));
    setConsulta({ cargando: false, resultado: await pedirEstadoSistema() });
  }, []);

  useEffect(() => {
    let vigente = true;
    pedirEstadoSistema().then((estado) => {
      if (vigente) setConsulta({ cargando: false, resultado: estado });
    });
    return () => {
      vigente = false;
    };
  }, []);

  return (
    <div className="mt-6 space-y-4">
      {!cargando && resultado === null && (
        <Aviso tono="error" titulo="No pudimos comunicarnos con el back">
          Comprueba que esté encendido y vuelve a intentarlo.
        </Aviso>
      )}
      {!cargando && resultado?.estado === "degradado" && (
        <Aviso tono="aviso" titulo="La base de datos no responde">
          Revisa la conexión en la configuración local y vuelve a comprobar.
        </Aviso>
      )}

      <Tarjeta>
        <ul className="divide-y divide-borde">
          {serviciosDe(resultado).map(({ nombre, descripcion, icono: Icono, operativo }) => (
            <li key={nombre} className="flex items-center gap-4 px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-control bg-marca-suave text-marca">
                <Icono className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-texto">{nombre}</p>
                <p className="truncate text-sm text-texto-suave">{descripcion}</p>
              </div>
              {cargando ? (
                <Esqueleto className="h-6 w-20 rounded-full" />
              ) : (
                <Etiqueta tono={operativo ? "exito" : "error"}>{operativo ? "Operativo" : "Sin respuesta"}</Etiqueta>
              )}
            </li>
          ))}
        </ul>
      </Tarjeta>

      <Boton variante="secundario" cargando={cargando} onClick={comprobar}>
        {!cargando && <RefreshCw />}
        Volver a comprobar
      </Boton>
    </div>
  );
}
