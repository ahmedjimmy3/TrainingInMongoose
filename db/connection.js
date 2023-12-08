import { Sequelize } from "sequelize";

export const db_config = new Sequelize('training','root','',{
    host:'localhost',
    dialect:'mysql'
})

export const connection = async()=>{
    await db_config.sync({alter:true , force:false})
    .then(res => console.log('db connection success'))
    .catch(err => console.log('db connection failed '))
}