import { Router } from "express"
import * as noteController from './note.controller.js'
const router = Router()

router.post('/addNote', noteController.addNote)
router.get('/listNotes', noteController.listNotes)
router.delete('/deleteNote' , noteController.delNote)
router.put('/updateNote' , noteController.updateNote)
router.get('/noteAndOwners',noteController.noteAndOwners)
export default router