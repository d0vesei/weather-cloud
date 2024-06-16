using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using WeatherOnMarsApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Dodanie konfiguracji CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials()); // cookies, authorization headers etc.
});

builder.Services.AddDbContext<WeatherOnMarsContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("WeatherOnMarsDatabase")); // "DB" ?
});

// Add services to the container.
builder.Services.AddControllersWithViews(); // Dla MVC
builder.Services.AddControllers(); // Dla API

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("CorsPolicy"); // zdefiniowana polityka CORS

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // Dla API - pozwala na mapowanie tras zdefiniowanych przez atrybuty [Route]

app.Run();
