import BaseCaptureImg from "./base-capture-img";
import CaptureImgOffscreen from "./capture-img-offscreen";
import CaptureImgOnscreen from "./capture-img-onscreen";
import { CaptureOptions, TypeCaptureImg } from "./proto";

export default class CaptureImgFactory {

    static getImpl(options:TypeCaptureImg):BaseCaptureImg {
        if((window as any).OffscreenCanvas) {
            return new CaptureImgOffscreen(options);
        } else {
            return new CaptureImgOnscreen(options);
        }
    }
}