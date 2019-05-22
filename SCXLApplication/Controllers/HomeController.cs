


using Application.Logs;
using Application.Model.Account;
using Application.Model.Custom_Identity;
using BusinessLogicLayer.Interface;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace Application.Controllers
{
    
    public class HomeController : Controller
    {
        private IAuthentication _objIAuthentication;
        private ILogFactory _log;
        public HomeController(ILogFactory ObjILogFactory, IAuthentication ObjIAuthentication)
        {
            _log = ObjILogFactory;
            _objIAuthentication = ObjIAuthentication;
        }
        [HttpGet]
        public ActionResult Index()
        {
            if (!string.IsNullOrEmpty(HttpContext.User.Identity.Name.ToString()))
            {
                var objCustomPrincipal = HttpContext.User as CustomPrincipal;
                ViewBag.loggedUserName = objCustomPrincipal.RoleName;                
                return View();
            }
            return RedirectToAction("Login", "Home");
        }
        [HttpGet]
        public ActionResult Login()
        {
            _log.InfoMessage("Welcome Proart Media Soluation Application");
            if (!string.IsNullOrEmpty(HttpContext.User.Identity.Name.ToString()))
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

      
        /// <summary>    
        /// Login into RestService with CXL credentials.    
        /// </summary> 
        /// <remarks>    
        /// Login and get user info with token to call others APIs (Server - DEV/QUT/SBX/PROD)   
        /// </remarks> 
        [HttpPost]
        [Route("Home/Loginauthentication")]
        public JsonResult Loginauthentication(LoginInfo user)
        {
            
            User userObj = new User();
            try
            {                
                if ((user.USERID != null) && (user.UPASSWORD!= null))
                {
                    FormsAuthentication.SetAuthCookie(user.USERID, false);                  
                                 
                    userObj = _objIAuthentication.LoginAuthentication(user);
                    if (userObj.IsAuthenticated)
                    {
                        CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                        serializeModel.Id = userObj.Login_Id;
                        serializeModel.RoleName = userObj.RoleName.Trim();
                        serializeModel.UserID = userObj.User_Id.Trim();

                        JavaScriptSerializer serializer = new JavaScriptSerializer();

                        string userData = serializer.Serialize(serializeModel);

                        FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                                 1,
                                 userObj.User_Id.Trim(),
                                 DateTime.Now,
                                 DateTime.Now.AddMinutes(15),
                                 false,
                                 userData);

                        string encTicket = FormsAuthentication.Encrypt(authTicket);
                        _log.InfoMessage("[ Log In User Name/ID : " + userObj.User_Id +" , Role Name : "+ userObj.RoleName+ " ]");
                        System.Web.HttpCookie faCookie = new System.Web.HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                        Response.Cookies.Add(faCookie);
                        return Json(userObj, JsonRequestBehavior.AllowGet);
                        //return RedirectToAction("Index", "Home");
                    }
                    else if (!userObj.IsAuthenticated)
                    {
                        _log.InfoMessage("[ Not Log In Proart Media Soluation Application.]");
                        return Json(userObj, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            catch (Exception e)
            {
                _log.ErrorMessage("Loginauthentication in HomeController");
                _log.ErrorException(e);
            }
            return Json(userObj, JsonRequestBehavior.AllowGet);
            //return RedirectToAction("Login", "Home");
        }
        /// <summary>
        /// For logout the application
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Home/LogOff")]
        public ActionResult LogOff()
        {           
            
            try
            {
                string _response = string.Empty;
                //_objIAccountDataLogicLayer.authenticationLogout(HttpContext.User.Identity.Name);
                var objCustomPrincipal = HttpContext.User as CustomPrincipal;
                _log.InfoMessage("[ Log Off User Name : "+ objCustomPrincipal.UserID+", Role : "+ objCustomPrincipal.RoleName+" ]");
                _log.InfoMessage("Proart Media Soluation Application Log Off");
                FormsAuthentication.SignOut();
                if (!string.IsNullOrEmpty(_response))
                {
                    return RedirectToAction("Login", "Home");
                }
            }
            catch (Exception ex)
            {
                _log.ErrorMessage("LogOfffunction in HomeController");
                _log.ErrorException(ex);
            }            
            return RedirectToAction("Index", "Home");
        }

    }
}