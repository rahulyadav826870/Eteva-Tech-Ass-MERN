const express = require("express");
const { companyModel } = require("../models/companyModel.model");

const companyRouter = express.Router();

companyRouter.get("/", async (req, res) => {
  try {
    const companyData = await companyModel.find();
    res.send(companyData);
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

companyRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const companyData = await companyModel.insertMany(payload);
    // await companyData.save
    res.send({ msg: "Data is added sucessfully" });
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

companyRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const payload=req.body
    try {
      const updatedData = await companyModel.findByIdAndUpdate({_id:id},payload);
      res.send({"msg":"Data Updated Sucessfully"})
   
    } catch (error) {
      res.send({ msg: "Something went Wrong", error: error.message });
    }
  });

  companyRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deleteData = await companyModel.findByIdAndDelete({_id:id});
      res.send({"msg":"Data Deleted Sucessfully"})
   
    } catch (error) {
      res.send({ msg: "Something went Wrong", error: error.message });
    }
  });


module.exports={
    companyRouter
}