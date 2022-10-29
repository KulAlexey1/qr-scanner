import * as cryptoJs from 'crypto-js';

export class EncryptionUtils {
    public static encrypt(message: string, secretPhrase: string): string {
        return cryptoJs.AES.encrypt(message, secretPhrase).toString();
    }

    public static decrypt(cipherText: string, secretPhrase: string): string {
        const bytes  = cryptoJs.AES.decrypt(cipherText, secretPhrase);

        return bytes.toString(cryptoJs.enc.Utf8);
    }
}