const User = require("../modals/user")

module.exports.renderSignupForm =  (req, res) => {
    res.render("./users/signup.ejs");
  }

module.exports.signup = async (req, res) => {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Roamify");
      res.redirect("/listings");
    });
  }

  module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
  }


  module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Roamify!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }


  module.exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out !");
      res.redirect("/listings");
    });
  }
  //ff