using Application.Logs;
using BusinessLogicLayer.Interface;
using SCCL.Repository.Interface;
using SCXL.Model.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.MasterBusinessLayer
{
    public class MasterLogicLayer : IMasterLogicLayer
    {
        private ILogFactory _log;
        private IGenericProcedures _objIGenericProcedures;
        public MasterLogicLayer(ILogFactory objILogFactory, IGenericProcedures ObjIGenericProcedures)
        {
            _log = objILogFactory;
            _objIGenericProcedures = ObjIGenericProcedures;
        }

        public List<Role> GetTableRole()
        {
            List<Role> listOfRole = new List<Role>();
            try
            {
                listOfRole = _objIGenericProcedures.GetAll<Role>("select Role_ID ,Role_Name from SD_Role");
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in GetTableRole");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return listOfRole;
        }

        public int UpdateTableRole(Role objRole, string query)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = string.Empty;
                if (query.Equals("update"))
                {
                    queryToUpdate = "update SD_Role set Role_Name='" + objRole.Role_Name + "' where Role_ID='" + objRole.Role_ID + "'";
                }
                else if (query.Equals("insert"))
                {
                    queryToUpdate = "insert into SD_Role values('" + objRole.Role_Name + "');";
                }
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in UpdateTableRole and option is : " + query);
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }
        public int DeleteTableRole(Role objRole)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = "delete from SD_Role where Role_ID='" + objRole.Role_ID + "'";
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in DeleteTableRole");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }

        public List<Employee> GetTableEmployee()
        {
            List<Employee> listOfEmployee = new List<Employee>();
            try
            {
                listOfEmployee = _objIGenericProcedures.GetAll<Employee>("select Emp_Id,FK_SD_Role_ID,(select Role_Name from SD_Role where Role_ID = FK_SD_Role_ID) as FK_SD_Role_Name,EMP_Name,EMP_Pan_Card_Number,EMP_Adhar_Card_Number,EMP_Mobile_Number,EMP_EmailId,EMP_Address,convert(varchar, EMP_DateOfBirth, 1) as EMP_DateOfBirth,EMP_Bank_Acc_Number,EMP_Bank_Name,EMP_Bank_Branch_Name,EMP_Bank_IFSC_CODE from SD_Employee where EMP_Status='A'");
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in GetTableEmployee");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return listOfEmployee;
        }

        public int insertEmployeeType(Employee objEmployee)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = "INSERT INTO [dbo].[SD_Employee]" +
           "([FK_SD_Role_ID]" +
           ",[EMP_Name]" +
           ",[EMP_Pan_Card_Number]" +
           ",[EMP_Adhar_Card_Number]" +
           ",[EMP_Mobile_Number]" +
           ",[EMP_EmailId]" +
           ",[EMP_Address]" +
           ",[EMP_DateOfBirth]" +
           //",[EMP_Image]" +
           ",[EMP_Bank_Acc_Number]" +
           ",[EMP_Bank_Name]" +
           ",[EMP_Bank_Branch_Name]" +
           ",[EMP_Bank_IFSC_CODE],[EMP_Status])" +
           "VALUES" +
           "(" + objEmployee.FK_SD_Role_Name +
           ",'" + objEmployee.EMP_Name + "'" +
           ",'" + objEmployee.EMP_Pan_Card_Number + "'" +
           ",'" + objEmployee.EMP_Adhar_Card_Number + "'" +
           "," + objEmployee.EMP_Mobile_Number +
           ",'" + objEmployee.EMP_EmailId + "'" +
           ",'" + objEmployee.EMP_Address + "'" +
           ",'" + objEmployee.EMP_DateOfBirth + "'" +
           ",'" + objEmployee.EMP_Bank_Acc_Number + "'" +
           ",'" + objEmployee.EMP_Bank_Name + "'" +
           ",'" + objEmployee.EMP_Bank_Branch_Name + "'" +
           ",'" + objEmployee.EMP_Bank_IFSC_CODE + "'" +
           ",'A'" + ")";

                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in insertEmployeeType");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;

        }
        public int updateEmployeeType(Employee objEmployee)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = "UPDATE [dbo].[SD_Employee]" +
      " SET[FK_SD_Role_ID] =" + objEmployee.FK_SD_Role_Name +
      ",[EMP_Name] =" + objEmployee.EMP_Name +
      ",[EMP_Pan_Card_Number] =" + objEmployee.EMP_Pan_Card_Number +
      ",[EMP_Adhar_Card_Number] =" + objEmployee.EMP_Adhar_Card_Number +
      ",[EMP_Mobile_Number] =" + objEmployee.EMP_Mobile_Number +
      ",[EMP_EmailId] = " + objEmployee.EMP_EmailId +
      ",[EMP_Address] = " + objEmployee.EMP_Address +
      ",[EMP_DateOfBirth] =" + objEmployee.EMP_DateOfBirth +
      ",[EMP_Bank_Acc_Number] =" + objEmployee.EMP_Bank_Acc_Number +
      ",[EMP_Bank_Name] =" + objEmployee.EMP_Bank_Name +
      ",[EMP_Bank_Branch_Name] =" + objEmployee.EMP_Bank_Branch_Name +
      ",[EMP_Bank_IFSC_CODE] =" + objEmployee.EMP_Bank_IFSC_CODE +
      "WHERE Emp_Id=" + objEmployee.Emp_Id;

                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in updateEmployeeType");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;

        }

        public int DeleteTableEmploye(Employee objEmployee)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = "UPDATE[dbo].[SD_Employee] SET [EMP_Status] = 'A' WHERE Emp_Id ='" + objEmployee.Emp_Id + "'";
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in DeleteTableEmploye");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }

        public List<Employee> GetTableEmployeeIDRoleID()
        {
            List<Employee> listOfEmployee = new List<Employee>();
            try
            {
                listOfEmployee = _objIGenericProcedures.GetAll<Employee>("SELECT E.Emp_Id,E.FK_SD_Role_ID,(SELECT Role_Name FROM SD_Role WHERE Role_ID = E.FK_SD_Role_ID) AS FK_SD_Role_Name,E.EMP_Name FROM SD_Login_Details LD LEFT JOIN SD_Employee AS E  ON LD.FK_SD_Role_Id != E.FK_SD_Role_ID");
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in GetTableEmployeeIDRoleID");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return listOfEmployee;
        }
        public List<LoginDetails> GetTableLoginDetails()
        {
            List<LoginDetails> listOfLoginDetails = new List<LoginDetails>();
            try
            {
                listOfLoginDetails = _objIGenericProcedures.GetAll<LoginDetails>("SELECT Login_Id,FK_SD_Role_Id,(SELECT Role_Name FROM SD_Role WHERE Role_ID=FK_SD_Role_Id) AS Role_Name,FK_SD_Emp_Id,(SELECT EMP_Name FROM SD_Employee WHERE Emp_Id=FK_SD_Emp_Id) AS EMP_Name,User_Id,UPassword,LoginStatus FROM SD_LOGIN_DETAILS WHERE LoginStatus='A'");
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in GetTableLoginDetails");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return listOfLoginDetails;
        }

        public int UpdateTableLogin(LoginDetails objLogin, string query)
        {
            string queryToUpdate = string.Empty;
            int rowsAffected = 0;
            try
            {

                if (query.Equals("update"))
                {
                    queryToUpdate = "UPDATE [dbo].[SD_Login_Details]SET [User_Id] = '" + objLogin.User_Id + "',[UPassword] = '" + objLogin.UPassword + "' WHERE [FK_SD_Emp_Id]=" + objLogin.FK_SD_Emp_Id;
                }
                else if (query.Equals("insert"))
                {
                    queryToUpdate = "INSERT INTO [dbo].[SD_Login_Details]([FK_SD_Role_Id],[FK_SD_Emp_Id],[User_Id],[UPassword],[LoginStatus])VALUES(" + objLogin.FK_SD_Role_Id + "," + objLogin.FK_SD_Emp_Id + ",'" + objLogin.User_Id + "','" + objLogin.UPassword + "','A')";
                }
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in UpdateTableLogin and option is : " + queryToUpdate);
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }

        public List<Employee_Type> GetTableEmployeeTypeDetails()
        {
            List<Employee_Type> listOfEmployee_Type = new List<Employee_Type>();
            try
            {
                listOfEmployee_Type = _objIGenericProcedures.GetAll<Employee_Type>("SELECT Employee_Id,Employee_Name FROM SD_Employee_Type WHERE [Status]='A'");
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in GetTableEmployeeTypeDetails");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return listOfEmployee_Type;
        }

        public int InsertTableEmployee_Type(Employee_Type objEmployee_Type, string query)
        {
            string queryToUpdate = string.Empty;
            int rowsAffected = 0;
            try
            {

                if (query.Equals("update"))
                {
                    queryToUpdate = "UPDATE [dbo].[SD_Employee_Type] SET[Employee_Name] ='" + objEmployee_Type.Employee_Name + "' WHERE Employee_Id=" + objEmployee_Type.Employee_Id;
                }
                else if (query.Equals("insert"))
                {
                    queryToUpdate = "INSERT INTO [dbo].[SD_Employee_Type]([Employee_Name],[Status])VALUES('" + objEmployee_Type.Employee_Name + "','A')";
                }
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in UpdateTableLogin and option is : " + queryToUpdate);
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }

        public int InsertOrganization(Organisation objOrganization)
        {
            int rowsAffected = 0;
            try
            {
                string queryToUpdate = string.Format("INSERT INTO [dbo].[SD_Organisation] ([Org_Name]) VALUES ('{0}')", objOrganization.Org_Name);
                rowsAffected = _objIGenericProcedures.UpdateDelete(queryToUpdate);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterLogicLayer class file in insertEmployeeType");
                _log.ErrorMessage(ex.StackTrace);
                _log.ErrorMessage(ex.Message);
                _log.ErrorException(ex);
            }
            return rowsAffected;
        }

        public List<object> GetTableData(string objName) {
            string query = string.Format("SELECT * FROM [{0}]", objName);
            return _objIGenericProcedures.GetAll<object>(query);
        }
    }
}

