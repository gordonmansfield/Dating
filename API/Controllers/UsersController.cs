using System;
using System.Data;
using API.Data;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    [ApiController]
    [Route("api/[controller]")]

    public class UsersController(DataContext context) : ControllerBase
    {

        [HttpGet]
        public async Task <ActionResult <IEnumerable<AppUser>>>GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users;
        }

        [HttpGet ("{id:int}")]  // api/user/{id} 
        public async Task<ActionResult <AppUser>>GetUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        // Other actions can be added here
    }   
