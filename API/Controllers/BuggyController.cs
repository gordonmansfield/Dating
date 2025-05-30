using API.Controllers;
using API.Data;
using Dating.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController(DataContext context) : BaseAPIController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuth()
        {
            return "secret text";
        }
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = context.Users.Find(-1);
            if (thing == null) return NotFound();
            return Ok(thing);
        }
        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {

                 var thing = context.Users.Find(-1) ?? throw new Exception("This is a server error");
            return Ok(thing);

           
        }
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was a bad request");
        }   

    }
}