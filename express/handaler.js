const handler = (req, res) => {
  res.send("Hello World ");
  console.log(req.route);
};

module.exports = handler;
