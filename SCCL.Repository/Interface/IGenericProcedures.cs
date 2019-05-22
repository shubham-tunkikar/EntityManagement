using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCCL.Repository.Interface
{
    public interface IGenericProcedures
    {
        T GetSingelData<T>(string query);
        List<T> GetAll<T>(string query);
        int UpdateDelete(string query);
        int Insert(string query);
    }
}
