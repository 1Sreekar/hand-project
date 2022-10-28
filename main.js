Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
    
    });
    
    camera = document.getElementById("camera");
    
    Webcam.attach('#camera');
    
    function snapshot(){
        Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='captured_image' src="+data_uri+">";
        });
    }
    
    console.log("ml5 version:",ml5.version);
    
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/emCbK0Lhy/model.json",modelLoaded);
    
    function modelLoaded(){
        console.log("Model Loaded!");
    }

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is" + prediction_1;
    speak_data_2 = "And the second Prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis);
}

    function predict(){
         img = document.getElementById("captured_image");
         classifier.classify(img,gotResult)
    }

    function gotResult(error,results){
   if(error){
    console.log(error);
   } else{
    console.log(results);
    document.getElementById("hand_name").innerHTML = results[0].label;
    document.getElementById("hand_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Cool"){
        document.getElementById("emoji").innerHTML = "&#9996;";
    } 
    if(results[0].label == "Good Job"){
        document.getElementById("emoji").innerHTML = "&#128077;";
    } 
    if(results[0].label == "Yo"){
        document.getElementById("emoji").innerHTML = "&#129304;";
    } 

     
    if(results[1].label == "Cool"){
        document.getElementById("emoji2").innerHTML = "&#9996;";
    } 
    if(results[1].label == "Good Job"){
        document.getElementById("emoji2").innerHTML = "&#128077;";
    } 
    if(results[1].label == "Yo"){
        document.getElementById("emoji2").innerHTML = "&#129304;";
    } 
   }
    }