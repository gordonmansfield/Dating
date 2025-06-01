
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using Dating.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


public class AccountController(DataContext context, ITokenService tokenService) : BaseAPIController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        // Check if the user already exists
        var username = registerDto.Username.ToLower();
        var password = registerDto.Password;

        // Check if the user already exists
        if (await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower()))
        {
            return BadRequest("Username is taken");
        }

        // Validate the password
        if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
        {
            return BadRequest("Password must be at least 6 characters long");
        }
        return Ok();
        // Check if the user already exists
/**
            using var hmac = new HMACSHA512();
    
            // Create a new user
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
    
            // Add the user to the database
            context.Users.Add(user);
            await context.SaveChangesAsync();
    
            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            });
*/
    }
    // Login method
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        // Check if the user exists
        var user = await context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
        if (user == null)
        {
            return Unauthorized("Invalid username");
        }

        // Validate the password
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid password");
            }
        }

        return Ok(new UserDto
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        });
        
    }

}       
