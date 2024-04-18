const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ImageKit = require("imagekit");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const { mainModel, challengeModel } = require("./models/post");
const cors = require("cors"); // Import the CORS middleware
const axios = require("axios");

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

const app = express();

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
  const id = data.length + 1;
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
          name,
          desc,
          imgLink,
          comments,
        });

        data.unshift({ id, name, desc, imgLink, comments });
        res.redirect("/YunayuSNS/" + id);
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
    res.redirect("/YunayuSNS/" + id);
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
app.get("/", function (req, res) {
  res.render("home", { title: "Home", challenge: false });
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

  return res.redirect(`/YunayuSNS/${entry.id}`);
});
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
          app.get("/YunayuSNS/:id", function (req, res) {
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
          app.get("/YunayuSNS/challenge/:id", function (req, res) {
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
