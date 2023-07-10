const {connect} = require("../provider/userProvider.js")




const validCheck=(req,res,next)=>{
    const companyId = req.body.companyId;
    if(!Number(companyId))
      return res.status(400).json({message: "Expected companyId type to be integer"});
    next();
}

const connectSql=async (req,res)=>{
  const companyId = req.body.companyId;
    return await connect(companyId,res);
}

  
module.exports = (app) =>{
    app.post("/mysql", validCheck, connectSql)
}