using AutoMapper.EquivalencyExpression;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using notes_app_backend.Data;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddSingleton(builder.Configuration);
services.AddSingleton(TimeProvider.System);

services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("WebApiDatabase")));

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

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

app.UseCors();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
