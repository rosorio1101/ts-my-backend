import { AxiosResponse } from "axios";
import Mapper from "../../domain/mapper/Mapper";
import Album from "../../domain/model/Album";

export default class AlbumsMapper extends Mapper<Object, Album> {
    public map(data : Object): Album {
        return new Album(data["name"], 
                        data["release_date"],
                        data["external_urls"]["spotify"], 
                        data["images"][0]["url"]);
    }
}