using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SCXL.Model.Master;
using System.Data.SqlClient;
using System.Configuration;
using System.Reflection;
using System.Data;

namespace SCXLApplication.SPHandler
{
    public class StoredProcedureHandler
    {
        private static Dictionary<string, string> dictTypeSPNameMapping = new Dictionary<string, string>() {
            { "organisation", "SpHandleOrganisation" },
            { "employee_type", "SpHandleEmployee_Type" },
            {"logindetails","SpHandleLoginDetails"},
            { "employee","SpHandleEmployee"},
            { "role","SpHandleRole"}
        };

        private static Dictionary<string, string> dictTypeIdFieldMapping = new Dictionary<string, string>() {
            { "organisation", "Org_Id" },
            { "employee_type", "Employee_Id" },
            {"logindetails","Login_Id"},
            { "employee","Emp_Id"},
            { "role","Role_ID"}
        };
        private static string conn = ConfigurationManager.ConnectionStrings["SqlServerConnString"].ConnectionString.ToString();
        public static int UpdateRecord(string operation, Object data)
        {
            int retrunval = 0;
            SqlConnection con = new SqlConnection(conn);
            List<PropertyInfo> lstProperties = new List<PropertyInfo>();
            lstProperties = data.GetType().GetProperties().ToList<PropertyInfo>();
            try
            {
                SqlCommand cmd = new SqlCommand(dictTypeSPNameMapping[data.GetType().Name.ToLower()], con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@iHandle", operation.ToUpper());
                foreach (PropertyInfo property in lstProperties)
                {
                    if (!string.Equals(property.Name, "Tb_Name", StringComparison.InvariantCultureIgnoreCase) && !property.Name.StartsWith("_O"))
                        cmd.Parameters.AddWithValue(string.Format("@i{0}", property.Name), property.GetValue(data, null));
                }

                SqlParameter returnParameter = cmd.Parameters.Add("@RetVal", SqlDbType.Int);
                returnParameter.Direction = ParameterDirection.ReturnValue;
                con.Open();
                cmd.ExecuteNonQuery();
                retrunval = (int)returnParameter.Value;
            }
            catch (Exception ex)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
            return retrunval;
        }

        public static int DeleteteRecord(Object data) {
            int retrunval = 0;
            SqlConnection con = new SqlConnection(conn);
            try {
                SqlCommand cmd = new SqlCommand(dictTypeSPNameMapping[data.GetType().Name.ToLower()], con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@iHandle", SP_Operations.DELETE.ToString().ToUpper());
                /*
                 * Add object Id field name dynamicaly and value also
                 */
                PropertyInfo idProperty = data.GetType().GetProperty(dictTypeIdFieldMapping[data.GetType().Name.ToLower()]);
                cmd.Parameters.AddWithValue(string.Format("@i{0}", idProperty.Name), idProperty.GetValue(data, null));

                SqlParameter returnParameter = cmd.Parameters.Add("@RetVal", SqlDbType.Int);
                returnParameter.Direction = ParameterDirection.ReturnValue;
                con.Open();
                cmd.ExecuteNonQuery();
                retrunval = (int)returnParameter.Value;
            }
            catch (Exception ex) {
                return -1;
            }
            return retrunval;
        }
    }

    public enum SP_Operations
    {
        INSERT,
        UPDATE,
        DELETE,
        SELECT
    }
}