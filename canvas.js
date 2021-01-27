console.log('CANVAS CONNECTED',newScript());

let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');


function resizeCNV(){
    ctx.clearRect(0,0,cnv.width,cnv.height);

    cnv.width = (window.innerWidth * 0.8);
    cnv.height = (window.innerHeight * 0.8);
    cnv.style.height = window.innerHeight * 0.8 +'px';
    cnv.style.width = window.innerWidth * 0.8 +'px';

    cnv.style.background = 'white';
    showAllCircle();
    if(ModifyViewPoints.showLines.checked){
        Connections.showFullCommunications();
    }
    
}


function makeLine(x1,y1,x2,y2){
    // //console.log('draw Line');
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    // if(color){
    //     ctx.lineWidth = 2;
    //     ctx.strokeStyle = color;
    // }
    ctx.stroke();
}

function makeSelectedPointSuperVisible(id = null){
    
    
    let arr = optionsPoints.arrWithRoadPoints;

    ctx.beginPath();

    ctx.clearRect(0,0,cnv.width,cnv.height);

    showAllCircle();
    
    ctx.rect(0,0,cnv.width,cnv.height);
    ctx.fillStyle = '#ffffff90';
    ctx.fill();
    
        if(id == null){return 0}
        else{
            arr[id-1].ShowAgainCircle();
        }
    
    

    ctx.stroke();
    
}

function makeCircle(x,y,rad,color,num){
    // //console.log('make Circle',x,y,rad,color);
    ctx.beginPath();
    ctx.arc(x,y,rad,0,Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    if(ModifyViewPoints.showNums.checked){
        ctx.fillStyle = '#000';
        ctx.font = "30px Arial";
        ctx.fillText(num, x, y);
    }
    
    ctx.stroke();
}