import { Schema } from "dynamoose";
import { ECG } from "../model/historicECG.model";

export const HistoricEcgSchema = new Schema({
    id: {
        type: String,
    },
    dog_id:{
        type: String,
        hashKey: true
    },
    ecg:{
        type: Array<ECG>,
    },
    created_time: {
        type: Number,
        rangeKey: true
    },
});