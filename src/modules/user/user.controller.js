import User from '../../../db/models/user.js'
import { ageBetween20And30, checkEmailExists, checkUserId, createUser, destroyUser, getBasedListOfIDs, getThreeOldestUsers, getUsers, searchBasedOnNameAge, updateUser, validateRequest } from '../../../services/user.services.js'
import asyncWrapper from '../../../utils/asyncWrapper.js'

export const signup = asyncWrapper(async(req,res)=>{
    const {name,email,password,age} = req.body
    const checkFields = validateRequest(req)
    if(checkFields){
        return res.status(400).json({message:'All fields required'})
    }
    const emailExist = await checkEmailExists(email)
    if(emailExist){
        return res.status(400).json({message:'This email already used before'})
    }
    await createUser({name,email,password,age})
    res.status(200).json({message:'User registered done'})
})

export const signIn = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body
    const checkEmail = await checkEmailExists(email)
    if(!checkEmail){
        return res.status(400).json({message:'Email or password are wrong'})
    }
    if(checkEmail.password != password){
        return res.status(400).json({message:'Email or password are wrong'})
    }
    res.status(200).json({message:'You are logged successfully'})
})

export const updateInfo = asyncWrapper(async(req,res)=>{
    const userId = req.query.id
    const {name,email,password,age} = req.body
    const checkFields = validateRequest(req)
    if(checkFields){
        return res.status(400).json({message:'All fields are required'})
    }
    const oldInfoToUser = await checkUserId(userId)
    if(!oldInfoToUser){
        return res.status(400).json({message:'This user not found'})
    }
    const emailUsed = await checkEmailExists(email)
    if(emailUsed){
        return res.status(400).json({message:'This email is already used'})
    }
    await updateUser({name,email,password,age} , userId)
    res.status(200).json({message:'Info updated successfully'})
})

export const deleteUser = asyncWrapper(async(req,res)=>{
    const userId = req.query.id
    const userFound = await checkUserId(userId)
    if(!userFound){
        return res.status(404).json({message:'This user is not found'})
    }
    await destroyUser(userId)
    res.status(200).json({message:'User deleted successfully'})
})

export const listUsers = asyncWrapper(async(req,res)=>{
    const users = await getUsers()
    if(!users){
        return res.status(200).json({message:'There is not users registered yet',users})
    }
    res.status(200).json({message:'These are all users' , users})
})

export const searchUserNameAndAge = asyncWrapper(async(req,res)=>{
    const users = await searchBasedOnNameAge()
    res.status(200).json({message:'These are users whose names start with a and their age is less than 30' , users})
})

export const usersAge = asyncWrapper(async(req,res)=>{
    const users = await ageBetween20And30()
    res.status(200).json({message:'These are users whose ages are between 20 and 30',users})
})

export const oldestUsers = asyncWrapper(async(req,res)=>{
    const users = await getThreeOldestUsers()
    res.status(200).json({message:'Oldest users' , users})
})

export const listOfIds = asyncWrapper(async(req,res)=>{
    const list = req.body.list
    const users = await getBasedListOfIDs(list)
    res.status(200).json({message:'These users in the list', users})
})