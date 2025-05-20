const getOrigin = (req) => {
  const protocol = req.get("x-forwarded-proto") || req.protocol;
  const host = req.get("x-forwarded-host") || req.get("host");
  const origin = `${protocol}://${host}`;
  return origin;
};

export default getOrigin;
