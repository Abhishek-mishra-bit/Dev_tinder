const adminAuth = (req, res, next) => {
  const token = "xyza";
  const isTokenAuthenticated = token === "xyz";
  if (!isTokenAuthenticated) {
    res.status(403).send("admin is not authenticated");
  } else {
    res.send("admin is authenticated");
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyza";
  const isTokenAuthenticated = token === "xyz";
  if (!isTokenAuthenticated) {
    res.status(403).send("user is not authenticated");
  } else {
    res.send("user is authenticated");
    next();
  }
};
module.exports = {
  adminAuth,
  userAuth,
};
