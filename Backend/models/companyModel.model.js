const mongoose=require("mongoose")

const companySchema=mongoose.Schema({
    companyName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  logo: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
},{versionKey:false})


const CompanyModel=mongoose.model("companyForm",companySchema)

module.exports={
    CompanyModel
}