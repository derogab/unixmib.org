//Insert the konami code.
neededkeys = [38,38,40,40,37,39,37,39,66,65], started = false, count = 0;
$(document).keydown(function(e) {
    key = e.keyCode;
    if (!started) {
        if (key == 38) { //Start to check when the first key is pressed.
            started = true;
        }
    }
    if (started) {
        if (neededkeys[count] == key) {
            count++;  //Check if the konami code is insert.
        } else {
            reset();
        }
        if (count == 10) {
            reset();
	    alert('E così volevi barare!');
	    function rotate(myid){ //Function to rotate page elements.
		    var curr_value = document.getElementById(myid).style.transform;
		    var new_value = "rotate(180deg)";
		    if(curr_value !== ""){
			var new_rotate = parseInt(curr_value.replace("rotate(","").replace(")","")) + 180;
			new_value = "rotate(" + new_rotate + "deg)";
		    	}
		    document.getElementById(myid).style.transform = new_value; 
           }
	    rotate('hero');
	    rotate('logo');
	}
    } else {
        reset();
    }
});
function reset() {
    started = false;
    count = 0;
}
