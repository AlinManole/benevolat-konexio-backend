const { Schema, model } = require("mongoose")
const User = require("./User")
const Program = require("./Program")


const CoursSchema = Schema({
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    days: [{
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        date: {
            type: Date
        }
    }],
    numberOfPlace: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: String,
    },
    adress: {
        type: String,
        required: true
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