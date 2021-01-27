console.log('CLICKS CONNECTED',newScript());

InputPoints.start_point_input.addEventListener('click',()=>{
    InputPoints.start_point_input.value = '';
    ModifyViewPoints.spawn_points.checked = false;
})
InputPoints.finish_point_input.addEventListener('click',()=>{
    InputPoints.finish_point_input.value = '';
    ModifyViewPoints.spawn_points.checked = false;
})
ChoiceYourWay.visit_all.addEventListener('click',()=>{
    ChoiceYourWay.most_faster_road.checked = false;
})
ChoiceYourWay.most_faster_road.addEventListener('click',()=>{
    ChoiceYourWay.visit_all.checked = false;
})
Connections.make_connection.addEventListener('click',()=>{
    ModifyViewPoints.spawn_points.checked = false;
    Connections.deleteConnect.checked = false;
    Connections.ConnectInfo.checked = false;
})
Connections.deleteConnect.addEventListener('click',()=>{
    Connections.make_connection.checked = false;
    ModifyViewPoints.spawn_points.checked = false;
})
Connections.SaveUpdates.addEventListener('click',()=>{
    Connections.deleteConnect.checked = false;
    SaveConnections(); 
    ResetToDefaultVisitPoints();
    Connections.SaveUpdates.checked = false;
    Connections.make_connection.checked = false;
})
Connections.ConnectInfo.addEventListener('click',()=>{
    Connections.deleteConnect.checked = false;
    Connections.SaveUpdates.checked = false;
    Connections.make_connection.checked = false;

    ModifyViewPoints.spawn_points.checked = false;

    if(Connections.ConnectInfo.checked == false){
        resizeCNV();
    }
})
ModifyViewPoints.spawn_points.addEventListener('click',()=>{
    Connections.make_connection.checked = false;
    Connections.deleteConnect.checked = false;
})

btns.btn_for_start.addEventListener('click',()=>{
    optionsPoints.Stage = 0;
    optionsPoints.arrPoints = [];
    startSearchingWay();
})
btns.btn_clear.addEventListener('click',()=>{
    clearAll();
    resizeCNV();
})
ModifyViewPoints.showLines.addEventListener('click',()=>{resizeCNV();})
ModifyViewPoints.showNums.addEventListener('click',()=>{resizeCNV();})

window.addEventListener('resize',()=>{resizeCNV();});
cnv.addEventListener('click',(e)=>{
    let mouseCoors = {
        x:e.clientX - cnv.offsetLeft,
        y:e.clientY - cnv.offsetTop
    }
    // //console.log(mouseCoors.x,mouseCoors.y);
    if(ModifyViewPoints.spawn_points.checked){
        //console.log('spawn');
        new roadPoint(mouseCoors.x,mouseCoors.y,optionsPoints.colors[optionsPoints.countNumOfPoint%optionsPoints.colors.length]);
    }else if(Connections.make_connection.checked){
        if(Connections.OnlyAddConnections){
            Connections.last_clicked_point = WhichPointClicked(mouseCoors);
        }else{
            Connections.curr_point = WhichPointClicked(mouseCoors);
        }
        if(Connections.curr_point == null ){//console.log('miss on point')
    }
        else{
            if(!Connections.OnlyAddConnections){
                makeSelectedPointSuperVisible(Connections.curr_point.numOfPoints);
                // Connections.curr_point.isFirstConnections = false;
                Connections.OnlyAddConnections = true;
                Connections.UpdateConnectionsInfo();
                
                
            }else{
                if(Connections.last_clicked_point == null || Connections.last_clicked_point == Connections.curr_point){//console.log('miss on point')
            }
                else{
                    Connections.last_clicked_point.ShowAgainCircle();
                    
                    Connections.curr_point.SetConnection(Connections.last_clicked_point.numOfPoints);
                    // showAllRoads();
                    Connections.showFullCommunications();
                    Connections.UpdateConnectionsInfo();
                }
                
            }
        }
    }else if (Connections.deleteConnect.checked){
        //console.log('DELETE');
        if(Connections.OnlyAddConnections){
            Connections.last_clicked_point = WhichPointClicked(mouseCoors);
            if(Connections.last_clicked_point == null){//console.log('last click delete miss on point')
        }
            else{
                Connections.curr_point.DelConnection(Connections.last_clicked_point.numOfPoints);
                
                Connections.UpdateConnectionsInfo();
                Connections.SaveUpdates.click();
            }
        }else{
            Connections.curr_point = WhichPointClicked(mouseCoors);
            if(Connections.curr_point == null){//console.log('curr point delete miss on point')
        }
            else{
                Connections.OnlyAddConnections = true;
            }
            
        }
    }else if(Connections.SaveUpdates.checked){
        //console.log('SAVE');
    }
    else{
        WhichPointClicked(mouseCoors);
    }
})
cnv.addEventListener('mousemove',(e)=>{
    let mouseCoors = {
        x:e.clientX - cnv.offsetLeft,
        y:e.clientY - cnv.offsetTop
    };
    if(Connections.ConnectInfo.checked == true){
        Connections.curr_point = WhichPointClicked(mouseCoors);
        if(Connections.curr_point == null){ //console.log('empty area');resizeCNV()
    }
        else{
            makeSelectedPointSuperVisible(Connections.curr_point.numOfPoints);
            Connections.UpdateConnectionsInfo(true);
        }
    }
    else{}
    
})

window.addEventListener('keyup',(e)=>{
    //console.log(e.target,typeof(e.key));
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
        else{ 
            // return console.error('ERROR target isn\'t start or finish point input')
        }
        

        function verifyInputNums(){
            let input = e.target.value;
            let temp = '';
            for(let i = 0; i < input.length;i++){
                if(input[i]%2 >= 0){
                    //console.log(input[i]);
                    temp += input[i];
                }else{
                    error_value_inp(e.target);
                }
            }
            if(Number(temp) < max_num){
                //console.log(temp,max_num);
                e.target.value = temp;
            }else{
                e.target.value = '';
                error_value_inp(e.target);
            }
            //console.log(temp,max_num);
            
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


function WhichPointClicked(coors){
    let arr = optionsPoints.arrWithRoadPoints;
    let m = coors;

    for(let i =0; i < arr.length;i++){
        if(arr[i].x - arr[i].radius <= m.x && m.x <= arr[i].x + arr[i].radius &&
            arr[i].y - arr[i].radius <= m.y && m.y <= arr[i].y + arr[i].radius ){
                //console.log(arr[i],'clicked here');
                return arr[i];
            }
    }
    return null;
}

OutPuts.result.addEventListener('mousemove',(e)=>{
    // console.log(e.target.innerHTML,e.target.classList[0]);
    let arr = optionsPoints.arrWithRoadPoints;
    let tar = e.target.innerHTML.split(',');
    let int = 0;
    if(e.target.classList[0] == 'result_output'){
        makeSelectedPointSuperVisible();
        for(let i =0; i < tar.length-1;i++){
            let a = arr[Number(tar[i])-1];
            let b = arr[Number(tar[i+1])-1];
            makeLine(a.x,a.y,b.x,b.y);
            int+= SearchMinDistance(a.x,a.y,b.x,b.y);
            // console.log(int);
        }
    }
    
    OutPuts.speedh[0].innerHTML = `<p>${int.toFixed(2)}</p>`;
       
})
OutPuts.result.addEventListener('mouseleave',()=>{
    resizeCNV();
    let int = 0;
    OutPuts.speedh[0].innerHTML = `<p>${int}</p>`;
})
