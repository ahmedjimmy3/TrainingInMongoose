import {DataTypes} from 'sequelize'
import {db_config} from '../connection.js'
import User from './user.js'

const Note = db_config.define(
    'note',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            required:true
        },
        content:{
            type:DataTypes.STRING,
            required:true,
        },
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'id'
            }
        }
    },
    {timestamps:true}
)

User.hasMany(Note,{foreignKey: 'userId'})
Note.belongsTo(User, { foreignKey:'userId'})
export default Note