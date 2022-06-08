export class Company{
    constructor(
        public imagen:string,
        public nombre:string,
        public rut:string,
        public presupuestoPesos:string[],
        public presupuestoUF:string[],
        public tipoDeMonedaPeso:string,
        public tipoDeMonedaUF:string,
        public montoMaximoPeso:string,
        public montoMaximoUF:string
    ){}
}