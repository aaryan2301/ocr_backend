const mongoose= require("mongoose");

const recordSchema= mongoose.Schema({
    customId: {
        type: String,
        unique: true // Ensures the custom ID is unique
    },
    ocrResult: {
        type: Object,
    },
    timestamp: {
        type: String,
    },
    status: {
        type: String,
    },
},
{
    timestamps: true,
}
);

module.exports= mongoose.model("Record", recordSchema);