export function requireJsonHeaders(req, res, next) {
  const method = String(req.method || '').toUpperCase();

  // Only enforce for write operations.
  if (!['POST', 'PUT', 'PATCH'].includes(method)) return next();

  // If there's no body, don't block.
  const contentLength = Number(req.headers['content-length'] || 0);
  if (!contentLength) return next();

  const contentType = String(req.headers['content-type'] || '').toLowerCase();

  const allowed =
    contentType.includes('application/json') ||
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data');

  if (!allowed) {
    return res.status(415).json({
      message: 'Unsupported Media Type. Use application/json.',
    });
  }

  return next();
}
