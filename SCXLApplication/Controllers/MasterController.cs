using Application.Logs;
using BusinessLogicLayer.Interface;
using SCXL.Model.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace SCXLApplication.Controllers
{
    public class MasterController : Controller
    {
        private ILogFactory _log;
        private IMasterLogicLayer _objIMasterLogicLayer;
        public MasterController(ILogFactory ObjILogFactory, IMasterLogicLayer ObjIMasterLogicLayer)
        {
            _log = ObjILogFactory;
            _objIMasterLogicLayer = ObjIMasterLogicLayer;
        }


        #region  Generic Table data
        [HttpGet]
        [Route("Master/GetTableData")]
        public JsonResult GetTableData(string queryString)
        {
            List<object> listTableData = new List<object>();
            try
            {
                listTableData = _objIMasterLogicLayer.GetTableData(queryString as string);
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("GetTableRole API in MasterController");
                _log.ErrorException(ex);
            }
            return Json(listTableData, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        [Route("Master/ActionDataHAndler")]
        public JsonResult ActionDataHAndler(object Organisation)
        {
            return null;
        }


        #endregion

        #region  Mater Role 
        [HttpGet]
        [Route("Master/GetTableRole")]
        public JsonResult GetTableRole()
        {
            List<Role> listOfRole = new List<Role>();
            try
            {
                listOfRole = _objIMasterLogicLayer.GetTableRole();
            }
            catch (Exception e)
            {
                _log.ErrorMessage("GetTableRole API in MasterController");
                _log.ErrorException(e);
            }
            return Json(listOfRole, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        [Route("Master/updateRole")]
        public ActionResult updateRole(Role objRole)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objRole.Role_Name != null)
                {
                    rowsAffected = _objIMasterLogicLayer.UpdateTableRole(objRole, "update");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in updateRole Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        [HttpPut]
        [Route("Master/insertRole")]
        public ActionResult insertRole(Role objRole)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objRole.Role_Name != null)
                {
                    rowsAffected = _objIMasterLogicLayer.UpdateTableRole(objRole, "insert");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in updateRole Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }

        [HttpPost]
        [Route("Master/deleteRole")]
        public ActionResult deleteRole(Role objRole)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objRole.Role_Name != null)
                {
                    rowsAffected = _objIMasterLogicLayer.DeleteTableRole(objRole);
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in deleteRole Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        #endregion

        #region Employee Type
        [HttpGet]
        [Route("Master/GetTableEmployee")]
        public JsonResult GetTableEmployee()
        {
            List<Employee> listOfEmployee = new List<Employee>();
            try
            {
                listOfEmployee = _objIMasterLogicLayer.GetTableEmployee();
            }
            catch (Exception e)
            {
                _log.ErrorMessage("GetTableEmployee API in MasterController");
                _log.ErrorException(e);
            }
            return Json(listOfEmployee, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("Master/insertEmployeeType")]
        public ActionResult insertEmployeeType(Employee objEmployee)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if ((objEmployee.EMP_Address != null) && (objEmployee.EMP_Adhar_Card_Number != null) && (objEmployee.EMP_Bank_Acc_Number != null) && (objEmployee.EMP_Bank_Branch_Name != null) &&
                    (objEmployee.EMP_Bank_IFSC_CODE != null) && (objEmployee.EMP_Bank_Name != null) && (objEmployee.EMP_DateOfBirth != null) && (objEmployee.EMP_EmailId != null) &&
                    (objEmployee.EMP_Mobile_Number != 0) && (objEmployee.EMP_Name != null) && (objEmployee.EMP_Pan_Card_Number != null) && (objEmployee.FK_SD_Role_ID != 0))
                {
                    rowsAffected = _objIMasterLogicLayer.insertEmployeeType(objEmployee);
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in insertEmployeeType Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        [HttpPost]
        [Route("Master/updateEmployeeType")]
        public ActionResult updateEmployeeType(Employee objEmployee)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if ((objEmployee.EMP_Address != null) && (objEmployee.EMP_Adhar_Card_Number != null) && (objEmployee.EMP_Bank_Acc_Number != null) && (objEmployee.EMP_Bank_Branch_Name != null) &&
                    (objEmployee.EMP_Bank_IFSC_CODE != null) && (objEmployee.EMP_Bank_Name != null) && (objEmployee.EMP_DateOfBirth != null) && (objEmployee.EMP_EmailId != null) &&
                    (objEmployee.EMP_Mobile_Number != 0) && (objEmployee.EMP_Name != null) && (objEmployee.EMP_Pan_Card_Number != null) && (objEmployee.FK_SD_Role_ID != 0))
                {
                    rowsAffected = _objIMasterLogicLayer.updateEmployeeType(objEmployee);
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in insertEmployeeType Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }

        [HttpPost]
        [Route("Master/deleteEmployee")]
        public ActionResult deleteEmployee(Employee objEmployee)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objEmployee.Emp_Id != 0)
                {
                    rowsAffected = _objIMasterLogicLayer.DeleteTableEmploye(objEmployee);
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in deleteRole Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }

        #endregion

        #region LoginDetails
        [HttpGet]
        [Route("Master/GetEmployeeIDRoleIDAsPerPresentDataInLogin")]
        public JsonResult GetEmployeeIDRoleIDAsPerPresentDataInLogin()
        {
            List<Employee> listOfEmployee = new List<Employee>();
            try
            {
                listOfEmployee = _objIMasterLogicLayer.GetTableEmployeeIDRoleID();
            }
            catch (Exception e)
            {
                _log.ErrorMessage("GetTableEmployee API in GetTableEmployeeIDRoleID");
                _log.ErrorException(e);
            }
            return Json(listOfEmployee, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("Master/GetTableLoginDetails")]
        public JsonResult GetTableLoginDetails()
        {
            List<LoginDetails> listOfLoginDetails = new List<LoginDetails>();
            try
            {
                listOfLoginDetails = _objIMasterLogicLayer.GetTableLoginDetails();
            }
            catch (Exception e)
            {
                _log.ErrorMessage("GetTableEmployee API in GetTableLoginDetails");
                _log.ErrorException(e);
            }
            return Json(listOfLoginDetails, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("Master/insertLogin")]
        public ActionResult insertLogin(LoginDetails objLogin)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objLogin != null)
                {
                    rowsAffected = _objIMasterLogicLayer.UpdateTableLogin(objLogin, "insert");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in insertLogin Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        [HttpPost]
        [Route("Master/updateLogin")]
        public ActionResult updateLogin(LoginDetails objLogin)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objLogin != null)
                {
                    rowsAffected = _objIMasterLogicLayer.UpdateTableLogin(objLogin, "update");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in updateLogin Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        #endregion

        #region Employee Type
        [HttpGet]
        [Route("Master/GetTableEmployeeType")]
        public JsonResult GetTableEmployeeType()
        {
            List<Employee_Type> listOfEmployee_Type = new List<Employee_Type>();
            try
            {
                listOfEmployee_Type = _objIMasterLogicLayer.GetTableEmployeeTypeDetails();
            }
            catch (Exception e)
            {
                _log.ErrorMessage("GetTableEmployee API in GetTableEmployeeType");
                _log.ErrorException(e);
            }
            return Json(listOfEmployee_Type, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("Master/insertEmployeeData")]
        public ActionResult insertEmployeeData(Employee_Type objEmployee_Type)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objEmployee_Type != null)
                {
                    rowsAffected = _objIMasterLogicLayer.InsertTableEmployee_Type(objEmployee_Type, "insert");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in insertEmployeeData Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        [HttpPost]
        [Route("Master/updateEmployeeData")]
        public ActionResult updateEmployeeData(Employee_Type objEmployee_Type)
        {
            int rowsAffected = 0;
            string message = "Record Not Affected";
            try
            {
                if (objEmployee_Type != null)
                {
                    rowsAffected = _objIMasterLogicLayer.InsertTableEmployee_Type(objEmployee_Type, "insert");
                }
                if (rowsAffected > 0)
                {
                    message = "Record Affected";
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("MasterController controller in insertEmployeeData Method");
                _log.ErrorException(e);
            }
            return Content(message);
        }
        #endregion


        #region
        [HttpPut]
        [Route("Master/insertOrg")]
        public ActionResult insertOrg(Organisation objOrg)
        {
            string message = "Record Not Affected";
            try
            {
                int rowsAffected = 0;
                if (!string.IsNullOrWhiteSpace(objOrg.Org_Name))
                {
                    rowsAffected = _objIMasterLogicLayer.InsertOrganization(objOrg);
                    if (rowsAffected > 0)
                        message = "Record Affected";
                }
                else
                {
                }
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("MasterController controller in updateRole Method");
                _log.ErrorException(ex);
            }
            return Content(message);
        }
        #endregion
    }
}