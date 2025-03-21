import express from "express";
import { UserControllers } from "../controllers/controller";
import { verifyJwt } from "../middleware/middleware";

const router = express.Router();

const userController = new UserControllers();

/**
 * @swagger
 * /createuser:
 *   post:
 *     description: Cria um novo usuário
 *     parameters:
 *       - in: body
 *         name: user
 *         description: O usuário a ser criado
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *             - user
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             user:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/createuser", userController.userPost);

/**
 * @swagger
 * /createuser:
 *   get:
 *     description: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/createuser", userController.getAllUser);

/**
 * @swagger
 * /createuser/{id_user}:
 *   get:
 *     description: Retorna um único usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/createuser/:id_user", userController.userGetOne);

/**
 * @swagger
 * /createuser/{id_user}:
 *   put:
 *     description: Modifica os dados de um usuário
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: ID do usuário a ser modificado
 *         schema:
 *           type: integer
 *       - in: body
 *         name: user
 *         description: Dados atualizados do usuário
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             user:
 *               type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/createuser/:id_user", userController.userPut);

/**
 * @swagger
 * /createuser/{id_user}:
 *   delete:
 *     description: Deleta um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id_user
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/createuser/:id_user", userController.userDelete);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Realiza o login de um usuário e retorna um token JWT
 *     parameters:
 *       - in: body
 *         name: login
 *         description: Credenciais de login do usuário
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - user
 *             - password
 *           properties:
 *             user:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *       400:
 *         description: Credenciais inválidas
 */
router.post("/login", userController.userLogin);

export default router;
