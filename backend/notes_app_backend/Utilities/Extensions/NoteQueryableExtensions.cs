using System.Linq.Expressions;
using notes_app_backend.Data;

namespace notes_app_backend.Utilities.Extensions;

public static class NoteQueryableExtensions
{
    public static IQueryable<Note> OrderByNoteSortType(this IQueryable<Note> source, SortType sortType, bool isByDescending)
    {
        Expression<Func<Note, object>> keySelector = sortType switch
        {
            SortType.byTitle => note => note.Title,
            SortType.byContent => note => note.Content,
            SortType.byCreationTime => note => note.CreatedAt,
            SortType.byLastUpdateTime => note => note.LastUpdatedAt,
            _ => note => note.LastUpdatedAt
        };

        return isByDescending
            ? source.OrderByDescending(keySelector)
            : source.OrderBy(keySelector);
    }
}