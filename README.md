# video2screenshot
fast video screenshot, use offscreencanvas and webworker to speed screenshot。
if browser not support offscreencanvas api, it will fall back to canvas。 

html example:
```html
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        <video src="https://www.runoob.com/try/demo_source/movie.mp4"></video>
    
        <script type="module" src="../lib/capture-img-factory.js"></script>
        <script type="module">
            import CaptureImgFactory from '../lib/capture-img-factory.js';
            let ins = CaptureImgFactory.getImpl({
                sourceElement: document.querySelector('video'),
                width: 720,
                height: 1080
            });
            setInterval(() => {
                ins.capture({
                    cb: (data) => {
                        console.log('screenshot:', data);
                    }
                })
            }, 1000);
        </script>
    </body>
</html>
```

more detail please look /example



