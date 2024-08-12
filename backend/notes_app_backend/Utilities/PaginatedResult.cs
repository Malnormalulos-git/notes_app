using Microsoft.EntityFrameworkCore;

namespace notes_app_backend.Utilities;

public class PaginatedResult<T> 
{
    public List<T> Items { get; private set; }
    public int PageIndex  { get; private set; }
    public int PageSize   { get; private set; }
    public int TotalCount { get; private set; }
    public int TotalPages { get; private set; }

    public PaginatedResult(IQueryable<T> source, int pageIndex, int pageSize) {
        PageIndex = pageIndex;
        PageSize = pageSize;
        TotalCount = source.Count();
        TotalPages = (int) Math.Ceiling(TotalCount / (double)PageSize);
        
        Items = source.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToListAsync().Result;
    }
}