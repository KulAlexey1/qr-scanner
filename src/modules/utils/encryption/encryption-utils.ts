import * as cryptoJs from 'crypto-js';

export class EncryptionUtils {
    public static encrypt(message: string, secretPhrase: string): string {
        const bytes = cryptoJs.AES.encrypt(message, secretPhrase);

        return bytes.toString();
    }

    public static decrypt(cipherText: string, secretPhrase: string): string {
        const bytes  = cryptoJs.AES.decrypt(cipherText, secretPhrase);

        try {
            return bytes.toString(cryptoJs.enc.Utf8);
        } catch { // malformed UTF-8 error
            return '';
        }
    }
}