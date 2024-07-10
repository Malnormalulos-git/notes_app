using System.ComponentModel.DataAnnotations;

namespace notes_app_backend.Data.DTOs.Auth;

public record RegisterUserDto
{
    [EmailAddress] 
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}