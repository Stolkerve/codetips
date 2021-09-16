import {JsonConverter, JsonCustomConvert} from "json2typescript"

@JsonConverter
export class BoolConverter implements JsonCustomConvert<Boolean> {
    serialize(boolean: any): any {
        return boolean ? true : false;
    }
    
    deserialize(boolean: any): any {
        return boolean ? 1 : 0;
    }
    
}