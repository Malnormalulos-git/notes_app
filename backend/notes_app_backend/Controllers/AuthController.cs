using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using notes_app_backend.Data;
using notes_app_backend.Data.DTOs.Auth;

namespace notes_app_backend.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;
    
    public AuthController(UserManager<AppUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }
    
    [HttpPost("register", Name = "Register")]
    [ProducesResponseType(200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(409)]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUser, CancellationToken ct = default)
    {
        var newUser = new AppUser
        {
            UserName = registerUser.Email,
            Email = registerUser.Email,
        };

        var res = await _userManager.CreateAsync(newUser, registerUser.Password);
        
        if (res.Errors.Any(x => x.Code == "DuplicateUserEmail" || x.Code == "DuplicateUserName" ))
            return new ConflictObjectResult("DuplicateUserEmail");

        if (!res.Succeeded)
            return new BadRequestResult();

        return new OkResult();
    }

    [HttpPost("login", Name = "LogIn")]
    [ProducesResponseType(typeof(AuthResponseDto), 200)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> Login([FromBody] LogInDto logInDto, CancellationToken ct = default)
    {
        var user = await _userManager.FindByEmailAsync(logInDto.Email);

        if (user is null) 
            return new UnauthorizedResult();

        bool passwordIsConfirmed = await _userManager.CheckPasswordAsync(user, logInDto.Password);

        return passwordIsConfirmed 
            ? new OkObjectResult(new AuthResponseDto() { Token = await IssueToken(user)}) 
            : new UnauthorizedResult();
    }

    private Task<string> IssueToken(AppUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        
        var key = Encoding.UTF8.GetBytes(_configuration["JWT:SingingKey"]);
        var secretKey = new SymmetricSecurityKey(key);
        
        var claims = new List<Claim> 
        {
            new ("id", user.Id ),
            new (ClaimTypes.Email, user.Email!)
        };
        
        var jwt = new JwtSecurityToken(
            issuer: _configuration["JWT:Issuer"],
            audience: _configuration["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256));
        
        return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(jwt));
    }
}