const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ImageKit = require("imagekit");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const { mainModel, challengeModel, userModel } = require("./models/model");
const cors = require("cors"); // Import the CORS middleware
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 8 * 60 * 1000, // 15 menit
  max: 1, // maksimal 1 request setiap 15 menit
  message: "Try Again Later:D.",
});

//* Welcome :D
const config = require("./config.json");

dotenv.config();

var imagekit = new ImageKit({
  publicKey: process.env.publicImg,
  privateKey: process.env.privateImg,
  urlEndpoint: process.env.urlEndpoint,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
let data;
let dataChallenge;
let users = [];

const app = express();
app.use("/post", limiter);
app.use("/postChallenge.", limiter);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);

app.post("/post", upload.single("image"), async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  if (!response.data.success) return res.json({ msg: "reCAPTCHA tidak valid" });

  // TODO: Sesuaikan dengan data yang diunggah dari penyimpanan memori
  const desc = req.body.desc;
  const name = req.body.name;
  const userId = btoa(req.body.username);
  const id = data.length + 1;
  const accept = false;
  let imgLink;
  // Misalnya, untuk mengakses buffer dari file yang diunggah
  if (req.file) {
    const buffer = req.file.buffer;
    await imagekit.upload(
      {
        file: buffer,
        fileName: `image-${id}.jpg`,
        useUniqueFileName: false,
        folder: "yunation",
      },
      async function (error, result) {
        if (error) {
          console.error("Error uploading to ImageKit:", error);
          return res
            .status(500)
            .json({ msg: "Terjadi kesalahan saat mengunggah file" });
        }

        imgLink = result.url;
        const comments = [];
        // Simpan ke basis data atau lakukan tindakan lainnya
        await mainModel.create({
          id,
          userId,
          name,
          desc,
          imgLink,
          comments,
          accept,
        });

        data.unshift({ id, userId, name, desc, imgLink, comments, accept });
        res.redirect("/YunaSNS/" + id);
      }
    );
  } else if (req.body.link) {
    imgLink = req.body.link;
    const comments = [];
    // Simpan ke basis data atau lakukan tindakan lainnya
    await mainModel.create({
      id,
      name,
      desc,
      imgLink,
      comments,
    });

    data.unshift({ id, name, desc, imgLink, comments });
    res.redirect("/YunaSNS/" + id);
  }
});
app.post("/post/challenge", upload.single("image"), async (req, res) => {
  const token = req.body["g-recaptcha-response"];
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`
  );
  if (!response.data.success) return res.json({ msg: "reCAPTCHA tidak valid" });

  // TODO: Sesuaikan dengan data yang diunggah dari penyimpanan memori
  const desc = req.body.desc;
  const name = req.body.name;
  const id = data.length + 1;
  let imgLink;
  // Misalnya, untuk mengakses buffer dari file yang diunggah
  if (req.file) {
    const buffer = req.file.buffer;
    await imagekit.upload(
      {
        file: buffer,
        fileName: `image-challenge-${id}.jpg`,
        useUniqueFileName: false,
        folder: "yunation",
      },
      async function (error, result) {
        if (error) {
          console.error("Error uploading to ImageKit:", error);
          return res
            .status(500)
            .json({ msg: "Terjadi kesalahan saat mengunggah file" });
        }

        imgLink = result.url;
        const comments = [];
        // Simpan ke basis data atau lakukan tindakan lainnya
        await challengeModel.create({
          id,
          name,
          desc,
          imgLink,
          comments,
        });

        data.unshift({ id, name, desc, imgLink, comments });
        res.redirect("/YunayuSNS/challenge/" + id);
      }
    );
  } else if (req.body.link) {
    imgLink = req.body.link;
    const comments = [];
    // Simpan ke basis data atau lakukan tindakan lainnya
    await challengeModel.create({
      id,
      name,
      desc,
      imgLink,
      comments,
    });

    data.unshift({ id, name, desc, imgLink, comments });
    res.redirect("/YunayuSNS/challenge/" + id);
  }
});

app.get("/YunayuSNS/login", (request, response) => {
  const redirect_url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${config.CLIENT_ID}&scope=identify&state=123456&redirect_uri=${config.REDIRECT_URI}&prompt=consent`;
  response.redirect(redirect_url);
});
function make_config(authorization_token) {
  data = {
    headers: {
      authorization: `Bearer ${authorization_token}`,
    },
  };
  return data;
} //? Amati Tiru Plek ketiplek
app.get(`/admin/${process.env.privateAdmin}/accept/:id`, async (req, res) => {
  const id = req.params.id;
  let acceptedData = data.find((obj) => obj.id === id);
  acceptedData = {
    id: acceptedData.id,
    userId: acceptedData.userId,
    name: acceptedData.name,
    desc: acceptedData.desc,
    imgLink: acceptedData.imgLink,
    comments: acceptedData.comments,
    accept: true,
  };

  if (!acceptedData) {
    res.send("Data not found");
    return;
  }

  try {
    // Find the index of the ongoing article in the 'data' array
    const existingDataIndex = data.findIndex((obj) => obj.id === id);

    // Update or create the data in the 'data' array
    if (existingDataIndex !== -1) {
      data[existingDataIndex] = acceptedData;
      await mainModel.findOneAndUpdate({ id: id }, acceptedData);
    }

    // Render the 'ongoing' page with the updated data
    res.redirect("/YunaSNS/");
  } catch {
    res.redirect("/YunaSNS/");
  } //! INI BELUM SEPARUHNYA, BIASA SAJA KAMU TAK APA :D
});
app.get("/YunayuSNS/challenge/accept/:id", async (req, res) => {
  const { userId } = req.body;
  const id = req.params.id;
  const admin = users.find((user) => user.userId === userId && user.isAdmin);
  if (admin) {
    const acceptedData = dataChallenge.find((obj) => obj.id === id);
    const acceptedtheData = {
      id: acceptedData.id,
      userId: acceptedData.userId,
      name: acceptedData.name,
      desc: acceptedData.desc,
      imgLink: acceptedData.imgLink,
      comments: acceptedData.comments,
      accept: true,
    };

    if (!acceptedtheData) {
      res.send("Data not found");
      return;
    }

    try {
      // Find the index of the ongoing article in the 'data' array
      const existingDataIndex = dataChallenge.findIndex((obj) => obj.id === id);

      // Update or create the data in the 'data' array
      if (existingDataIndex !== -1) {
        dataChallenge[existingDataIndex] = acceptedtheData;
        await challengeModel.findOneAndUpdate({ id: id }, acceptedtheData);
      }

      // Render the 'ongoing' page with the updated data
      res.redirect("/YunaSNS/");
    } catch {
      res.redirect("/YunaSNS/");
    }
  }
});
app.get("/YunayuSNS/login/redirect", async (request, response) => {
  const code = request.query["code"];
  const resp = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: config.REDIRECT_URI,
      code: code,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  axios
    .get(
      "https://discord.com/api/users/@me",
      make_config(resp.data.access_token)
    )
    .then((res) => {
      const user = users.find(
        (user) => user.userId === btoa(res.data.username)
      );
      //!🔥 FIRE THIS SONGGG
      if (!user || user <= -1) {
        users.push({
          userId: btoa(res.data.username),
          username: res.data.username,
          isQueue: false,
          isAdmin: false,
          isBan: false,
        });
        response.render("redirect", {
          data: {
            userId: btoa(res.data.username),
            username: res.data.username,
            isQueue: false,
            isAdmin: false,
            isBan: false,
          },
        });
      } else if (users[user].isBan) {
        response.redirect("/YunaSNS/");
      }
      response.render("redirect", {
        data: users[user],
      });
    })
    .catch((err) => {
      console.log(err);
      response.sendStatus(500);
    });
});
app.get(`/admin/${process.env.privateAdmin}`, (req, res) => {
  res.render("admin", { title: "Admin", challenge: false, data: data });
});
app.get(`/admin/${process.env.privateAdmin}/delete/:id`, (req, res) => {
  const id = req.params.id;

  mainModel
    .deleteOne({ id: id })
    .then(() => {
      console.log("deleted"); // Success
      data = data.filter((obj) => obj.id != id); // Filter the data
    })
    .catch((error) => {
      console.log(error); // Failure
    });
});
app.get("/", function (req, res) {
  res.render("home", { title: "Home", challenge: false });
});
app.get("/logout", function (req, res) {
  res.render("logout-redirect", { title: "Logout", challenge: false });
});
app.get("/about", function (req, res) {
  res.render("about", { title: "About", challenge: false });
});
app.get("/YunaSNS", (req, res) => {
  res.render("yunaSNS", { title: "YunaSNS", challenge: false, data: data });
});
app.get("/YunaSNS/challenge", (req, res) => {
  res.render("yunaSNS", {
    title: "YunaSNS",
    challenge: true,
    data: dataChallenge,
  });
});
app.post("/post/:id/comment", async (req, res) => {
  const entryId = parseInt(req.params.id);
  const comment = req.body.comment;

  const entry = data.find((item) => item.id == entryId);

  if (!entry) {
    return res.status(404).json({ msg: "gak ada" });
  }

  entry.comments.push({ comment: comment });

  await mainModel.findOneAndUpdate(
    {
      id: entryId,
    },
    { $push: { comments: { comment: comment } } }
  );

  return res.redirect(`/YunaSNS/details/${entry.id}`);
});

