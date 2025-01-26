const notFound = (req, res) => {
  res.status(404).send("<h1>Seite nicht gefunden</h1>");
};

export default notFound;
