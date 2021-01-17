 objects = [];
 status = "";

 function preload()
 {
    video = createVideo('video.mp4');
 }

 function setup()
 {
    canvas = createCanvas(380,280);
    canvas.center();
    video.hide();
 }

 function start()
 {
     objectDetector = ml5.objectDetector('cocossd',modelLoaded);
     document.getElementById("status").innerHTML = "status: detecting objects";
 }

 function modelLoaded()
 {
     console.log("model loaded successfully!");
     status = true;
     video.loop();
     video.speed(1);
     video.volume(0);
 }

 function gotResult(error,results)
 {
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
 }

 function draw()
 {
    image(video,0,0,380,280);
    if (status != "")
    {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are: "+ objects.length;

            fill("#0095ff");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0095ff");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
 }