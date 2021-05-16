using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace JUST
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Register Syncfusion license 
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("NDQ2ODA4QDMxMzkyZTMxMmUzMGdHMi9NRTkvRWVZaGsrQ0tGMEhORnNCa1lqTVpMTzlPM0VTZTFraEtIM1E9"); 
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
