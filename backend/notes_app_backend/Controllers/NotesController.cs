using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using notes_app_backend.Data;
using notes_app_backend.DTOs;

namespace notes_app_backend.Controllers;

[Route("api/notes")]
public class NotesController
{
    private readonly AppDbContext _appDbCtx;
    private readonly IMapper _mapper;

    public NotesController(AppDbContext appDbCtx, IMapper mapper)
    {
        _appDbCtx = appDbCtx;
        _mapper = mapper;
    }
    
    [HttpGet(Name = "GetNotes")]
    [ProducesResponseType(typeof(List<NoteDto>), 200)]
    [ProducesResponseType(404)]
    public async Task<object> GetNotes()
    {
        var notes = await _appDbCtx.Notes.AsQueryable()
            .Select(t => _mapper.Map<NoteDto>(t))
            .ToListAsync();
        if (notes.Count == 0)
        {
            return new NotFoundResult();
        }
        return new ObjectResult(notes);
    }
    
    [HttpGet("{id:long}", Name = "GetNote")]
    [ProducesResponseType(typeof(NoteDto), 200)]
    [ProducesResponseType(404)]
    public object GetNote([FromRoute(Name = "id")] long NoteId)
    {
        // var note = _mapper.Map<NoteDto>(_appDbCtx.Notes.FirstOrDefault(n => n.Id == NoteId));
        var note = _appDbCtx.Notes.FirstOrDefault(n => n.Id == NoteId);
        if (note == null)
        {
            return new NotFoundResult();
        }
        return new ObjectResult(note);
    }
}