const HTML_HEADERS = {
  "Cache-Control": "private, no-store",
  "Content-Security-Policy":
    "frame-ancestors 'self' https://chatgpt.com https://*.chatgpt.com https://chat.openai.com https://*.openai.com",
  "Content-Type": "text/html; charset=utf-8",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
} as const;

export function htmlResponse(html: string, status = 200) {
  return new Response(html, {
    status,
    headers: HTML_HEADERS,
  });
}
