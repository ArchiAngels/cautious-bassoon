let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');

let show_hide_tools = document.getElementById('ToolBarShow');
let tool_bar = document.getElementById('toolBar');
let tools_elems = document.getElementsByClassName('wrap_tool');
let cant_show_hide_tools_timeout = false;

show_hide_tools.addEventListener('click',()=>{
    if(!cant_show_hide_tools_timeout){

        tool_bar.classList.toggle('active');
        for(let i = 0; i < tools_elems.length;i++){
            tools_elems[i].classList.toggle('hide');
        }
        show_hide_tools.children[0].classList.toggle('reverseArrow');

    }else{console.log('to fast wait')}

    cant_show_hide_tools_timeout = true;

    setTimeout(()=>{cant_show_hide_tools_timeout = false},750);
})

let optionsPoints = {
    arrWithRoadPoints:[],
    countNumOfPoint:1,
    colors : [
        '#BEB2C8',
        '#9C7CA5',
        '#E75A7C',
        '#BDB246',
        '#EBF5DF',
        '#F7717D',
        '#A1683A',
    ]
};

let ModifyViewPoints = {
    showLines : document.getElementById('lines'),
    showNums : document.getElementById('nums'),
    spawn_points : document.getElementById('spawn_points')
};

let InputPoints = {
    start_point_input : document.getElementById('point_a'),
    finish_point_input : document.getElementById('point_b')
};

let btns = {
    btn_for_start : document.getElementById('btn_findMinDis'),
    btn_clear : document.getElementById('btn_resetToDefault')
};

let ChoiceYourWay = {
    visit_all : document.getElementById('visitAll'),
    most_faster_road : document.getElementById('mostFasterRoad')
};

let OutPuts = {
    result : document.getElementById('result')
};

let Connections = {
    make_connection : document.getElementById('makeConn'),
    connection_list : document.getElementById('connection_curr_elem'),
    connection_elems: document.getElementById('connection_list_of_connections'),
    deleteConnect : document.getElementById('delConnect'),
    SaveUpdates : document.getElementById('SaveChanges'),
    curr_point : null,
    OnlyAddConnections:false,
    last_clicked_point:null

};

function SaveConnections(){
    Connections.OnlyAddConnections = false;
    Connections.curr_point = null;
    Connections.last_clicked_point = null;
    resizeCNV();
}
function clearAll(){

    optionsPoints.arrWithRoadPoints = [];
    optionsPoints.countNumOfPoint = 1;
    ModifyViewPoints.showLines.checked = false;
    ModifyViewPoints.showNums.checked = false;
    ModifyViewPoints.spawn_points.checked = false;
    InputPoints.start_point_input.value = '';
    InputPoints.finish_point_input.value = '';
    ChoiceYourWay.visit_all.checked = false;
    ChoiceYourWay.most_faster_road.checked = false;
    OutPuts.result.innerHTML = ''
}
let init = ()=>{
    resizeCNV();
    InputPoints.finish_point_input.value = '';
    InputPoints.start_point_input.value = '';
    console.log('Initialized');
}
init();

class roadPoint{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.isVisited = false;
        this.radius = 22;
        this.numOfPoints = optionsPoints.countNumOfPoint;
        this.availablePoints = [];
        this.isFirstConnections = true;
        optionsPoints.arrWithRoadPoints.push(this);
        optionsPoints.countNumOfPoint++;
        makeCircle(this.x,this.y,this.radius,this.color,this.numOfPoints);
        if(optionsPoints.countNumOfPoint > 2 && ModifyViewPoints.showLines.checked){
            showAllRoads();
        }
        // console.log(optionsPoints.arrWithRoadPoints);
    }
    ItIsMe(){
        console.log(this);
    }
    ShowAgainCircle(){
        makeCircle(this.x,this.y,this.radius,this.color,this.numOfPoints);
    }
    ShowConnections(){
        // console.log(this.availablePoints);
        return this.availablePoints
    }
    SetConnection(id){
        console.log('Make conn',id)
        if(id == '' && id != this.countNumOfPoint){return console.log('error ID')}
        else{
            if(this.availablePoints.length == 0){
                this.availablePoints.push({id:id,elem:optionsPoints.arrWithRoadPoints[id-1]});
            }else{
                for(let i = 0; i < this.availablePoints.length;i++){
                    if(this.availablePoints[i].id == id){
                        //skip repeat elem
                        console.log('skip repeated elem');
                        break;
                    }else if(i == this.availablePoints.length - 1){
                        this.availablePoints.push({id:id,elem:optionsPoints.arrWithRoadPoints[id-1]});
                    }
                }
            }
            // this.ShowConnections();
        }
        
    }
    DelConnection(id){
        let arrLength = this.availablePoints.length;
        let tempArr = [];
        for(let i = 0; i < arrLength;i++){
            if(this.availablePoints[i].id == id){console.log('del this')}
            else{tempArr.push(this.availablePoints[i])}
        }
        console.log(tempArr);
    }
}

