using System.Text;
using API;
using API.Data;
using API.Errors;
using API.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddApplicationServices(builder.Configuration);
        builder.Services.AddIdentityServices(builder.Configuration);

        var app = builder.Build();
        app.UseMiddleware<ExceptionMiddleware>();
        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200"));
        app.UseAuthentication();
        app.UseAuthorization();

        // Configure the HTTP request pipeline. 
        app.MapControllers();

        app.Run();
    }
}