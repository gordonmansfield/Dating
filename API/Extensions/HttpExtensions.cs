using System.Text.Json;
using API.Helpers;
using Microsoft.AspNetCore.Http.Json;

namespace API.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader<T>(this HttpResponse response, PagedList<T> data)
    {
        var paginatorHeader = new PaginationHeader(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Append("Pagination", JsonSerializer.Serialize(paginatorHeader, jsonOptions));
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination");

    }
 
}