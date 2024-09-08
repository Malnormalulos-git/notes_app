using System.Linq.Dynamic.Core;
using System.Reflection;
using notes_app_backend.Data;

namespace notes_app_backend.Utilities.Extensions;

public static class NoteQueryableExtensions
{
    private static readonly Dictionary<SortType, string> SortTypeToPropertyMap = new();

    static NoteQueryableExtensions()
    {
        InitializeSortTypeToPropertyMap();
    }

    private static void InitializeSortTypeToPropertyMap()
    {
        var noteProperties = typeof(Note).GetProperties().ToDictionary(p => p.Name.ToLowerInvariant());
        
        foreach (SortType sortType in Enum.GetValues(typeof(SortType)))
        {
            var propertyName = sortType.ToString().Substring(2); // Remove "by" prefix
            if (noteProperties.TryGetValue(propertyName.ToLowerInvariant(), out PropertyInfo property))
            {
                SortTypeToPropertyMap[sortType] = property.Name;
            }
        }
    }

    public static IQueryable<Note> OrderByNoteSortType(this IQueryable<Note> source, SortType sortType, bool isByDescending)
    {
        if (!SortTypeToPropertyMap.TryGetValue(sortType, out string propertyName))
        {
            propertyName = nameof(Note.LastUpdatedAt); // Default sorting
        }

        var orderByDirection = isByDescending ? "descending" : "ascending";
        
        return source.OrderBy($"{propertyName} {orderByDirection}");
    }
}