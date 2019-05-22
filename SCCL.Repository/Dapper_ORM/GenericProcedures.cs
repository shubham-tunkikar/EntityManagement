using Dapper;
using SCCL.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCCL.Repository.Dapper_ORM
{
    public class GenericProcedures :IGenericProcedures
    {
        private string sqlConnectionString = ConfigurationManager.ConnectionStrings["SqlServerConnString"].ConnectionString;

        //This method gets all record from pass table    
        public List<T> GetAll<T>(string query)
        {
            List<T> list_Dynamic = new List<T>();
            using (SqlConnection connection = new SqlConnection(sqlConnectionString))
            {
                connection.Open();
                list_Dynamic = connection.Query<T>(query).ToList();
                connection.Close();
            }
            return list_Dynamic;
        }

        //This method gets 1 record from pass table    
        public T GetSingelData<T>(string query)
        {
            T objDynamic;
            using (SqlConnection connection = new SqlConnection(sqlConnectionString))
            {
                connection.Open();
                objDynamic = (T)connection.Query<T>(query).Single();
                connection.Close();
            }
            return objDynamic;
        }

        //This method inserts a given class record in database    
        public int Insert(string query)
        {
            using (var connection = new SqlConnection(sqlConnectionString))
            {
                connection.Open();
                var affectedRows = connection.Execute(query);
                connection.Close();
                return affectedRows;
            }
            return 0;
        }

        //This method update student record in database    
        public int UpdateDelete(string query)
        {
            using (var connection = new SqlConnection(sqlConnectionString))
            {
                connection.Open();                
                var affectedRows = connection.Execute(query);
                connection.Close();
                return affectedRows;
            }
            return 0;
        }

        //This method deletes a student record from database    
        private int DeleteStudent<T>(T student)
        {
            //using (SqlConnection connection = new SqlConnection(sqlConnectionString))
            //{
            //    connection.Open();
            //    var affectedRows = connection.Execute("Delete from Student Where Id = @Id", new { Id = studentId });
            //    connection.Close();
            //    return affectedRows;
            //}
            return 0;
        }

       
    }
}
