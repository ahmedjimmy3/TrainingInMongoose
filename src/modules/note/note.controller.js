import asyncWrapper from '../../../utils/asyncWrapper.js'
import Note from '../../../db/models/note.js'
import User from '../../../db/models/user.js'
import { checkNoteFound, createNote, destroyNote, getAllNotes, getNotesAndTheirOwners, updateNoteQuick, validateRequestNote } from '../../../services/note.services.js'
import { checkUserId } from '../../../services/user.services.js'

export const addNote = asyncWrapper(async(req,res)=>{
    const {title,content,userId} = req.body
    const checkFields = validateRequestNote(req)
    if(checkFields){
        return res.status(400).json({message:'All fields are required'})
    }
    const userFound = await checkUserId(userId)
    if(!userFound){
        return res.status(400).json({message:'User is not found'})
    }
    await createNote({title,content,userId})
    res.status(200).json({message:'Note created successfully'})
})

export const listNotes = asyncWrapper(async(req,res)=>{
    const notes = await getAllNotes()
    res.status(200).json({message:'These all notes' , notes})
})

export const delNote = asyncWrapper(async(req,res)=>{
    const userId = req.query.owner
    const noteId= req.query.noteId
    const noteFound = await checkNoteFound(noteId)
    if(!noteFound){
        return res.status(400).json({message:'Note not found'})
    }
    if(noteFound.userId != userId){
        return res.status(401).json({message:'You are not authorized'})
    }
    await destroyNote(noteId)
    res.status(200).json({message:'Note deleted successfully'})
})

export const updateNote = asyncWrapper(async(req,res)=>{
    const userId = req.query.owner
    const noteId = req.query.noteId
    const {title,content} = req.body
    const noteFound = await checkNoteFound(noteId)
    if(!noteFound){
        return res.status(400).json({message:'Note not found'})
    }
    if(noteFound.userId != userId){
        return res.status(404).json({message:'You are not authorized'})
    }
    await updateNoteQuick({title,content} , userId)
    res.status(200).json({message:'Note updated successfully'})
})

export const noteAndOwners = asyncWrapper(async(req,res)=>{
    const info = await getNotesAndTheirOwners()
    res.status(200).json({message:'Notes and info of their owners',info})
})