import { map, Observable } from 'rxjs';

export class SvgUtils {
    public static openSvgInNewTab(svg: SVGSVGElement) {
        const blob = this.buildSvgBlob(svg);

        const url = URL.createObjectURL(blob);
        const newWindow = open(url);

        newWindow.onload = () => URL.revokeObjectURL(url);
    }

    public static saveSvgAsPng(svg: SVGSVGElement, fileName: string) {
        const blob = this.buildSvgBlob(svg);

        return this.buildCanvasWithBlob(blob).pipe(
            map((canvas) => {
                const url = canvas.toDataURL('image/png');

                return this.openUrl(url, fileName + '.png');
            })
        );
    }

    private static buildSvgBlob(svg: SVGSVGElement) {
        const svgClone = svg.cloneNode(true) as SVGSVGElement;

        const text = new XMLSerializer().serializeToString(svgClone);
        return new Blob([text], { type: "image/svg+xml" });
    }

    private static buildCanvasWithBlob(blob: Blob, width: number = 600, height: number = 600) {
        return new Observable<HTMLCanvasElement>((observer) => {
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.src = url;

            img.onload = () => {
                const canvasElement = document.createElement("canvas");
                canvasElement.setAttribute("width", width.toString());
                canvasElement.setAttribute("height", height.toString());

                const canvas2dContext = canvasElement.getContext('2d',
                    { willReadFrequently: false }) as CanvasRenderingContext2D;

                canvas2dContext.drawImage(img, 0, 0, width, height,
                    0, 0, canvasElement.width, canvasElement.height);

                URL.revokeObjectURL(img.src);

                observer.next(canvasElement);
                observer.complete();
            };

            img.onerror = (error) => observer.error(error);
        });
    }

    private static openUrl(url: string, fileName: string) {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;

        a.click();

        URL.revokeObjectURL(url);
    }
}