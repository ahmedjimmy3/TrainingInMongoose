import {DataTypes} from 'sequelize'
import {db_config} from '../connection.js'

const User = db_config.define(
    'user',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name:{
            type:DataTypes.STRING,
            required:true,
        },
        email:{
            type:DataTypes.STRING,
            // unique:true,
            required:true
        },
        password:{
            type:DataTypes.STRING,
            required:true
        },
        age:{
            type:DataTypes.INTEGER,
            required:true
        }
    },
    {timestamps:true}
)

export default User