using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [MaxLength(20)]
        [MinLength(3)]  
        public  string Username { get; set; } = string.Empty;
        [Required]
        [StringLength(8, MinimumLength = 4)]
        public  string Password { get; set; } = string.Empty;

    }
}