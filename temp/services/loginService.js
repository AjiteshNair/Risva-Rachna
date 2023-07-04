import loginQueriesObject from "../DAO/loginQueries.js";
class LoginService{
    getUserByCompanyId = async function(companyId){
        let result = await loginQueriesObject.getUserByCompanyIdFromDb(companyId);
      return result;
    }
}
export default new LoginService();