export interface Solicitud {
    idSolicitud: number;
    nombreProducto: string;
    peso: number;
    dimensiones: string;
    fechaPeticion: Date;
    calibre: string;
    composicion: string;
    estado: string;
    fechaRecepcion: Date;
    fechaCreacion: Date;
    usuarioCreador: string;
    fechaActualizacion: Date;
    usuarioActualizador: string;
    fechaEliminacion: Date;
    eliminarFlag: boolean;
    usuarioEliminador: string;
    idFabrica: number;
    idProveedor: number;
  }
  