InputPoints.start_point_input.previousElementSibling.addEventListener('click',()=>{
    InputPoints.start_point_input.value = '';
    if(ModifyViewPoints.spawn_points.checked){
        ModifyViewPoints.spawn_points.click(); // false for spawning points!
    } 
})
InputPoints.finish_point_input.previousElementSibling.addEventListener('click',()=>{
    InputPoints.finish_point_input.value = '';
    if(ModifyViewPoints.spawn_points.checked){
        ModifyViewPoints.spawn_points.click(); // false for spawning points!
    }
})
ChoiceYourWay.visit_all.addEventListener('click',()=>{
    if(ChoiceYourWay.most_faster_road.checked){
        ChoiceYourWay.most_faster_road.click();
        ChoiceYourWay.visit_all.click();
    }
})
ChoiceYourWay.most_faster_road.addEventListener('click',()=>{
    if(ChoiceYourWay.visit_all.checked){
        ChoiceYourWay.visit_all.click();
        ChoiceYourWay.most_faster_road.click();
    }
})
Connections.make_connection.addEventListener('click',()=>{
    ModifyViewPoints.spawn_points.checked = false;
    Connections.deleteConnect.checked = false;
})
Connections.deleteConnect.addEventListener('click',()=>{
    Connections.make_connection.checked = false;
    ModifyViewPoints.spawn_points.checked = false;
})
Connections.SaveUpdates.addEventListener('click',()=>{
    Connections.deleteConnect.checked = false;
    SaveConnections(); 
    Connections.SaveUpdates.checked = false;
    Connections.make_connection.checked = false;
})
ModifyViewPoints.spawn_points.addEventListener('click',()=>{
    Connections.make_connection.checked = false;
    Connections.deleteConnect.checked = false;
})

btns.btn_for_start.addEventListener('click',()=>{SearchMinDistance();})
btns.btn_clear.addEventListener('click',()=>{
    clearAll();
    resizeCNV();
})
ModifyViewPoints.showLines.addEventListener('change',()=>{resizeCNV();})
ModifyViewPoints.showNums.addEventListener('change',()=>{resizeCNV();})
window.addEventListener('resize',()=>{resizeCNV();});
cnv.addEventListener('click',(e)=>{
    let mouseCoors = {
        x:e.clientX - cnv.offsetLeft,
        y:e.clientY - cnv.offsetTop
    }
    // console.log(mouseCoors.x,mouseCoors.y);
    if(ModifyViewPoints.spawn_points.checked){
        console.log('spawn');
        new roadPoint(mouseCoors.x,mouseCoors.y,optionsPoints.colors[optionsPoints.countNumOfPoint%optionsPoints.colors.length]);
    }else if(Connections.make_connection.checked){
        if(Connections.OnlyAddConnections){
            Connections.last_clicked_point = WhichPointClicked();
        }else{
            Connections.curr_point = WhichPointClicked();
        }
        if(Connections.curr_point == null ){console.log('miss on point')}
        else{
            if(Connections.curr_point.isFirstConnections && !Connections.OnlyAddConnections){
                makeSelectedPointSuperVisible(Connections.curr_point.numOfPoints);
                Connections.curr_point.isFirstConnections = false;
                Connections.OnlyAddConnections = true;
                Connections.connection_list.innerHTML = `<p>Point (${Connections.curr_point.numOfPoints}) has connections:</p>`;
            }else{
                if(Connections.last_clicked_point == null){console.log('miss on point')}
                else{
                    Connections.last_clicked_point.ShowAgainCircle();
                    Connections.curr_point.SetConnection(Connections.last_clicked_point.numOfPoints);
                    Connections.connection_elems.innerHTML += `<p class = 'connection_style'> with point (${Connections.last_clicked_point.numOfPoints})</p>`;
                }
                
            }
        }
    }else if (Connections.deleteConnect.checked){
        console.log('DELETE');
    }else if(Connections.SaveUpdates.checked){
        console.log('SAVE');
    }
    else{
        WhichPointClicked();
    }
    function WhichPointClicked(){
        let arr = optionsPoints.arrWithRoadPoints;
        let m = mouseCoors;
    
        for(let i =0; i < arr.length;i++){
            if(arr[i].x - arr[i].radius <= m.x && m.x <= arr[i].x + arr[i].radius &&
                arr[i].y - arr[i].radius <= m.y && m.y <= arr[i].y + arr[i].radius ){
                    console.log(arr[i],'clicked here');
                    return arr[i];
                }
        }
        return null;
    }
})


