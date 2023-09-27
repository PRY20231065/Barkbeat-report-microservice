import { Schema } from "dynamoose";
import { ECG } from "../model/historicECG.model";

const ecgSchema = new Schema({
    value: Number,
    timestamp: Number,
})

export const HistoricEcgSchema = new Schema({
    id: {
        type: String,
    },
    dog_id:{
        type: String,
        hashKey: true
    },
    ecg:{
        type: Array,
        schema: [ecgSchema],
    },
    created_time: {
        type: Number,
        rangeKey: true
    },
});

