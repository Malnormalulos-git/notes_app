using System.Linq.Expressions;

namespace notes_app_backend.Utilities.Extensions;

public static class QueryableExtensions
{
    public static IQueryable<T> WhereIf<T>(this IQueryable<T> source,
        bool condition,
        Expression<Func<T, bool>> predicate)
        => condition
            ? source.Where(predicate)
            : source;
}