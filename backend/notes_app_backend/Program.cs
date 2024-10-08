using System.Text.Json.Serialization;
using AutoMapper.EquivalencyExpression;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using notes_app_backend.Data;
using notes_app_backend.Utilities.Helpers;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

builder.Configuration.AddUserSecrets(typeof(AppDbContext).Assembly);

services.AddSingleton(builder.Configuration);
services.AddSingleton(TimeProvider.System);
services.AddScoped<UsersHelper>();

services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase")));

services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 10;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
})
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = 
    options.DefaultChallengeScheme = 
    options.DefaultForbidScheme = 
    options.DefaultScheme = 
    options.DefaultSignInScheme = 
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SingingKey"])
        )
    };
});
builder.Services.AddAuthorization(); 

services.AddControllers()
    .AddNewtonsoftJson(options => options
        .SerializerSettings
        .Converters
        .Add(new StringEnumConverter {NamingStrategy = new CamelCaseNamingStrategy()}));
services.AddEndpointsApiExplorer();
services.AddSwaggerGen()
    .AddSwaggerGenNewtonsoftSupport();

services.AddCors(options => options.AddDefaultPolicy(
    corsPolicyBuilder => {
        if (builder.Environment.IsDevelopment()) {
            corsPolicyBuilder
                .WithOrigins("http://localhost:5173")
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader();
        }
    }));

services.AddAutoMapper(x =>
{
    x.AddCollectionMappers();
}, typeof(Program));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
