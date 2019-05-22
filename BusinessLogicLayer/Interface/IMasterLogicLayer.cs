using SCXL.Model.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interface
{
    public interface IMasterLogicLayer
    {
        List<Role> GetTableRole();
        int DeleteTableRole(Role objRole);
        int UpdateTableRole(Role objRole, string query);
        List<Employee> GetTableEmployee();
        int insertEmployeeType(Employee objEmployee);
        int updateEmployeeType(Employee objEmployee);
        int DeleteTableEmploye(Employee objEmployee);
        List<Employee> GetTableEmployeeIDRoleID();
        List<LoginDetails> GetTableLoginDetails();
        int UpdateTableLogin(LoginDetails objLogin, string query);
        List<Employee_Type> GetTableEmployeeTypeDetails();
        int InsertTableEmployee_Type(Employee_Type objEmployee_Type, string query);

        int InsertOrganization(Organisation objOrganization);

        List<object> GetTableData(string objName);
    }
}
