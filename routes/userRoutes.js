import express from 'express';
import * as controller from "../controller/userController.js"

const userRoutes=express.Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with validation.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 maxLength: 8
 *                 example: "12345678"
 *               description:
 *                 type: string
 *                 example: "A passionate developer"
 *               role:
 *                 type: string
 *                 example: "creator"
 *               walletAddress:
 *                 type: string
 *                 example: "0x123abc456def"
 *               image:
 *                 type: string
 *                 example: "https://example.com/avatar.png"
 *               facebook:
 *                 type: string
 *                 example: "https://facebook.com/johndoe"
 *               instagram:
 *                 type: string
 *                 example: "https://instagram.com/johndoe"
 *               twitter:
 *                 type: string
 *                 example: "https://twitter.com/johndoe"
 *               youtube:
 *                 type: string
 *                 example: "https://youtube.com/johndoe"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       404:
 *         description: Invalid data
 */
userRoutes.post('/register',controller.registerUser)

export default userRoutes