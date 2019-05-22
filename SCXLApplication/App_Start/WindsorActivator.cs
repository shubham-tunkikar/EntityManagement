using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: PreApplicationStartMethod(typeof(Application.App_Start.WindsorActivator), "PreStart")]
//[assembly: ApplicationShutdownMethodAttribute(typeof(Application.App_Start.WindsorActivator), "Shutdown")]
namespace Application.App_Start
{
    public class WindsorActivator
    {
        static ContainerBootstrapper bootstrapper;

        public static void PreStart()
        {
            bootstrapper = ContainerBootstrapper.Bootstrap();
        }
        [System.Security.SecurityCritical]
        public static void Shutdown()
        {
            if (bootstrapper != null)
                bootstrapper.Dispose();
        }
    }
}