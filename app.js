const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;

const accounts = [
  {
    id: 1,
    name: "Pongphun Sakdasawit",
    email: "pooms_pp@pongphun.com",
    profile:
      "https://scontent-kul2-1.xx.fbcdn.net/v/t39.30808-6/325770788_2065134277208408_8038899540181783959_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHWbmbGkOdqoAOhc0-mzlsgf0YJQjrRiCZ_RglCOtGIJhO9AsiTiUQnDEMHNmm_3_lYqWGAfws7oKXJGtPkCKYj&_nc_ohc=gx9jzHXeg1gAX_xZ-ny&_nc_ht=scontent-kul2-1.xx&oh=00_AfB1TqD9bmUdGqfRZ7NJMuNHbIe3YhDaYIprwZKpCXuxaw&oe=65364798",
    password: "thisisnotmypassworD",
  },
  {
    id: 2,
    name: "Andromeda",
    email: "Andromeda@gmail.com",
    profile:
      "https://cdn.britannica.com/39/155239-050-674BBCE2/Image-Andromeda-Galaxy-NASA-Wide-field-Infrared-Survey.jpg",
    password: "AndromedaGalaxy",
  },
  {
    id: 3,
    name: "Pairat Chuenchom",
    email: "64070081@it.kmitl.ac.th",
    profile: "https://pbs.twimg.com/media/C28biVRVEAQ5b5I.jpg",
    password: "Idontknowaboutyou",
  },
  {
    id: 69,
    name: "Nebula",
    email: "nebula@nebula.com",
    profile:
      "https://thelovablecat.com/wp-content/uploads/2023/01/is-beluga-cat-a-type-of-cat-breed-blog-image.jpg",
    password: "Andromeda",
  },
];

app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/user", (req, res) => {
  res.render("user", { accounts: accounts });
});

app.get("/user/:id", (req, res) => {
  const user = accounts.find((account) => account.id === Number(req.params.id));
  return res
    .status(200)
    .json({ ...user, password: caesarCipherHash(user.password) });
});

app.get("/home/:id", (req, res) => {
  res.render("home", { id: req.params.id });
});

app.post("/check", (req, res) => {
  const { email, password } = req.body;
  const user = accounts.find((account) => account.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Password incorrect" });
  }
  return res.status(200).json(user);
});

function caesarCipherHash(password) {
  const shift = password.length; // number of positions to shift each character
  let result = "";
  for (let i = 0; i < password.length; i++) {
    let charCode = password.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      // uppercase letters
      charCode = ((charCode - 65 + shift) % 26) + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      // lowercase letters
      charCode = ((charCode - 97 + shift) % 26) + 97;
    }
    result += String.fromCharCode(charCode);
  }
  return result;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
