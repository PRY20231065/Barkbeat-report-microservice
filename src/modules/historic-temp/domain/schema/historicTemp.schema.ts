import { Schema } from "dynamoose";

export const HistoricTemperatureSchema = new Schema({
    id: {
        type: String,
    },
    dog_id:{
        type: String,
        hashKey: true
    },
    temp:{
        type: Number
    },
    created_time: {
        type: Number,
        rangeKey: true
    },
});