window.addEventListener('keyup',(e)=>{
    console.log(e.target,typeof(e.key));
    let st_p = InputPoints.start_point_input;
    let f_p = InputPoints.finish_point_input;
    let max_num = optionsPoints.countNumOfPoint;
        
        if(e.target == st_p){
            verifyInputNums();
            // FocusNextInp(f_p);
            verifyInputDifference();
        }
        else if (e.target == f_p){
            verifyInputNums();
            // FocusNextInp(st_p);
            verifyInputDifference();
        }
        else{ return console.error('ERROR target isn\'t start or finish point input')}
        

        function verifyInputNums(){
            let input = e.target.value;
            let temp = '';
            for(let i = 0; i < input.length;i++){
                if(input[i]%2 >= 0){
                    console.log(input[i]);
                    temp += input[i];
                }else{
                    error_value_inp(e.target);
                }
            }
            if(Number(temp) < max_num){
                console.log(temp,max_num);
                e.target.value = temp;
            }else{
                e.target.value = '';
                error_value_inp(e.target);
            }
            console.log(temp,max_num);
            
        }
        function error_value_inp(elem){
            elem.classList.toggle('errorInpDif');
            setTimeout(()=>{
                elem.classList.toggle('errorInpDif');
            },600);
        }
        function verifyInputDifference(){
            if(st_p.value == f_p.value && f_p.value != ''){
                st_p.value = '';
                error_value_inp(st_p);
                st_p.focus();
            }
        }
})

function SearchMinDistance(){
    let st_p = InputPoints.start_point_input.value - 1;
    let f_p = InputPoints.finish_point_input.value - 1;
    let arr = optionsPoints.arrWithRoadPoints;

    let x = getDistanceX(arr[st_p].x,arr[f_p].x);
    let y = getDistanceY(arr[st_p].y,arr[f_p].y);

    

    console.log('POINT A::',arr[st_p]);
    console.log('POINT B::',arr[f_p]);

    console.log('x::',x,'y::',y,'dist::',getClearDist(x,y));

    function getDistanceX(x1,x2){
        return Math.max(x1,x2) - Math.min(x1,x2);
    }
    function getDistanceY(y1,y2){
        return Math.max(y1,y2) - Math.min(y1,y2);
    }
    function getClearDist(x,y){
        let cat1 = x*x;
        let cat2 = y*y;
        let diagonal = Math.sqrt((cat1 + cat2));
        return diagonal
    }
}







function makeCircle(x,y,rad,color,num){
    // console.log('make Circle',x,y,rad,color);
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
function makeSelectedPointSuperVisible(id){
    if(id == null){return 0}
    else{
        let arr = optionsPoints.arrWithRoadPoints;

        ctx.beginPath();
    
        ctx.clearRect(0,0,cnv.width,cnv.height);
    
        showAllCircle();
        
        ctx.rect(0,0,cnv.width,cnv.height);
        ctx.fillStyle = '#ffffff90';
        ctx.fill();
    
        arr[id-1].ShowAgainCircle();
    
        ctx.stroke();
    }
    
}
function makeLine(x1,y1,x2,y2){
    // console.log('draw Line');
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

function showAllCircle(){
    let arr = optionsPoints.arrWithRoadPoints;
    for(let i =0; i < arr.length;i++){
        arr[i].ShowAgainCircle();
    }
}
function showAllRoads(){
    let arr = optionsPoints.arrWithRoadPoints;
    for(let i =0; i < arr.length;i++){
        let arr_with_conn = arr[i].ShowConnections();
        // console.log(typeof(arr_with_conn),arr_with_conn,arr_with_conn.length);
        if(arr_with_conn.length < 1){
            // console.log('EMPTY');
            continue
        }else{
            // console.log(arr_with_conn,arr_with_conn.length);
                for(let j = 0; j < arr_with_conn.length;j++){
                    // console.log(j,arr_with_conn[j].elem.x,arr_with_conn[j].elem.y);
                    makeLine(arr[i].x,arr[i].y,arr_with_conn[j].elem.x,arr_with_conn[j].elem.y);
                }
        }
    }
}
function resizeCNV(){
    ctx.clearRect(0,0,cnv.width,cnv.height);

    cnv.width = (window.innerWidth * 0.8);
    cnv.height = (window.innerHeight * 0.8);
    cnv.style.height = window.innerHeight * 0.8 +'px';
    cnv.style.width = window.innerWidth * 0.8 +'px';

    cnv.style.background = 'white';
    showAllCircle();
    if(ModifyViewPoints.showLines.checked){
        showAllRoads();
    }
    
}