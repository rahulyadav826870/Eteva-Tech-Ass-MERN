const express = require("express");
const { CompanyModel } = require("../models/companyModel.model");

const companyRouter = express.Router();

companyRouter.get("/", async (req, res) => {
  const { sortBy, sortOrder, search } = req.query;

  //pagination required variable
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  console.log("pageSize: ", pageSize);
  console.log("page: ", page);

  //sort logic
  let sortOption = {};
  if (sortBy && sortOrder) {
    sortOption[sortBy] = sortOrder === "asc" ? 1 : -1;
  }

  //search logic
  let searchQuery = {};
  if (search) {
    searchQuery["companyName"] = { $regex: new RegExp(search, "i") };
  }

  // Calculate the skip and limit for pagination
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    const companyDataLength = await CompanyModel.countDocuments(searchQuery);
    const companyData = await CompanyModel.find(searchQuery)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    res.send({ companyData, total: companyDataLength });
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

companyRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const companyData = await CompanyModel.insertMany(payload);
    res.send({ msg: "Data is added sucessfully" });
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

companyRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    const updatedData = await CompanyModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!updatedData) {
      return res.send({ error: "Company not found" });
    }
    res.send({ msg: "Data Updated Sucessfully" });
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

companyRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteData = await CompanyModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Data Deleted Sucessfully" });
  } catch (error) {
    res.send({ msg: "Something went Wrong", error: error.message });
  }
});

module.exports = {
  companyRouter,
};
