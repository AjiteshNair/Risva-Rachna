import readPool from "../connection.js";

class LoginQueries{
    getUserByCompanyIdFromDb = async function(companyId){
        let sqlQuery = "Select * from user where companyId = ?"
        let result = await readPool.query(sqlQuery,[companyId])

      return result;
    }
}
export default new LoginQueries();