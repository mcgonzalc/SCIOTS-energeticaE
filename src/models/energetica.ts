import mongoose, {Schema, model, Types} from "mongoose"

export const energeticaSchema = new Schema<IEnergetica>({
    c: { 
        type: Number, 
        required: true
    },
});

export interface IEnergetica {
    c: number;
}

const EnergeticaModel = mongoose.model('Energetica',energeticaSchema);
export default EnergeticaModel;