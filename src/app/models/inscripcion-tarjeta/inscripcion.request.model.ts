import { PersonalData } from "../personal-data/personal-data.model";
import { AmountPayable } from "../amount-payable/amount-payable.model";
import { PaymentModel } from "../payment-model/payment-model.model";

export class InscripcionTarjeta{
    constructor(
        public personalData:PersonalData,
        public monto:AmountPayable,
        public modeloPago:PaymentModel
    ){}
    
}