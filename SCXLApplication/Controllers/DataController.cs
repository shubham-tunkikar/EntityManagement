using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Application.Logs;
using BusinessLogicLayer.Interface;
using SCXL.Model.Master;
using SCXLApplication.SPHandler;

namespace SCXLApplication.Controllers
{
    public class DataController : ApiController
    {
        // GET: api/Data
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Data/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Data
        public int Post(Object value)
        {
           dynamic data =  JsonConvert.DeserializeObject(JsonConvert.SerializeObject(value));
            string action = data.action.Value as string;
            if (string.IsNullOrWhiteSpace(action)) throw new Exception("Invalid data format");
            switch (action.ToLower())
            {
                case "updatemasterorganisation":
                    {
                        Organisation objOrganization = JsonConvert.DeserializeObject<Organisation>(JsonConvert.SerializeObject(data.data));
                        return StoredProcedureHandler.UpdateRecord(SP_Operations.UPDATE.ToString(), objOrganization);
                    }
                case "insertorganisation":
                    {
                        Organisation organisation = JsonConvert.DeserializeObject<Organisation>(JsonConvert.SerializeObject(data.data));
                        return StoredProcedureHandler.UpdateRecord(SP_Operations.INSERT.ToString(), organisation);
                    }
                case "deleteorganisation":
                    {
                        Organisation organisation = JsonConvert.DeserializeObject<Organisation>(JsonConvert.SerializeObject(data.data));
                        return StoredProcedureHandler.DeleteteRecord(organisation);
                    }
            }
            return 0;
        }

        // PUT: api/Data/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Data/5
        public void Delete(int id)
        {
        }
    }
}
