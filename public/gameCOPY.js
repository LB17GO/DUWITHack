function completeRocketPart(rocketPartID, flag) {
        let isCompleted = localStorage.getItem(flag) === 'true';

        if (isCompleted) {
            document.getElementById(rocketPartID).classList.remove("incomplete");
            document.getElementById(rocketPartID).classList.add("complete");
        }
}

function resetRocketPart(rocketPartID, isCompleted) {
    if (isCompleted === false) {
        document.getElementById(rocketPartID).classList.remove("complete");
        document.getElementById(rocketPartID).classList.add("incomplete");
    } else if (isCompleted === true) {
        document.getElementById(rocketPartID).classList.add("complete");
        document.getElementById(rocketPartID).classList.remove("incomplete");
    }
}

// click events on rocket parts
document.getElementById("rocket-body").addEventListener("click", function() {
    /*when clicked goes to mini game*/
    window.location.href = 'sources/memory.html';
    completeRocketPart("rocket-body", "MemoryBool");
    completeRocketPart("rocket-window", "MemoryBool");
});
  
document.getElementById("rocket-nose").addEventListener("click", function() {
    window.location.href = 'sources/asteroidracer.html';
    completeRocketPart("rocket-nose", "RacerBool");
});
  
document.getElementById("rocket-fin-left").addEventListener("click", function() {
    window.location.href='sources/whackemole.html';
    completeRocketPart("rocket-fin-left", "WhackBool");
});
  
document.getElementById("rocket-fin-right").addEventListener("click", function() {
    window.location.href='sources/mathGame.html';
    completeRocketPart("rocket-fin-right", "MathBool");
});
  
document.getElementById("booster-left").addEventListener("click", function() {
    window.location.href='sources/sortingGame.html';
    completeRocketPart("booster-left", "SortingBool");
});
  
document.getElementById("booster-right").addEventListener("click", function() {
    window.location.href='sources/Invaders.html';
    completeRocketPart("booster-right", "InvadersBool");
});

document.getElementById("Reset_button").addEventListener("click", function(){
    localStorage.clear();

    resetRocketPart("rocket-body", false);
    resetRocketPart("rocket-window", false);
    resetRocketPart("rocket-nose", false);
    resetRocketPart("rocket-fin-left", false);
    resetRocketPart("rocket-fin-right", false);
    resetRocketPart("booster-left", false);
    resetRocketPart("booster-right", false);

})
  

window.onload = function(){
    const MemoryBool = localStorage.getItem('MemoryBool') === 'true';
    if (MemoryBool) {
        resetRocketPart("rocket-body", true);
        resetRocketPart("rocket-window", true);
    }

    // Check if the player won the racer game
    const RacerBool = localStorage.getItem('RacerBool') === 'true';
    if (RacerBool) {
        resetRocketPart("rocket-nose", true);
    }

    // Check if the player won the whack-a-mole game
    const WhackBool = localStorage.getItem('WhackBool') === 'true';
    if (WhackBool) {
        resetRocketPart("rocket-fin-left", true);
    }

    const MathBool = localStorage.getItem('MathBool') === 'true';
    if (MathBool) {
        resetRocketPart("rocket-fin-right", true);
    }

    const SortingBool = localStorage.getItem('SortingBool') === 'true';
    if (SortingBool) {
        resetRocketPart("booster-left", true);
    }

}



  