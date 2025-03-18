import express from "express";
import { UserControllers } from "../controllers/controller";

const router = express.Router();

const userController = new UserControllers();

router.post("/createuser", userController.userPost);
router.get("/createuser", userController.userGet);
router.get("/createuser/:id_user", userController.userGetOne);
router.put("/createuser/:id_user", userController.userPut);
router.delete("/createuser/:id_user", userController.userDelete);

export default router;
