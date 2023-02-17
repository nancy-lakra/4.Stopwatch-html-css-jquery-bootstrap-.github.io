$(function(){

    //variables
    var mode = 0;                   //to decide app mode
    var timecounter = 0;            //to count time
    var lapcounter = 0;             //to count lap time
    var action;                     //for set interval
    var lapno = 0;                  //to count no. of laps
    var timemin, timesec, timemsec; //to count time as part of three
    var lapmin, lapsec, lapmsec;    //to count laptime as part of three

    //function to hide and show relevant buttons
    hideshow("#start","#lap");              //show start and stop button

    //function when click on start
    $("#start").click(function(){
        mode = 1;                           //mode on
        hideshow("#stop","#lap");           //show stop and lap button
        startAction();                      //start the counter
    });

    //function when click on stop
    $("#stop").click(function(){
        hideshow("#resume","#reset");       //show resume and reset buttons
        clearInterval(action);              //stop the counter
    });

    //function when click on resume
    $("#resume").click(function(){
        hideshow("#stop","#lap");           //show stop and lap button
        startAction();                      //resume the counter
    });

    //function when click on reset
    $("#reset").click(function(){
        location.reload();                  //reload the page
    });

    //function when click on lap
    $("#lap").click(function(){
        if(mode){                       //IF MODE IS ON, THEN
            clearInterval(action);           //stop the counter
            lapcounter = 0;                  //reset lap
            addlap();                        //print lap details
            startAction();                   //resume the counter
        }
        else
        {

        }
    });

    //FUNCTION DECLARATIONS
    
    //function to hide and show relevant buttons
    function hideshow(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //function to start the main action
    function startAction(){
        action = setInterval(function(){
            //increase time counter
            timecounter++;
            if(timecounter==100*60*100){
                timecounter = 0;
            }
            //increase lap counter
            lapcounter++;
            if(lapcounter==100*60*100){
                lapcounter = 0;
            }
            //update the time in min, sec, msec
            updatetime();
        },10);
    }

    //function to convert counter to min, sec, millisec
    function updatetime(){
        timemin = Math.floor(timecounter/6000);          //update min
        timesec = Math.floor((timecounter%6000)/100);    //update sec
        timemsec = Math.floor((timecounter%6000)%100);   //update msec

        $("#timemin").text(format(timemin));
        $("#timesec").text(format(timesec));
        $("#timemsec").text(format(timemsec));

        lapmin = Math.floor(lapcounter/6000);            //update min
        lapsec = Math.floor((lapcounter%6000)/100);      //update sec
        lapmsec = Math.floor((lapcounter%6000)%100);     //update msec

        $("#lapmin").text(format(lapmin));
        $("#lapsec").text(format(lapsec));
        $("#lapmsec").text(format(lapmsec));
    }

    //function to format numbers in time
    function format(n){
        if(n<10){
            return '0'+n;
        }
        else{
            return n;
        }
    }

    //function to print lap details
    function addlap(){
        lapno++;
        var detail = '<div class="laps">'+
                        '<div class="laptimetitle">'+
                            'Lap '+lapno+
                        '</div>'+
                        '<div class="laptimedeet">'+
                            '<span>'+format(lapmin)+'</span>:'+
                            '<span>'+format(lapsec)+'</span>:'+
                            '<span>'+format(lapmsec)+'</span>'+
                        '</div>'+
                     '</div>';
        $(detail).appendTo("#lapdata");
    }
});