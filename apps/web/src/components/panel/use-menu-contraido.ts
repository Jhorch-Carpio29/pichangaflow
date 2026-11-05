"use client";

import { useCallback, useSyncExternalStore } from "react";

const CLAVE = "pichangaflow:menu-contraido";
const EVENTO = "pichangaflow:menu-contraido-cambio";

function leerPreferencia() {
  try {
    return window.localStorage.getItem(CLAVE) === "si";
  } catch {
    return false;
  }
}

function suscribirse(avisar: () => void) {
  window.addEventListener(EVENTO, avisar);
  return () => window.removeEventListener(EVENTO, avisar);
}

/** Recuerda en el navegador si el menú lateral está contraído. */
export function useMenuContraido() {
  const contraido = useSyncExternalStore(suscribirse, leerPreferencia, () => false);

  const alternar = useCallback(() => {
    try {
      window.localStorage.setItem(CLAVE, leerPreferencia() ? "no" : "si");
    } catch {
      return;
    }
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  return { contraido, alternar };
}
