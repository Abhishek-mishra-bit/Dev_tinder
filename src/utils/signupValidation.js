const validation = async (req) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    throw new Error(
      "Please fill all the fields for signup the data name, age, email and gender"
    );
  }
};

module.exports = validation;
