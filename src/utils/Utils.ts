const rp = require("request-promise");
export class Utils {
    public static IsNullOrEmpty(value: string) {
        if (value === undefined || value == "" || value == null) {
            return true;
        }
        return false;
    }

    public static IsNull(value: any) {
        if (value === undefined || value === null) {
            return true;
        }
        return false;
    }

   
}
