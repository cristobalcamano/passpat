export class Company{
    constructor(
        public imagen:string,
        public nombre:string,
        public rut:string,
        public presupuesto:string[],
        public presupuestoUF:string[],
        public tipoDeMonedaPeso:string,
        public tipoDeMonedaUF:string
    ){}
}