const errorHandler = (error,req,res)=>{
    console.log('Internal Error' , error)
    return res.status(500).json({message:'Oops server error please try again'})
}

export default errorHandler