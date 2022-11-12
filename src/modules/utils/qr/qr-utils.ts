import jsQR from 'jsqr';
import QRCode from 'qrcode-svg';
import { Observable } from 'rxjs';

export class QRUtils {
    public static scanCodeFromVideo(
        videoElement: HTMLVideoElement,
        canvasElement: HTMLCanvasElement,
        willScanFrequently: boolean
    ) : string | undefined {
        const videoWidth = videoElement.clientWidth;
        const videoHeight = videoElement.clientHeight;

        canvasElement.width  = videoWidth;
        canvasElement.height = videoHeight;
    
        const canvas2dContext = canvasElement.getContext('2d',
            { willReadFrequently: willScanFrequently }) as CanvasRenderingContext2D;
        canvas2dContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
        
        const imageData = canvas2dContext.getImageData(0, 0, videoWidth, videoHeight);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        return qrCode?.data;
    }

    public static scanCodeFromImgFile(
        imgFile: File,
        canvasElement: HTMLCanvasElement,
        willScanFrequently: boolean
    ) : Observable<string | undefined> {
        return new Observable((observer) => {
            const url = URL.createObjectURL(imgFile);

            const img = new Image();
            img.src = url;

            img.onload = () => {
                URL.revokeObjectURL(img.src);

                const canvas2dContext = canvasElement.getContext('2d',
                    { willReadFrequently: willScanFrequently }) as CanvasRenderingContext2D;

                canvas2dContext.drawImage(img, 0, 0, img.width, img.height,
                    0, 0, canvasElement.width, canvasElement.height);

                const imageData = canvas2dContext.getImageData(0, 0, img.width, img.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                observer.next(qrCode?.data);
                observer.complete();
            };

            img.onerror = (error) => observer.error(error);
        });
    }

    public static generateCode(data: string): string {
        const qrcode = new QRCode({
            content: data,
            container: 'svg-viewbox', //Responsive use
            join: true //Crisp rendering and 4-5x reduced file size
        });

        return qrcode.svg();
    }
}