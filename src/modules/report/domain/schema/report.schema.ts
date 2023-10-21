import { Schema } from "dynamoose";
import { IndexType } from "dynamoose/dist/Schema";

export const ReportSchema = new Schema({
    id: {
        type: String,
        hashKey: true
    },
    dog_id: {
        type: String,
        index: {
            name: 'dog-id-index',
            type: IndexType.global
        }
    },
    owner_id: {
        type: String,
        index: {
            name: 'owner-id-index',
            type: IndexType.global
        }
    },
    veterinarian_id: {
        type: String,
        index: {
            name: 'veterinarian-id-index',
            type: IndexType.global
        }
    },
    description: {
        type: String
    },
    indications: {
        type: Array,
        schema: [String],
    },
    symptoms: {
        type: Array,
        schema: [String],
    },
});

