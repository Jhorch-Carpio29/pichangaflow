/** Puerto para comprobar si la base de datos responde. */
export interface VerificadorBaseDatos {
  estaDisponible(): Promise<boolean>;
}
