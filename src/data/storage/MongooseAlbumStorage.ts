
import * as mongoose from 'mongoose';
import AlbumStorage from "./AlbumStorage";
import Album from "../../domain/model/Album";
import { AlbumSchema } from '../database/schema/AlbumSchema';

const AlbumEntity = mongoose.model('Album', AlbumSchema);

export default class MongooseAlbumStorage implements AlbumStorage {
    public saveAll = (album: Array<Album>) => {
        album.forEach((album: Album) => {
            let entity = new AlbumEntity(album);
            entity.save();
        });
    }
}