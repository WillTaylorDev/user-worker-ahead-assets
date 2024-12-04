export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/supersecret.txt") {
      const auth = request.headers.get("Authorization");
      if (!auth) {
        return new Response("Forbidden", {
          status: 403,
          statusText: "Forbidden",
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    }

    return await env.ASSETS.fetch(request);
  },
};
