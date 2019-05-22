using Application.Logs;
using Application.Model.Account;
using BusinessLogicLayer.Interface;
using SCCL.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Login
{
    public class Authentication: IAuthentication
    {
        private ILogFactory _log;
        private IGenericProcedures _objIGenericProcedures;
        public Authentication(ILogFactory ObjILogFactory, IGenericProcedures OBJIGenericProcedures)
        {
            _log = ObjILogFactory;
            _objIGenericProcedures = OBJIGenericProcedures;
        }
        public User LoginAuthentication(LoginInfo userLoginData)
        {
            User objUser = new User();
            try
            {
                //string query = "Select ID,USERID,UPASSWORD from SD_LOGIN_DETAILS  where USERID='" + userLoginData.USERID + "' AND UPASSWORD='" + userLoginData.UPASSWORD + "'";
                StringBuilder query = new StringBuilder();
                query.Append("declare  @var integer=0;");
                query.Append("declare  @IsAuthenticated bit ='false';");
                query.Append("set @var=(Select count(Login_Id)from SD_LOGIN_DETAILS  where User_Id='" + userLoginData.USERID+ "' AND UPassword='" + userLoginData.UPASSWORD + "')");
                query.Append("if(@var>=1)	set @IsAuthenticated='true'");
                query.Append("Select Login_Id,User_Id,UPassword,@IsAuthenticated as IsAuthenticated ,(select Role_Name from SD_Role where Role_Id=(select FK_SD_Role_Id from SD_LOGIN_DETAILS  where User_Id='" + userLoginData.USERID + "' AND UPassword='" + userLoginData.UPASSWORD + "')) as RoleName  from SD_LOGIN_DETAILS  where User_Id='" + userLoginData.USERID + "' AND UPassword='" + userLoginData.UPASSWORD + "'");
                objUser = _objIGenericProcedures.GetSingelData<User>(query.ToString());
                
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("LoginLogicLayer class file in LoginAuthentication");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return objUser;
        }
    }
}
