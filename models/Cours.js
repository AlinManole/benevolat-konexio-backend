const { Schema, model } = require("mongoose")
const User = require("./User")
const Program = require("./Program")


const CoursSchema = Schema({
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program"
    },
    days: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date
        }
    }],
    numberOfPlace: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: String
    },
    adress: {
        type: String
    }
}, {
    timestamps: true
})
CoursSchema.post("save", async(cours)=>{
await Program.findByIdAndUpdate(cours.program, {$push: {cours:cours._id}})
})

CoursSchema.pre("findByIdAndDelete", async(cours)=>{
    await Program.findByIdAndUpdate(cours.program, {$pull: {cours:cours._id}})
    await User.updateMany({cours:cours._id}, {$pull: {cours:cours._id}})
})

const Cours = model('Cours', CoursSchema)

module.exports = Cours