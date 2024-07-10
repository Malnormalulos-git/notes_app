using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using notes_app_backend.Data;
using notes_app_backend.Data.DTOs.Auth;

namespace notes_app_backend.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    // private readonly IMapper _mapper;
    // private readonly AppDbContext _appDbCtx;
    
    public AuthController(UserManager<AppUser> userManager/*, IMapper mapper, AppDbContext appDbCtx*/)
    {
        _userManager = userManager;
        // _mapper = mapper;
        // _appDbCtx = appDbCtx;
    }
    
    [HttpPost(Name = "Register")]
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

        if (res.Errors.Any(x => x.Code == "DuplicateUserEmail"))
        {
            return new ConflictResult();
        }

        if (!res.Succeeded)
        {
            return new BadRequestResult();
        }

        return new OkResult();
    }
}