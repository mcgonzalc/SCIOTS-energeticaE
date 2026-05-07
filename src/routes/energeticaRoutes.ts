import { Router } from 'express';
import * as energeticaController from '../controllers/energeticaController.js';

const router = Router();

/**
 * @openapi
 * /data:
 *   post:
 *     summary: Receive JSON that acumulates the energy spendings received
 *     tags: [Energética]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c
 *             properties:
 *               c:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Number decrypted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decryptedNumber:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/data', energeticaController.createEnergeticaHandler);

/**
 * @openapi
 * /pubKey:
 *   get:
 *     summary: Get the public key from the company
 *     tags: [Energética]
 *     responses:
 *       200:
 *         description: Public key obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 n:
 *                   type: string
 *                 e:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get('/pubKey', energeticaController.getEnergeticaPublicKeyHandler);

export default router;