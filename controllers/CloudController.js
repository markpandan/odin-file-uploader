function cloudGet(req, res) {
  res.render("index", { page: "cloud" });
}

function cloudPost(req, res) {}

module.exports = {
  cloudGet,
  cloudPost,
};
