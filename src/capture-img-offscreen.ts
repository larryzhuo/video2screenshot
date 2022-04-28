import BaseCaptureImg from "./base-capture-img";
import { CaptureOptions, TypeCaptureImg } from "./proto";
import CaptureImgWorker from "./capture-worker";

export default class CaptureImgOffscreen extends BaseCaptureImg {
    sourceElement:HTMLVideoElement;
    canvas:any;
    imageCapture:any;
    worker:Worker;
    reqMap:Map<number, any> = new Map();
    requestId:number = 1;

    constructor(options:TypeCaptureImg) {
        super(options);
        
        this.sourceElement = options.sourceElement;

        //创建 offscreen canvas
        let offscreen = new (window as any).OffscreenCanvas(options.width, options.height);
        this.worker = new Worker(CaptureImgWorker);
        this.worker.postMessage({canvas: offscreen}, [offscreen]);

        //接收消息
        this.worker.onmessage = (ev: MessageEvent) => {
            let {requestId, blob} = ev.data;
            let cb = this.reqMap.get(requestId);
            cb && cb(this.formatRet(blob));
            this.reqMap.delete(requestId);
        };
    }

    async capture(options:CaptureOptions) {
        if(!options) {
            throw new Error('options空');
        }
        let {cb} = options;
        let id = this.requestId ++;
        this.reqMap.set(id, cb);
        
        let srcEleTag = this.sourceElement.tagName.toLowerCase();
        if(srcEleTag != 'video') {
            throw new Error('not video tag');
        }

        if(!this.imageCapture) {
            let video:any = this.sourceElement;
            const stream = video.captureStream();
            const [track] = stream.getVideoTracks();
            this.imageCapture = new (window as any).ImageCapture(track);
        }

        let imageBitmap = await this.imageCapture.grapFrame();
        this.worker.postMessage({imageBitmap, requestId:id}, [imageBitmap]);
    }
}