require('dotenv').config();
async function handleError(err,req,res,next) {
    const response={
        error:err.message || 'Internal Server Error'
    }

    if(process.env.ENV==='development'){
        response.stack=err.stack; 
    }
    
    res.status(err.status || 500).json(response);   
}

module.exports={
    handleError
}