using AutoMapper;
using notes_app_backend.Data;
using notes_app_backend.DTOs;

namespace notes_app_backend.Mappers;

public class NoteMapperConfiguration : Profile
{
    public NoteMapperConfiguration()
    {
        CreateMap<CreateNoteDto, Note>(MemberList.Destination);
        CreateMap<Note, NoteDto>(MemberList.Destination);
        CreateMap<UpdateNoteDto, Note>(MemberList.Destination);
    }
}