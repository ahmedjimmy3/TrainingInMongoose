import User from "../db/models/user.js"
import {Op} from 'sequelize'

export function validateRequest(req){
    const {name,email,password,age} = req.body
    if(!name || !email || !password || !age){
        return 'All fields are required'
    }
    return
}

export async function checkUserId(userId){
    const userExists = await User.findByPk(userId)
    return userExists
}

export async function checkEmailExists(email){
    const emailExists = await User.findOne({where:{
        email:email
    }})
    return emailExists
}

export async function createUser(userData){
    await User.create(userData)
}

export async function updateUser(userData , userId){
    await User.update(userData, {where:{id:userId}})
}

export async function destroyUser(userId){
    await User.destroy({where:{id:userId}})
}

export async function getUsers(){
    const users = await User.findAll()
    return users
}

export async function searchBasedOnNameAge(){
    const users = await User.findAll({where:{
        name:{
            [Op.like]:'a%'
        },
        age:{
            [Op.lt]:30
        }
    }})
    return users
}

export async function ageBetween20And30(){
    const users = await User.findAll({
        where:{
            age:{
                [Op.between]:[20,30]
            }
        }
    })
    return users
}

export async function getThreeOldestUsers(){
    const users= await User.findAll({
        order:[['age','DESC']],
        limit:3
    })
    return users
}

export async function getBasedListOfIDs(list){
    const users = await User.findAll({
        where:{
            id:{
                [Op.in]:list
            }
        }
    })
    return users
}