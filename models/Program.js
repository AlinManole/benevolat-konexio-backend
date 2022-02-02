const { Schema, model } = require("mongoose")

const ProgramSchema = Schema({
    name: {
        type: Sring
    },
    hours: {
        type: Number
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