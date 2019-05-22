using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCXL.Model.Master
{
    public class Role
    {
        public int Role_ID { get; set; }
        public string Role_Name
        {
            get { return _role_Name; }
            set
            {
                _role_Name = value.Trim();
            }
        }
        private string _role_Name { get; set; }
    }

    public class Employee
    {
        private int _emp_Id { get; set; }
        public int Emp_Id
        {
            get { return _emp_Id; }
            set
            {
                _emp_Id = value;
            }
        }
        private int _eFK_SD_Role_ID { get; set; }
        public int FK_SD_Role_ID
        {
            get { return _eFK_SD_Role_ID; }
            set
            {
                _eFK_SD_Role_ID = value;
            }
        }
        private string _eFK_SD_Role_Name { get; set; }
        public string FK_SD_Role_Name
        {
            get { return _eFK_SD_Role_Name; }
            set
            {
                _eFK_SD_Role_Name = value.Trim();
            }
        }
        private string _eMP_Name { get; set; }
        public string EMP_Name
        {
            get { return _eMP_Name; }
            set
            {
                _eMP_Name = value.Trim();
            }
        }
        private string _eMP_Pan_Card_Number { get; set; }
        public string EMP_Pan_Card_Number
        {
            get { return _eMP_Pan_Card_Number; }
            set
            {
                _eMP_Pan_Card_Number = value.Trim();
            }
        }
        private string _eMP_Adhar_Card_Number { get; set; }
        public string EMP_Adhar_Card_Number
        {
            get { return _eMP_Adhar_Card_Number; }
            set
            {
                _eMP_Adhar_Card_Number = value.Trim();
            }
        }
        private int _eMP_Mobile_Number { get; set; }
        public int EMP_Mobile_Number
        {
            get { return _eMP_Mobile_Number; }
            set
            {
                _eMP_Mobile_Number = value;
            }
        }
        private string _eMP_EmailId { get; set; }
        public string EMP_EmailId
        {
            get { return _eMP_EmailId; }
            set
            {
                _eMP_EmailId = value.Trim();
            }
        }
        private string _eMP_Address { get; set; }
        public string EMP_Address
        {
            get { return _eMP_Address; }
            set
            {
                _eMP_Address = value.Trim();
            }
        }
        private string _eMP_DateOfBirth { get; set; }
        public string EMP_DateOfBirth
        {
            get { return _eMP_DateOfBirth; }
            set
            {
                _eMP_DateOfBirth = value;
            }
        }
        private string _eMP_Bank_Acc_Number { get; set; }
        public string EMP_Bank_Acc_Number
        {
            get { return _eMP_Bank_Acc_Number; }
            set
            {
                _eMP_Bank_Acc_Number = value.Trim();
            }
        }
        private string _eMP_Bank_Name { get; set; }
        public string EMP_Bank_Name
        {
            get { return _eMP_Bank_Name; }
            set
            {
                _eMP_Bank_Name = value.Trim();
            }
        }
        private string _eMP_Bank_Branch_Name { get; set; }
        public string EMP_Bank_Branch_Name
        {
            get { return _eMP_Bank_Branch_Name; }
            set
            {
                _eMP_Bank_Branch_Name = value.Trim();
            }
        }
        private string _eMP_Bank_IFSC_CODE { get; set; }
        public string EMP_Bank_IFSC_CODE
        {
            get { return _eMP_Bank_IFSC_CODE; }
            set
            {
                _eMP_Bank_IFSC_CODE = value.Trim();
            }
        }
    }

    public class LoginDetails
    {
         
        private int _login_Id { get; set; }
        public int _fK_SD_Role_Id { get; set; }
        public int _fK_SD_Emp_Id { get; set; }
        private string _user_Id { get; set; }
        private string _uPassword { get; set; }

        private string _loginStatus { get; set; }

        private string _role_Name { get; set; }

        private string _eMP_Name { get; set; }

        public string EMP_Name
        {
            get { return _eMP_Name; }
            set
            {
                _eMP_Name = value.Trim();
            }
        }
        public string Role_Name
        {
            get { return _role_Name; }
            set
            {
                _role_Name = value.Trim();
            }
        }
        public string LoginStatus
        {
            get { return _loginStatus; }
            set
            {
                _loginStatus = value.Trim();
            }
        }
        public string UPassword
        {
            get { return _uPassword; }
            set
            {
                _uPassword = value.Trim();
            }
        }
        
        public string User_Id
        {
            get { return _user_Id; }
            set
            {
                _user_Id = value.Trim();
            }
        }
        public int FK_SD_Emp_Id
        {
            get { return _fK_SD_Emp_Id; }
            set
            {
                _fK_SD_Emp_Id = value;
            }
        }
        public int Login_Id
        {
            get { return _login_Id; }
            set
            {
                _login_Id = value;
            }
        }
        public int FK_SD_Role_Id
        {
            get { return _fK_SD_Role_Id; }
            set
            {
                _fK_SD_Role_Id = value;
            }
        }
    }

    public class Employee_Type
    {
        private int _employee_Id { get; set; }
        public int Employee_Id
        {
            get { return _employee_Id; }
            set
            {
                _employee_Id = value;
            }
        }
        private string _employee_Name { get; set; }
        public string Employee_Name
        {
            get { return _employee_Name; }
            set
            {
                _employee_Name = value.Trim();
            }
        }
    }


    public class Organisation
    {
        public string Tb_Name { get { return "SD_Organisation"; } }
        public int Org_Id { get; set; }
        public string Org_Name
        {
            get { return _Org_Name; }
            set
            {
                _Org_Name = value.Trim();
            }
        }
        public string _Org_Name { get; set; }

    }
}
