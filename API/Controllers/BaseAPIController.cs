using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ServiceFilter(typeof(LogUserActivity))]
[ApiController]
[Route("api/[controller]")]
// This is a base controller for all API controllers    
// It inherits from ControllerBase, which is a base class for MVC controllers
public class BaseAPIController : ControllerBase
{
    // This class can be used to add common functionality for all API controllers
    // For example, you can add logging, authentication, or other cross-cutting concerns here
}   
