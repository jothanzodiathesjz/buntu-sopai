const View = require("../Models/ViewModel");
const cloudinary = require("cloudinary").v2;


const getView = async (req, res) => {
  const dataView = await View.find({});
  res.status(200).json({ dataView });
};


const getViewWithView = async (req, res) => {
  const dataView = await View.find();
  res.render("mainpage/gallery", {
    current: "gallery",
    dataView
  })
}

const getViewById = async (req, res) => {
  const { id } = req.params;
  const dataView = await View.findOne({ _id: id });
  res.status(200).json({ dataView });
};


const PostView = async (req, res) => {
  const { text } = req.body;
  const img = req.file;
  try {
    result = await cloudinary.uploader.upload(img.path, {
      use_filename: true,
      folder: "file-upload",
    });

    let data = {
      img: result?.secure_url,
      text,
      public_id: result.public_id,
    };

    await View.create(data);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  
  
};



const UpdateView = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const img = req.file;
  let result;

  const view = await View.findOne({ _id: id });

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
    img: view.img || result?.secure_url,
    text: text || view.text,
    public_id: view.public_id || result.public_id,
  };

  await View.findOneAndUpdate({ _id: id }, data);
  res.status(201).json({ msg: "update success" });
};

function deleteViewById(req, res) {
  const { id } = req.params;
  try {
    const view = View.findOneAndDelete({ _id: id });
    res.status(201).json({ msg: "delete success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  
}

module.exports = {
  PostView,
  UpdateView,
  getView,
  getViewById,
  getViewWithView
};
