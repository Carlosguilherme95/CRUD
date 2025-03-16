import express from "express";
import {
  userGet,
  userGetOne,
  userDelete,
  userUpdate,
  UserControllers,
} from "../controllers/controller";

const router = express.Router();
export default router;
const userController = new UserControllers();

router.post("/createuser", userController.userPost);
router.get("/createuser", userGet);
router.get("/createuser/:id_user", userGetOne);
router.put("/createuser/:id_user", userUpdate);
router.delete("/createuser/:id_user", userDelete);
