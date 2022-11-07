export class SvgUtils {
    public static openSvgInNewTab(svg: SVGSVGElement, width: number, height: number) {
        const svgClone = svg.cloneNode(true) as SVGSVGElement;

        svgClone.setAttribute('height', width.toString());
        svgClone.setAttribute('width', height.toString());

        const text = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([text], { type: "image/svg+xml" });

        const url = URL.createObjectURL(blob);
        const newWindow = open(url);

        newWindow.onload = (evt) => URL.revokeObjectURL(url);
    }
}