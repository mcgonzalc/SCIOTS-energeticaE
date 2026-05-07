import { Request, Response } from 'express';
import { createEnergetica } from "../services/energeticaService.js";
import { publicKey, privateKey } from "../utils/keyGenerator.js";
import * as rsa from "../middleware/rsa.js";

export const getDataAgregadorHandler = async (req: Request, res: Response) => {
    try {
        const encryptedC = BigInt(req.body.c);
        const decryptedC = privateKey.decrypt(encryptedC);
        const newEnergetica = await createEnergetica({ c: decryptedC });
        res.status(201).json(newEnergetica);
    } catch (error) {
        res.status(500).json({ message: 'Error creating energetica', error });
    }
};

export const getEnergeticaPublicKeyHandler = async (req: Request, res: Response): Promise<any> => {
    try {
        const energeticaKeyPair = rsa.generateKeyPair(2048);
        res.status(200).json( { n: energeticaKeyPair.publicKey.n.toString(), e: energeticaKeyPair.publicKey.e.toString() } );
    } catch (error) {
        res.status(500).json({ message: 'Error obtaining the public key', error });
    }
};