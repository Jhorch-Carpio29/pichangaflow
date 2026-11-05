import { VerificadorPostgres } from "./infrastructure/base-de-datos/verificador-postgres";
import { leerCadenaDeConexion, type Entorno } from "./infrastructure/config/entorno";
import { crearApp } from "./interface/http/app";

/** Punto de entrada: aquí se unen las capas. */
export default crearApp<Entorno>({
  verificadorPara: (entorno) => new VerificadorPostgres(leerCadenaDeConexion(entorno)),
});
