import jsQR from 'jsqr';
import QRCode from 'qrcode-svg';

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
    
        const canvas2dContext = canvasElement.getContext('2d', { willReadFrequently: willScanFrequently }) as CanvasRenderingContext2D;
        canvas2dContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
        
        const imageData = canvas2dContext.getImageData(0, 0, videoWidth, videoHeight);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        return qrCode?.data;
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