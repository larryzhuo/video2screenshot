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
import CaptureImgWorker from "./capture-worker";
export default class CaptureImgOffscreen extends BaseCaptureImg {
    constructor(options) {
        super(options);
        this.reqMap = new Map();
        this.requestId = 1;
        this.sourceElement = options.sourceElement;
        //创建 offscreen canvas
        let offscreen = new window.OffscreenCanvas(options.width, options.height);
        this.worker = new Worker(CaptureImgWorker);
        this.worker.postMessage({ canvas: offscreen }, [offscreen]);
        //接收消息
        this.worker.onmessage = (ev) => {
            let { requestId, blob } = ev.data;
            let cb = this.reqMap.get(requestId);
            cb && cb(this.formatRet(blob));
            this.reqMap.delete(requestId);
        };
    }
    capture(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options) {
                throw new Error('options空');
            }
            let { cb } = options;
            let id = this.requestId++;
            this.reqMap.set(id, cb);
            let srcEleTag = this.sourceElement.tagName.toLowerCase();
            if (srcEleTag != 'video') {
                throw new Error('not video tag');
            }
            if (!this.imageCapture) {
                let video = this.sourceElement;
                const stream = video.captureStream();
                const [track] = stream.getVideoTracks();
                this.imageCapture = new window.ImageCapture(track);
            }
            let imageBitmap = yield this.imageCapture.grapFrame();
            this.worker.postMessage({ imageBitmap, requestId: id }, [imageBitmap]);
        });
    }
}
//# sourceMappingURL=capture-img-offscreen.js.map