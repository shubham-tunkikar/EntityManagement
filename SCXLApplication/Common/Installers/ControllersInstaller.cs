using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Application.Common.Plumbing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Application.Common.Installers
{
    public class ControllersInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Classes.
                    FromThisAssembly().
                    BasedOn<IController>().
                    If(c => c.Name.EndsWith("Controller")).
                    LifestyleTransient());

            ControllerBuilder.Current.SetControllerFactory(new WindsorControllerFactory(container));
        }

        // public void Install(Castle.Windsor.IWindsorContainer container,
        //Castle.MicroKernel.SubSystems.Configuration.IConfigurationStore store)
        // {
        //     container.Register(Classes.FromThisAssembly()
        //      .BasedOn<Controller>()
        //      .LifestylePerWebRequest());
        // }


        //public void Install(IWindsorContainer container, IConfigurationStore store)
        //{
        //    container.Register(AllTypes.FromThisAssembly()
        //        .Pick().If(t => t.Name.EndsWith("Controller"))
        //        .Configure(configurer => configurer.Named(configurer.Implementation.Name))
        //        .LifestylePerWebRequest());
        //}
    }
}