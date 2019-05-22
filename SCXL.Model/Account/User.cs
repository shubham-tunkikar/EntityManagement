using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Model.Account
{
   
    public class LoginInfo
    {        
        public string USERID { get; set; }

        [DataType(DataType.Password)]
        public string UPASSWORD { get; set; }
    }

    public class User
    {
        public int Login_Id { get; set; }
        public string User_Id { get; set; }
        public string RoleName { get; set; }
        public bool IsAuthenticated { get; set; }
    }
}
