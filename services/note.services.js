import Note from "../db/models/note.js"
import User from "../db/models/user.js"

export function validateRequestNote(req){
    const {title,content,userId}=  req.body
    if(!title || !content || !userId){
        return 'All fields are required'
    }
    return
}

export async function createNote(noteData){
    await Note.create(noteData)
}

export async function getAllNotes(){
    const notes = await Note.findAll()
    return notes
}

export async function checkNoteFound(noteId){
    const noteExists = await Note.findByPk(noteId)
    return noteExists
}

export async function destroyNote(noteId){
    await Note.destroy({where:{id:noteId}})
}

export async function updateNoteQuick(noteData , noteId){
    await Note.update(noteData, {where:{id:noteId}})
}

export async function getNotesAndTheirOwners(){
    const data = await Note.findAll({
        include:{
            model:User
        }
    })
    return data
}