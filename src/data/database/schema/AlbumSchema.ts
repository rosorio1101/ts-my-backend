import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AlbumSchema = new Schema({
    name: {
        type: String
    },
    releaseDate: {
        type: String
    },
    spotifyUrl: {
        type: String
    },
    imageUrl: {
        type: String
    }

})