using log4net.Appender;
using System;

namespace Application.Logs
{
    public interface ILogFactory
    {
        void FatalMessage(string message);
        void ErrorMessage(string message);
        void ErrorException(Exception message);
        void WarningMessage(string message);
        void InfoMessage(string message);
        void DebugMessage(string message);
        void DebugException(Exception message);
        FileAppender CurrentFileAppender { get; }
        string GetLogFileName();
        string GetLogFileName(string LoggerName);
    }
}
