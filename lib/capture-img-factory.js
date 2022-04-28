import CaptureImgOffscreen from "./capture-img-offscreen";
import CaptureImgOnscreen from "./capture-img-onscreen";
export default class CaptureImgFactory {
    static getImpl(options) {
        if (window.OffscreenCanvas) {
            return new CaptureImgOffscreen(options);
        }
        else {
            return new CaptureImgOnscreen(options);
        }
    }
}
//# sourceMappingURL=capture-img-factory.js.map