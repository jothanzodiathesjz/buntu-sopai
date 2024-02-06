const Populer = require("../Models/PopulerModel");
const cloudinary = require("cloudinary").v2;



const getPopuler = async (req, res) => {
  const dataPopuler = await Populer.find({});
  res.status(200).json({ dataPopuler });
};


const getPopulerById = async (req, res) => {
  const { id } = req.params;
  const dataPopuler = await Populer.findOne({ _id: id });
  res.status(200).json({ dataPopuler });
};

const getPopularWithView = async (req, res) => {
  const dataPopuler = await Populer.find();
  res.render("mainpage/populer", {
    current: "experience",
    dataPopuler
  });
}


const PostPopuler = async (req, res) => {
  const { text,title } = req.body;
  const img = req.file;

  result = await cloudinary.uploader.upload(img.path, {
    use_filename: true,
    folder: "file-upload",
  });

  let data = {
    img: result?.secure_url,
    text,
    title,
    public_id: result.public_id,
  };

  await Populer.create(data);
  res.status(201).json({ msg: "success" });
};



const UpdatePopuler = async (req, res) => {
  const { id } = req.params;
  const { text,title } = req.body;
  const img = req.file;
  let result;

  const populer = await Populer.findOne({ _id: id });

  if (img) {
    result = await cloudinary.uploader.upload(img.path, {
      use_filename: true,
      folder: "file-upload",
    });

    if (result) {
      await cloudinary.uploader.destroy(result.public_id);
    }
  }

  let data = {
    img: populer.img || result?.secure_url,
    text: text || populer.text,
    title: title || populer.title,
    public_id: populer.public_id || result.public_id,
  };

  await Populer.findOneAndUpdate({ _id: id }, data);
  res.status(201).json({ msg: "update success" });
};

const deletePopuler = async (req, res) => {
  const { id } = req.params;
  const populer = await Populer.findOneAndDelete({ _id: id });
  res.status(201).json({ msg: "delete success" });
}

const getPopulerByIdWithView = async (req, res) => {
  const { id } = req.params;
  try {
    const dataPopuler = await Populer.findOne({ _id: id });
    res.render("mainpage/populer-content", {
      current: "experience",
      dataPopuler,
    });
  } catch (error) {
    res.render("mainpage/404");
  }
  
}

module.exports = {
  PostPopuler,
  UpdatePopuler,
  getPopuler,
  getPopulerById,
  getPopularWithView,
  deletePopuler,
  getPopulerByIdWithView
};
