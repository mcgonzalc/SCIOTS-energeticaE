import Energetica from "../models/energetica.js";

export const createEnergetica = async (energeticaData: { c: bigint }) => {
    const newEnergetica = new Energetica({ c: energeticaData.c.toString() });
    return await newEnergetica.save();
};