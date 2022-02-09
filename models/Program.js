const { Schema, model } = require("mongoose")


const ProgramSchema = Schema({
    name: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    cours: [{
        type: Schema.Types.ObjectId,
        ref: "Cours"
    }]
}, {
    timestamps: true
})

const Program = model('Program', ProgramSchema)

module.exports = Program