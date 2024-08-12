using Microsoft.AspNetCore.Identity;
using notes_app_backend.Data;

namespace notes_app_backend.Utilities.Helpers;

public class UsersHelper
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public UsersHelper(IHttpContextAccessor httpContextAccessor, 
        UserManager<AppUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }
    public string GetUserIdFromHttpContext()
    {
        return _httpContextAccessor.HttpContext!.User.Claims.First(c => c.Type == "id").Value;
    }

    public Task<AppUser?> GetUserFromHttpContext()
    {
        var userId = GetUserIdFromHttpContext();
        return _userManager.FindByIdAsync(userId);
    }
}