//? Mantap gitu ya :D
app.post("/post/challenge/:id/comment", async (req, res) => {
  const entryId = parseInt(req.params.id);
  const comment = req.body.comment;

  const entry = dataChallenge.find((item) => item.id == entryId);

  if (!entry) {
    return res.status(404).json({ msg: "not found" });
  }

  entry.comments.push({ comment: comment });

  await mainModel.findOneAndUpdate(
    {
      id: entryId,
    },
    { $push: { comments: { comment: comment } } }
  );

  return res.redirect(`/YunayuSNS/challenge/${entry.id}`);
});
const port = 8080;
mongoose.set("strict", false);
mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true }).then(() => {
  mainModel
    .updateMany(
      { $or: [{ comments: { $exists: false } }, { comments: { $size: 0 } }] },
      { $set: { comments: [] } },
      { upsert: true } // Menambahkan dokumen baru jika tidak ditemukan
    )
    .then((updateResult) => {
      // Setelah updateMany selesai, ambil data terbaru dari database
      return mainModel.find({});
    })
    .then((res) => {
      data = res;
      challengeModel
        .updateMany(
          {
            $or: [{ comments: { $exists: false } }, { comments: { $size: 0 } }],
          },
          { $set: { comments: [] } },
          { upsert: true } // Menambahkan dokumen baru jika tidak ditemukan
        )
        .then((updateResult) => {
          console.log(`${updateResult.modifiedCount} dokumen diperbarui`);
          // Setelah updateMany selesai, ambil data terbaru dari database
          return challengeModel.find({});
        })
        .then((res2) => {
          dataChallenge = res2;
          app.get("/YunayuSNS/details/:id", function (req, res) {
            const searchTerm = parseInt(req.params.id); // Dapatkan ID dari URL dan ubah ke tipe numerik jika perlu
            const searchResult = data.find((entry) => entry.id == searchTerm);

            res.render("img", {
              title: "YunayuSNS",
              data: data,
              entry: searchResult,
              searchTerm: "",
              challenge: false,
            });
          });

          app.get("/YunayuSNS/challenge/details/:id", function (req, res) {
            const searchTerm = parseInt(req.params.id); // Dapatkan ID dari URL dan ubah ke tipe numerik jika perlu
            const searchResult = dataChallenge.find(
              (entry) => entry.id == searchTerm
            );

            res.render("img", {
              title: "YunayuSNS",
              data: data,
              entry: searchResult,
              searchTerm: "",
              challenge: true,
            });
          });

          app.listen(port, () => {
            console.log(`[app]: app is running at http://localhost:${port}`);
          });
        });
    });
});
