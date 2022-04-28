import { CaptureOptions, TypeCaptureImg } from "./proto";

export default abstract class BaseCaptureImg {
    constructor(options:TypeCaptureImg) {

    }

    abstract capture(options:CaptureOptions):void;

    formatRet(blob:Blob|null) {
        return {
            type: 'blob',
            data: blob
        }
    }
}