import { CalendarPlus, Inbox } from "lucide-react";
import { Aviso } from "@/components/ui/aviso";
import { Boton } from "@/components/ui/boton";
import { Campo } from "@/components/ui/campo";
import { Dialogo } from "@/components/ui/dialogo";
import { Esqueleto } from "@/components/ui/esqueleto";
import { EstadoVacio } from "@/components/ui/estado-vacio";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Selector } from "@/components/ui/selector";
import { CuerpoTarjeta, EncabezadoTarjeta, Tarjeta } from "@/components/ui/tarjeta";

export function GaleriaComponentes() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Tarjeta>
        <EncabezadoTarjeta titulo="Botones" />
        <CuerpoTarjeta className="flex flex-wrap gap-3">
          <Boton>
            <CalendarPlus />
            Principal
          </Boton>
          <Boton variante="secundario">Secundario</Boton>
          <Boton variante="fantasma">Fantasma</Boton>
          <Boton variante="peligro">Peligro</Boton>
          <Boton cargando>Guardando</Boton>
          <Boton disabled>Deshabilitado</Boton>
        </CuerpoTarjeta>
      </Tarjeta>

      <Tarjeta>
        <EncabezadoTarjeta titulo="Etiquetas de estado" />
        <CuerpoTarjeta className="flex flex-wrap gap-2">
          <Etiqueta tono="exito">Pagado</Etiqueta>
          <Etiqueta tono="aviso">Pendiente</Etiqueta>
          <Etiqueta tono="info">Separado</Etiqueta>
          <Etiqueta tono="error">Cancelado</Etiqueta>
          <Etiqueta>Expirado</Etiqueta>
        </CuerpoTarjeta>
      </Tarjeta>

      <Tarjeta>
        <EncabezadoTarjeta titulo="Formulario" />
        <CuerpoTarjeta className="space-y-4">
          <Campo etiqueta="Nombre de la cancha" placeholder="Cancha 1" ayuda="Se muestra en el mapa." />
          <Campo etiqueta="Precio por hora" defaultValue="abc" error="Escribe un monto válido, por ejemplo 80.00." />
          <Selector
            etiqueta="Tipo de superficie"
            valor="sintetico"
            opciones={[
              { valor: "sintetico", nombre: "Grass sintético" },
              { valor: "losa", nombre: "Losa" },
            ]}
          />
        </CuerpoTarjeta>
      </Tarjeta>

      <Tarjeta>
        <EncabezadoTarjeta titulo="Avisos" />
        <CuerpoTarjeta className="space-y-3">
          <Aviso tono="exito" titulo="Pago confirmado">
            La reserva quedó pagada.
          </Aviso>
          <Aviso tono="aviso" titulo="Stock bajo">
            Quedan 4 unidades de agua de 500 ml.
          </Aviso>
          <Aviso tono="info" titulo="Turno abierto">
            Recuerda cerrar la caja al terminar.
          </Aviso>
        </CuerpoTarjeta>
      </Tarjeta>

      <Tarjeta>
        <EncabezadoTarjeta titulo="Diálogo y carga" />
        <CuerpoTarjeta className="space-y-4">
          <Dialogo
            titulo="Confirmar pago"
            descripcion="Revisa la captura antes de confirmar."
            disparador={<Boton variante="secundario">Abrir diálogo</Boton>}
          >
            <p className="text-sm text-texto">El cambio se verá al instante en todos los paneles.</p>
          </Dialogo>
          <div className="space-y-2">
            <Esqueleto className="h-4 w-2/3" />
            <Esqueleto className="h-4 w-full" />
            <Esqueleto className="h-4 w-1/2" />
          </div>
        </CuerpoTarjeta>
      </Tarjeta>

      <Tarjeta>
        <EstadoVacio
          icono={Inbox}
          titulo="Aún no hay solicitudes"
          descripcion="Cuando un cliente solicite un evento, aparecerá aquí."
          accion={<Boton variante="secundario">Ver calendario</Boton>}
        />
      </Tarjeta>
    </div>
  );
}
