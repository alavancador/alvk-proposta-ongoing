import homeHtml from "./home.html?raw";
import { htmlResponse } from "./_lib/html-response";

export async function GET() {
  return htmlResponse(homeHtml);
}
