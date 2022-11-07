export class SvgUtils {
    public static openSvgInNewTab(svg: SVGSVGElement) {
        const svgClone = svg.cloneNode(true) as SVGSVGElement;

        const text = new XMLSerializer().serializeToString(svgClone);
        const blob = new Blob([text], { type: "image/svg+xml" });

        const url = URL.createObjectURL(blob);
        const newWindow = open(url);

        newWindow.onload = (evt) => URL.revokeObjectURL(url);
    }
}