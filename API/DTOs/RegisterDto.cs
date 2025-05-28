using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [MaxLength(20)]
        [MinLength(3)]  
        public required string Username { get; set; }
        public required string Password { get; set; }

    }
}