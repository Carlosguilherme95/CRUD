import express from "express";
import { UserControllers } from "../controllers/controller";
import { verifyJwt } from "../middleware/middleware";

const router = express.Router();

const userController = new UserControllers();

router.post("/createuser", userController.userPost);
router.get("/createuser", verifyJwt, userController.userGet);
router.get("/createuser/:id_user", userController.userGetOne);
router.put("/createuser/:id_user", userController.userPut);
router.delete("/createuser/:id_user", userController.userDelete);

router.post("/login", userController.userLogin);

export default router;
