namespace  API.Extensions;

using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Data;
using API.DTOs;
using Dating.API.Entities;
using Microsoft.EntityFrameworkCore;

public static class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        // This method can be used to seed the database with initial data.
        // For example, you can create default users, roles, or any other necessary data.
     
        if (await context.Users.AnyAsync()) return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
        if (users == null) return;
        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("pa$$w0rd")); // Replace with a real password
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
        }
        
        await context.SaveChangesAsync();
    }
}
