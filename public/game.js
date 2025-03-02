// click events on rocket parts
document.getElementById("rocket-body").addEventListener("click", function() {
    /*when clicked goes to mini game*/
    window.location.href = '/memory.html';
    let Wonboolean = localStorage.getItem('MemoryBool') === 'true';

    if (Wonboolean) { 
        document.getElementById("rocket-body").classList.add("completed-body");
        // This will colour in the element
        document.getElementById("rocket-window").classList.add("completed-window");
    }
    

});
  
document.getElementById("rocket-nose").addEventListener("click", function() {
    window.location.href = '/asteroidracer.html';
    let Wonboolean = localStorage.getItem('RacerBool') === 'true';

    if (Wonboolean) { 
        document.getElementById("rocket-nose").classList.add("completed-nose");
        
    }
});
  
document.getElementById("rocket-fin-left").addEventListener("click", function() {
    window.location.href='/whackemole.html'
    let Wonboolean = localStorage.getItem('WhackBool') === 'true';

    if (Wonboolean) { 
        document.getElementById("rocket-fin-left").classList.add("completed-fin-left");
        
    }
});
  
document.getElementById("rocket-fin-right").addEventListener("click", function() {
    
});
  
document.getElementById("booster-left").addEventListener("click", function() {
    
});
  
document.getElementById("booster-right").addEventListener("click", function() {
    
});

document.getElementById("Reset_button").addEventListener("click", function(){
    localStorage.removeItem('MemoryBool');
    localStorage.removeItem('RacerBool');
    localStorage.removeItem('WhackBool');

    document.getElementById("rocket-body").classList.remove("completed-body");
    document.getElementById("rocket-window").classList.remove("completed-window");
    document.getElementById("rocket-nose").classList.remove("completed-nose");
    document.getElementById("rocket-fin-left").classList.remove("completed-fin-left");

    document.getElementById("rocket-body").style.pointerEvents = "auto";
    document.getElementById("rocket-window").style.pointerEvents = "auto";
    document.getElementById("rocket-nose").style.pointerEvents = "auto";
    document.getElementById("rocket-fin-left").style.pointerEvents = "auto";

})
  

window.onload = function(){
    const MemoryBool = localStorage.getItem('MemoryBool') === 'true';
    if (MemoryBool) {
        document.getElementById("rocket-body").classList.add("completed-body");
        document.getElementById("rocket-window").classList.add("completed-window");
    }
    document.getElementById("rocket-body").style.pointerEvents = "none";
    document.getElementById("rocket-window").style.pointerEvents = "none";

    // Check if the player won the racer game
    const RacerBool = localStorage.getItem('RacerBool') === 'true';
    if (RacerBool) {
        document.getElementById("rocket-nose").classList.add("completed-nose");
        document.getElementById("rocket-nose").style.pointerEvents = "none";
    }

    // Check if the player won the whack-a-mole game
    const WhackBool = localStorage.getItem('WhackBool') === 'true';
    if (WhackBool) {
        document.getElementById("rocket-fin-left").classList.add("completed-fin-left");
        document.getElementById("rocket-fin-left").style.pointerEvents = "none";
    }


}

  