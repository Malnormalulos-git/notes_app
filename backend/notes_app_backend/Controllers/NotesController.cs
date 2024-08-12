using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using notes_app_backend.Data;
using notes_app_backend.DTOs;
using notes_app_backend.Utilities;
using notes_app_backend.Utilities.Helpers;

namespace notes_app_backend.Controllers;

[Authorize]
[Route("api/notes")]
[ApiController]
public class NotesController : ControllerBase
{
    private readonly UsersHelper _usersHelper;
    private readonly AppDbContext _appDbCtx;
    private readonly IMapper _mapper;

    public NotesController(AppDbContext appDbCtx, IMapper mapper, UsersHelper usersHelper)
    {
        _appDbCtx = appDbCtx;
        _mapper = mapper;
        _usersHelper = usersHelper;
    }
    
    [HttpPost(Name = "CreateNote")]
    [ProducesResponseType(typeof(NoteDto), 200)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> CreateNote([FromBody] CreateNoteDto createNoteDto, CancellationToken ct = default)
    {
        var userId = _usersHelper.GetUserIdFromHttpContext();
        var noteToAdd = _mapper.Map<Note>(createNoteDto);
        
        noteToAdd.OwnerId = userId;
        _appDbCtx.Notes.Add(noteToAdd);
        
        var res = await _appDbCtx.SaveChangesAsync(ct);
        if (res == 0)
        {
            return new StatusCodeResult(500);
        }
        var addedNote = _mapper.Map<NoteDto>(noteToAdd);
        return new OkObjectResult(addedNote);
    }
    
    [HttpGet(Name = "GetNotes")]
    [ProducesResponseType(typeof(PaginatedResult<NoteDto>), 200)]
    [ProducesResponseType(404)]
    public Task<IActionResult> GetNotes(
        [FromQuery(Name = "pageIndex")] int pageIndex,
        [FromQuery(Name = "pageSize")] int pageSize)
    {
        var userId = _usersHelper.GetUserIdFromHttpContext();

        var notes = _appDbCtx.Notes
            .Where(n => n.OwnerId == userId)
            .OrderByDescending(note => note.LastUpdatedAt)
            .Select(t => _mapper.Map<NoteDto>(t));

        var pagedNotes = new PaginatedResult<NoteDto>(notes, pageIndex, pageSize);
        
        if (pagedNotes.Items.Count == 0)
        {
            return Task.FromResult<IActionResult>(new NotFoundResult());
        }
        
        return Task.FromResult<IActionResult>(new OkObjectResult(pagedNotes));
    }
    
    [HttpGet("{id:long}", Name = "GetNote")]
    [ProducesResponseType(typeof(NoteDto), 200)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public IActionResult GetNote([FromRoute(Name = "id")] long id)
    {
        var userId = _usersHelper.GetUserIdFromHttpContext();
        
        var note = _appDbCtx.Notes.FirstOrDefault(n => n.Id == id);
        
        if (note == null)
        {
            return new NotFoundResult();
        }
        if (note.OwnerId != userId)
        {
            return StatusCode(403);
        }
        
        return new OkObjectResult(_mapper.Map<NoteDto>(note));
    }
    
    [HttpPatch(Name = "EditNote")]
    [ProducesResponseType(200)]
    [ProducesResponseType(304)]
    [ProducesResponseType(400)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> EditNote([FromBody] EditNoteDto editNoteDto, CancellationToken ct = default)
    {
        var userId = _usersHelper.GetUserIdFromHttpContext();

        var note = _appDbCtx.Notes.FirstOrDefault(n => n.Id == editNoteDto.Id);
        if (note == null)
        {
            return new StatusCodeResult(400);
        }
        if (note.OwnerId != userId)
        {
            return StatusCode(403);
        }
        
        bool areChangesMade = false;

        if (!string.IsNullOrEmpty(editNoteDto.Title) && !string.Equals(note.Title, editNoteDto.Title))
        {
            note.Title = editNoteDto.Title;
            areChangesMade = true;
        }
        
        if (!string.Equals(note.Content, editNoteDto.Content))
        {
            note.Content = editNoteDto.Content;
            areChangesMade = true;
        }

        if (areChangesMade)
        {
            _appDbCtx.Update(note);
            var res = await _appDbCtx.SaveChangesAsync(ct);
            if (res == 0)
            {
                return new StatusCodeResult(500);
            }
            return new OkResult();
        }
        return new StatusCodeResult(304);
    }
    
    [HttpDelete("{id:long}", Name = "DeleteNote")]
    [ProducesResponseType(200)]
    [ProducesResponseType(403)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> DeleteNote([FromRoute(Name = "id")] long id, CancellationToken ct = default)
    {
        var userId = _usersHelper.GetUserIdFromHttpContext();

        var note = _appDbCtx.Notes.FirstOrDefault(x => x.Id == id);
        if (note is null)
        {
            return new StatusCodeResult(500);
        }
        if (note.OwnerId != userId)
        {
            return StatusCode(403);
        }

        _appDbCtx.Notes.Remove(note);
        var res = await _appDbCtx.SaveChangesAsync(ct);
        if (res == 0)
        {
            return new StatusCodeResult(500);
        }

        return new OkResult();
    }
}