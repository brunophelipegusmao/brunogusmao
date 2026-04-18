interface RequestLike {
  headers: Headers;
  url: string;
}

export function getRequestOrigin(request: RequestLike): string {
  const requestUrl = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = request.headers.get("host");

  const protocol = forwardedProto ?? requestUrl.protocol.replace(":", "");
  const originHost = forwardedHost ?? host ?? requestUrl.host;

  return `${protocol}://${originHost}`;
}
