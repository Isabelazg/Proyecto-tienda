export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-unused-vars
  const _next = next;

  const status = Number(err?.status || err?.statusCode) || 500;
  const message = err?.message || 'Internal Server Error';

  res.status(status).json({
    message,
  });
}
