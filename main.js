img="";
status="";
objects = [];

function preload(){
    img=loadImage("dog_cat.jpg");
    
}

function setup(){
    canvas=createCanvas(800, 600);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(800, 600);
    video.hide();
    
   
}

function start(){
    object_detector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelloaded(){
    console.log("model loaded");
    status=true;
   
}

function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video, 0, 0, 800, 600);
    
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        object_detector.detect(video, gotresult);
       for (i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML="Status: Object detected!";
        document.getElementById("number_obj").innerHTML="The number of objects identified are:"+ objects.length ;
        fill(r, g, b);
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + " %", objects[i].x+5, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width-60, objects[i].height);
       } 
    }

    
    
    
}

