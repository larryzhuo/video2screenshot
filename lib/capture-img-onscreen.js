var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseCaptureImg from "./base-capture-img";
export default class CaptureImgOnscreen extends BaseCaptureImg {
    constructor(options) {
        super(options);
        this.sourceElement = options.sourceElement;
        this.canvas = document.createElement('canvas');
        this.canvas.width = options.width;
        this.canvas.height = options.height;
        this.canvasCtx = this.canvas.getContext('2d');
    }
    capture(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options) {
                throw new Error('options空');
            }
            let { cb } = options;
            let srcEleTag = this.sourceElement.tagName.toLowerCase();
            if (srcEleTag != 'video') {
                throw new Error('not video tag');
            }
            if (!this.canvasCtx) {
                throw new Error('canvas context init fail');
            }
            let video = this.sourceElement;
            this.canvasCtx.drawImage(video, 0, 0);
            this.canvas.toBlob((blob) => {
                cb && cb(this.formatRet(blob));
            });
        });
    }
}
//# sourceMappingURL=capture-img-onscreen.js.map