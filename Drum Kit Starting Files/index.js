var button_array=document.querySelectorAll(".drum");
for(var i=0;i<button_array.length;i++){
    button_array[i].addEventListener('click',function (){
        play_drum(this.innerHTML);
        button_animation(this.innerHTML)
    })
}

function play_drum(key){
    var button_html=key;
        switch (button_html) {
            case 'w':
                var audio=new Audio('sounds/tom-1.mp3');
                audio.play();
                break;

            case 'a':
                var audio=new Audio('sounds/tom-2.mp3');
                audio.play();
                break;

            case 's':
                var audio=new Audio('sounds/tom-3.mp3');
                audio.play();
                break;

            case 'd':
                var audio=new Audio('sounds/tom-4.mp3');
                audio.play();
                break;

            case 'j':
                var audio=new Audio('sounds/snare.mp3');
                audio.play();
                break;

            case 'k':
                var audio=new Audio('sounds/crash.mp3');
                audio.play();
                break;
            
            case 'l':
                var audio=new Audio('sounds/kick-bass.mp3');
                audio.play();
                break;
        
            default:
                break;
        }
}

document.addEventListener('keydown',function(event){
    play_drum(event.key);
    button_animation(event.key);
})

function button_animation(key){
    var activeButton=document.querySelector("."+key);
    activeButton.classList.toggle('pressed');
    setTimeout(function(){
        activeButton.classList.toggle('pressed');
    },100);
}