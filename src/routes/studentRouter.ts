import express from "express";
import * as studentController from '../controllers/studentController';

const router = express.Router();

router.get('/',studentController.loadPage);
router.post('/create',studentController.addStudent);
router.put('/update',studentController.editStudent);
router.delete('/remove/:id',studentController.deleteStudent)


export default router;