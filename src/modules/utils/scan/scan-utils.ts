import jsQR from 'jsqr';

export class ScanUtils {
    public static scanFromVideo(
        videoElement: HTMLVideoElement,
        canvasElement: HTMLCanvasElement
    ) : string | undefined {
        const videoWidth = videoElement.clientWidth;
        const videoHeight = videoElement.clientHeight;

        canvasElement.width  = videoWidth;
        canvasElement.height = videoHeight;
    
        const canvas2dContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
        canvas2dContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);
        
        const imageData = canvas2dContext.getImageData(0, 0, videoWidth, videoHeight);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        return qrCode?.data;
    }
}