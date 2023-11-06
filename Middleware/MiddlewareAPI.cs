using Microsoft.AspNetCore.Http;

namespace NotesApplication.Middleware
{
    public class MiddlewareAPI
    {
        private const string APIKeyName = "x-api-key";
        private readonly RequestDelegate _next;

        public MiddlewareAPI(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string query=context.Request.QueryString.Value;
            if (!context.Request.Headers.TryGetValue(APIKeyName, out var extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("API key was not provided");
                return;
            }

            var appSettings = context.RequestServices.GetRequiredService<IConfiguration>();

            var apiKey = appSettings.GetValue<string>(APIKeyName);

            if (apiKey != extractedApiKey)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("UnAuthorised Client");
                return;
            }

            await _next(context);
        }
    }
}
