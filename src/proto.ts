export type TypeCaptureImg = {
    sourceElement: HTMLVideoElement;
    width: number;
    height: number;
}

export type CaptureOptions = {
    cb: any;
}

export type CaptureRet = {
    requestId: number;
    blob: any;
}

export const CaptureImgBlobEvent = 'CaptureImgBlobEvent';