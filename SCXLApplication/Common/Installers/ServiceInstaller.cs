
using Castle.MicroKernel.Registration;
using Application.Logs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BusinessLogicLayer.Login;
using SCCL.Repository.Dapper_ORM;
using SCCL.Repository.Interface;
using BusinessLogicLayer.Interface;
using BusinessLogicLayer.MasterBusinessLayer;

namespace Application.Common.Installers
{
    public class ServiceInstaller : IWindsorInstaller
    {
        public void Install(Castle.Windsor.IWindsorContainer container, Castle.MicroKernel.SubSystems.Configuration.IConfigurationStore store)
        {           
            
            container.Register(Component.For<ILogFactory>().ImplementedBy<Logger>().LifestylePerWebRequest());
            container.Register(Component.For<IGenericProcedures>().ImplementedBy<GenericProcedures>().LifestylePerWebRequest());
            container.Register(Component.For<IMasterLogicLayer>().ImplementedBy<MasterLogicLayer>().LifestylePerWebRequest());
            container.Register(Component.For<IAuthentication>().ImplementedBy<Authentication>().LifestylePerWebRequest());
            
            

        }
    }
}