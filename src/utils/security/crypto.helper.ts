const crypto = require("crypto");
import CONFIG from "../../config";

export class CryptoHelper {
    public static hash(value: string) {
        const hash = crypto.createHmac("sha256", CONFIG.ENV_CONFIG.J_CRYPTO_SECRET); /** Hashing algorithm sha256 */
        hash.update(value);
        const hashedValue = hash.digest("hex");
        return hashedValue;
    }

    public static verifyHash(newValue: string, hashString: string) {
        const hash = crypto.createHmac("sha256", CONFIG.ENV_CONFIG.J_CRYPTO_SECRET); /** Hashing algorithm sha256 */
        hash.update(newValue);
        const hashedValue = hash.digest("hex");
        if (hashedValue == hashString) {
            return true;
        }
        return false;
    }
}