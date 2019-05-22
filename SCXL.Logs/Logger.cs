using log4net;
using log4net.Appender;
using log4net.Config;
using log4net.Core;
using log4net.Layout;
using log4net.Repository.Hierarchy;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Logs
{
    public class Logger : ILogFactory
    {
        ILog LogWrite;

        public Logger()
        {
            var patternLayoutShort = new PatternLayout()
            {
                ConversionPattern = "%date[%thread] %-5level - %message %newline"
            };
            patternLayoutShort.ActivateOptions();
            string currentDate = DateTime.Now.ToString("dd_MM_yyy");
            var rollingFileAppender = new RollingFileAppender()
            {
                Layout = patternLayoutShort,
                File = "C:/Proart_Media_Solutions/Proart_Web_Application_" + currentDate + ".log",
                AppendToFile = true,
                Name = "rollingFileAppender",
                Threshold = Level.All,
                MaximumFileSize = "10MB",
                MaxSizeRollBackups = 10,
            };
            rollingFileAppender.ActivateOptions();
            BasicConfigurator.Configure(rollingFileAppender);
            LogWrite = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }

        FileAppender ILogFactory.CurrentFileAppender
        {
            get
            {
                var appender = ((Hierarchy)LogManager.GetRepository())
                                            .Root.Appenders.OfType<FileAppender>()
                                            .FirstOrDefault();
                return appender;
            }
        }

        public string GetLogFileName(string LoggerName)
        {
            var rootAppender = LogManager.GetRepository()
                                         .GetAppenders()
                                         .OfType<FileAppender>()
                                         .FirstOrDefault(fa => fa.Name == LoggerName);
            return rootAppender != null ? rootAppender.File : string.Empty;
        }

        public string GetLogFileName()
        {
            var rootAppender = LogManager.GetRepository()
                                         .GetAppenders()
                                         .OfType<FileAppender>()
                                         .FirstOrDefault();

            return rootAppender != null ? rootAppender.File : string.Empty;
        }

        #region ILogger Members
        public void FatalMessage(string message)
        {
            if (LogWrite.IsFatalEnabled)
                LogWrite.Error(string.Format(CultureInfo.InvariantCulture, "{0}", message));
        }

        public void ErrorMessage(string message)
        {
            if (LogWrite.IsErrorEnabled)
                LogWrite.Error(string.Format(CultureInfo.InvariantCulture, "{0}", message));
        }

        public void ErrorException(Exception exception)
        {
            try
            {

                if (LogWrite.IsErrorEnabled)
                    LogWrite.Error(string.Format(CultureInfo.InvariantCulture, "{0}", exception.Message), exception);
            }
            catch (Exception ex)
            {
                return;
            }
        }

        public void WarningMessage(string message)
        {
            if (LogWrite.IsWarnEnabled)
                LogWrite.Warn(string.Format(CultureInfo.InvariantCulture, "{0}", message));
        }

        public void InfoMessage(string message)
        {
            if (LogWrite.IsInfoEnabled)
                LogWrite.Info(string.Format(CultureInfo.InvariantCulture, "{0}", message));
        }

        public void DebugMessage(string message)
        {
            if (LogWrite.IsInfoEnabled)
                LogWrite.Info(string.Format(CultureInfo.InvariantCulture, "{0}", message));
        }

        public void DebugException(Exception exception)
        {
            if (LogWrite.IsDebugEnabled)
                LogWrite.Debug(string.Format(CultureInfo.InvariantCulture, "{0}", exception.Message), exception);
        }
        #endregion
    }
}
