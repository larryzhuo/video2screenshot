import BaseCaptureImg from "./base-capture-img";
import { CaptureOptions, TypeCaptureImg } from "./proto";
import CaptureImgWorker from "./capture-worker";

export default class CaptureImgOnscreen extends BaseCaptureImg {
    sourceElement:HTMLVideoElement;
    canvas:HTMLCanvasElement;
    imageCapture:any;
    canvasCtx:CanvasRenderingContext2D|null;

    constructor(options:TypeCaptureImg) {
        super(options);
        
        this.sourceElement = options.sourceElement;
        this.canvas = document.createElement('canvas');
        this.canvas.width = options.width;
        this.canvas.height = options.height;
        this.canvasCtx = this.canvas.getContext('2d');
    }

    async capture(options:CaptureOptions) {
        if(!options) {
            throw new Error('options空');
        }
        let { cb } = options;

        let srcEleTag = this.sourceElement.tagName.toLowerCase();
        if(srcEleTag != 'video') {
            throw new Error('not video tag');
        }

        if(!this.canvasCtx) {
            throw new Error('canvas context init fail')
        }
        let video:HTMLVideoElement = this.sourceElement;
        this.canvasCtx.drawImage(video, 0, 0);
        this.canvas.toBlob((blob: Blob | null) => {
            cb && cb(this.formatRet(blob));
        });
    }
}