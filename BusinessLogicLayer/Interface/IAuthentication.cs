using Application.Model.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interface
{
    public interface IAuthentication
    {
        User LoginAuthentication(LoginInfo userLoginData);
    }
}
