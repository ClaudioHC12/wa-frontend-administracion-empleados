export interface Empleado {
    idEmpleado: number;
    nombre: string;
    email: string;
    fechaNacimiento: string;
    idEstado: number;
    idMunicipio: number;
    fechaRegistro: string;
}

export interface Estado {
    idEstado: number;
    nombre: string;
}

export interface Municipio {
    idMunicipio: number;
    idEstado: number;
    nombre: string;
}