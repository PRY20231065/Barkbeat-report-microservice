import { Schema } from "dynamoose";

export const HistoricPulseSchema = new Schema({
    id: {
        type: String,
    },
    dog_id:{
        type: String,
        hashKey: true
    },
    beats_per_minute:{
        type: Number,
    },
    avg:{
        type: Number
    },
    created_time: {
        type: Number,
        rangeKey: true
    },
});

