
using API.Data;
using Dating.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    public class UsersController(DataContext context) : BaseAPIController
    {

        [HttpGet]
        public async Task <ActionResult <IEnumerable<AppUser>>>GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return users;
        }
        
        [Authorize]
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
