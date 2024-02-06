const Facilities = require("../Models/FacilitiesModel");
const cloudinary = require("cloudinary").v2;


const getFacilities = async (req, res) => {
  const dataFacilities = await Facilities.find({});
  res.status(200).json({ dataFacilities });
};

const getFacilitiesWithView = async (req, res) => {
  const dataFacilities = await Facilities.find();
  res.render("mainpage/fasilitas", {
    current: "facilities",
    dataFacilities
  })
}

const getFacilitiesById = async (req, res) => {
  const { id } = req.params;

  const dataFacilities = await Facilities.findOne({ _id: id });
  res.status(200).json({ dataFacilities });
};


const PostFacilities = async (req, res) => {
  const { text,title } = req.body;
  const img = req.file;


  result = await cloudinary.uploader.upload(img.path, {
    use_filename: true,
    folder: "file-upload",
  });


  let data = {
    img: result?.secure_url,
    title,
    text,
    public_id: result.public_id,
  };


  await Facilities.create(data);
  res.status(201).json({ msg: "success" });
};


const UpdateFacilities = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const img = req.file;


  let result;

  const facilities = await Facilities.findOne({ _id: id });

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
    img: facilities.img || result?.secure_url,
    text: text || facilities.text,
    public_id: facilities.public_id || result.public_id,
  };


  await Facilities.findOneAndUpdate({ _id: id }, data);
  res.status(201).json({ msg: "update success" });
};

module.exports = {
  PostFacilities,
  UpdateFacilities,
  getFacilities,
  getFacilitiesById,
  getFacilitiesWithView
};
