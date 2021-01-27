 // 29012021 console.log('MAIN CONNECTED',newScript());

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
    ],
    Stage:0,
    arrPoints:[]
};


let Connections = {
    make_connection : document.getElementById('makeConn'),
    connection_list : document.getElementById('connection_curr_elem'),
    connection_elems: document.getElementById('connection_list_of_connections'),
    deleteConnect : document.getElementById('delConnect'),
    SaveUpdates : document.getElementById('SaveChanges'),
    ConnectInfo : document.getElementById('info_connections'),
    curr_point : null,
    OnlyAddConnections:false,
    last_clicked_point:null,
    showFullCommunications:function(selectedElem){
        let arr = optionsPoints.arrWithRoadPoints;
        for(let i = 0; i < arr.length;i++){
            if(selectedElem){
                if(arr[i] == this.curr_point){
                    arr[i].ShowAllAvailbleRoads();
                    break;
                }
            }else{
                arr[i].ShowAllAvailbleRoads();
            }
        }
    },
    UpdateConnectionsInfo:function(selectedElem){
        this.connection_elems.innerHTML = ``;
        this.connection_list.innerHTML = `<p>Point (${Connections.curr_point.numOfPoints}) has connections:</p>`;
            if(this.curr_point.ShowConnections().length > 0){
                for(let i = 0; i < this.curr_point.ShowConnections().length;i++){
                    this.connection_elems.innerHTML += `<p class = 'connection_style'> with point (${this.curr_point.ShowConnections()[i].id})</p>`;
                }
                // showAllRoads();
                this.showFullCommunications(selectedElem);
            }
    }

};

function SaveConnections(){
    //// 27012021 // 28012021 // 29012021 console.log('SUCS saved');
    Connections.OnlyAddConnections = false;
    Connections.curr_point = null;
    Connections.last_clicked_point = null;
    resizeCNV();
}
function ResetToDefaultVisitPoints(){
    for(let i =0; i < optionsPoints.arrWithRoadPoints.length;i++){
        optionsPoints.arrWithRoadPoints[i].isVisited = false;
    }
}

let init = ()=>{
    resizeCNV();
    // InputPoints.finish_point_input.value = '';
    // InputPoints.start_point_input.value = '';
    //// 27012021 // 28012021 // 29012021 console.log('Initialized');
    test_points();
    function test_points(){
        new roadPoint(610,301,"#9C7CA5");
        new roadPoint(685,125,"#E75A7C");
        new roadPoint(784,285,"#BDB246");
        new roadPoint(910,156,"#EBF5DF");

        optionsPoints.arrWithRoadPoints[0].SetConnection(2);
        optionsPoints.arrWithRoadPoints[1].SetConnection(4);
        optionsPoints.arrWithRoadPoints[3].SetConnection(3);

        new roadPoint(859,46,"#F7717D");
        new roadPoint(1070,76,"#A1683A");
        new roadPoint(1228,191,"#BEB2C8");
        new roadPoint(1232,371,"#9C7CA5");

        optionsPoints.arrWithRoadPoints[1].SetConnection(5);
        optionsPoints.arrWithRoadPoints[4].SetConnection(6);
        optionsPoints.arrWithRoadPoints[5].SetConnection(7);
        optionsPoints.arrWithRoadPoints[6].SetConnection(8);

        new roadPoint(1017,235,"#EBF5DF");

        optionsPoints.arrWithRoadPoints[2].SetConnection(9);
        optionsPoints.arrWithRoadPoints[5].SetConnection(9);

        new roadPoint(959,317,"#BDB246");

        optionsPoints.arrWithRoadPoints[9].SetConnection(2);
        optionsPoints.arrWithRoadPoints[9].SetConnection(7);

        resizeCNV();
    }
}




init();






function startSearchingWay(){
    // let history_way = '';
    let time_game = null;
    let noName_temp = 0;
    // 1 -- 2 -- 3 и когда произойдет конец в точке 3 
    // сделай чтобы цепочка пошла также только вместо 3 другу точку из возможных
    // и так до самого начала
    // поверь мы справимся
    //  тыжпрограммист ))
    //  От создателей тыжпродаешь тыжечитаешь ))
    let s = Number(InputPoints.start_point_input.value)-1;
    let f = Number(InputPoints.finish_point_input.value)-1;
    let arr = optionsPoints.arrWithRoadPoints;
    let arr_stack = [];
    let stop_func = false;
    let arr_banned_points = [];
    // let last_good_elem = null;

    // if(ChoiceYourWay.visit_all.checked){
    //     // 27012021 // 28012021 // 29012021 console.log('visit all points');
    // }else if(ChoiceYourWay.most_faster_road.checked){
    //     // 27012021 // 28012021 // 29012021 console.log('faster way');
    // }
    showNextPoints(s);

    function showNextPoints(num,history = {text1:'',text2:''}){
        if(stop_func){ //  console.log('function has stoped')
    }
        else{
            // // 27012021 // 28012021 // 29012021 console.log(arr[1].availablePoints);
            // 27012021 // 28012021 // 29012021 console.log(num);
            // 28012021 // 29012021 console.log('    '+(num+1)+' : ',arr[num].ShowConnections().length,history);
                // history.push(num+1);
            let fifo = [];
            let canConnect = 0;
            let currCon = arr[num].ShowConnections();
            let h = history.text2.split(',');
            let shit_conn = false;
            for(let i =0; i < h.length;i++){
                h[i] = Number(h[i]);
            }
            if(currCon.length == 1 && arr[num] != arr[s]){
                //no sence need go back
                // and make checker for maybe this point has connect with finish point!!!
                if(arr[num].numOfPoints == arr[f].numOfPoints){
                    history.text1 += ' -- '+arr[f].numOfPoints;
                    history.text2 += ','+arr[f].numOfPoints;
                    // 27012021 // 28012021 // 29012021 console.log('FIND finish point',s,f,history,arr[num].ShowConnections()[i].elem,arr[f].numOfPoints);
                    canConnect = 0;
                }else{
                    

                    // 29012021 console.error(arr[num],'SHIT CONNECTION',h,h.length);

                    // {el:arr[arr_points_last_way[j]-1].numOfPoints,f:'NotVisible'}
                    addBannedArr([{el:num+1,f:'NotVisible'}]);
                    shit_conn = true;

                    
                }
                
                
            }else{
                if(h[h.length-1] == num+1){
                    // let current_state = arr[num].ShowUsedRoads();
                    // 27012021 // 28012021 // 29012021 console.log(h[h.length-1],num+1,'already have on list');
                    // // 29012021 console.error(':::',current_state);
                    // if(current_state.len - current_state.int == 0){
                    //     // 29012021 console.error('BAN WRONG ROAD');
                    //     addBannedArr([{el:arr[num].numOfPoints,f:'NotVisible'}]);
                    // }
                }else{
                    history.text1 += history.text1.length >0? ' -- '+(num+1):''+(num+1);
                    history.text2 += history.text2.length >0? ','+(num+1):''+(num+1);
                }
                
                for(let i = 0; i < currCon.length;i++){
                    // // 27012021 // 28012021 // 29012021 console.log(arr[num].ShowConnections()[i]);
                    if(arr[num].ShowConnections()[i].isVistedPersonal == false){
                        // 27012021 // 28012021 // 29012021 console.log(arr[num].ShowConnections()[i].elem,arr[num].ShowConnections()[i].isVistedPersonal+'');
                        if(arr[num].ShowConnections()[i].elem == arr[f]){
                            history.text1 += ' -- '+arr[f].numOfPoints;
                            history.text2 += ','+arr[f].numOfPoints;
                            // 27012021 // 28012021 // 29012021 console.log('FIND finish point',s,f,history,arr[num].ShowConnections()[i].elem,arr[f].numOfPoints);
                            canConnect = 0;
                            break;
                        }
                        else{
                            canConnect++;
                            fifo.push(arr[num].ShowConnections()[i].elem);
                            arr[num].ShowConnections()[i].isVistedPersonal = true;
                            let newEl = arr[num].ShowConnections()[i].elem.availablePoints;

                            for(let j = 0; j < newEl.length;j++){

                                // 29012021 console.warn(j,arr[num].ShowConnections()[i],arr[num]);
                                if(newEl[j].id == num+1){

                                    // 29012021 console.error(arr[num].ShowConnections()[i],arr[num].ShowConnections()[i].elem.availablePoints[j]);
                                    // // 27012021 // 28012021 // 29012021 console.log(arr[num].ShowConnections()[i].elem.ShowConnections()[j].elem,arr[num].ShowConnections()[i].elem.ShowConnections()[j].isVistedPersonal);
                                    arr[num].ShowConnections()[i].elem.availablePoints[j].isVistedPersonal = true;

                                    // 29012021 console.error(arr[num].ShowConnections()[i],arr[num].ShowConnections()[i].elem.availablePoints[j]);
                                    break;
                                }
                            }

                            // let newEL2 = arr[num].ShowConnections();
                            // for(let j =0; j < newEL2.length;j++){
                            //     if(newEL2[j])
                            // }
                        }
                        // // 29012021 console.warn(arr[num].ShowConnections()[i].elem,arr[num].ShowConnections()[i].isVistedPersonal+'');
                        
                    }else{
                        // // 27012021 // 28012021 // 29012021 console.log(arr[num].ShowConnections()[i].elem,arr[num].ShowConnections()[i].elem.isVisited);
                    }
                    
                }
            }
            if(shit_conn){
                // 29012021 console.warn('SHIT CONN:',h[h.length-1],history);
                return showNextPoints(h[h.length-1]-1,history);
            }else{
                if(canConnect > 0){
                    for(let j = 0; j < fifo.length;j++){
                        showNextPoints(fifo[j].numOfPoints-1,history);
                    }
    
                }else{
                    // if(arr_stack.length > 4){
                    //     stop_func = true;
                    // }else{
                        deleteREpeatedRoad(history.text2);
                       
                        arr_stack.push(history.text2);

                        filtrArrHistory();


                        time_game = checkHaveWeAvailibleWays();
                    
                        let temp = checkUsedPoints(history);
                        addBannedArr(temp);
                        // // 27012021 // 28012021 // 29012021 console.log(checkHaveWeAvailibleWays());
                        // if(optionsPoints.Stage == 1){
                        //     if(arr_stack.length <= 3){
                        //         start_anothe_loop();
                        //     }
                        //     else{

                        //         stop_func = true;
                        //     }
                        // }
                        // if(time_game.bool){
                        //     // start_anothe_loop();
                        // }else{
                            if(arr_stack.length <= time_game.int+2){
                                // 29012021 console.warn(arr_stack.length,time_game.int,'NEED RESEARCH');  
                                start_anothe_loop();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                            }else{
                                addToGLobal(RemoveRepeatedRecords(filtrArrHistory()));
                                // 29012021 console.error('WIN all roads observed');
                                // 27012021 // 28012021 // 29012021 console.log(arr_stack);
                                stop_func = true;
                                

                                
                                if(optionsPoints.Stage == 0){
                                    // 28012021 // 29012021 console.log('Are you ready?');
                                    // MakeCodeForStageTwo();
                                    // 
                                    setTimeout(()=>{
                                        MakeCodeForStageTwo();
                                    },100);
                                }else if (optionsPoints.Stage == 1){
                                    makeCleanArr();
                                }
                            }
                            
                        // }
                    // }
                    // // 27012021 // 28012021 // 29012021 console.log('other ways visited');
                     // 28012021 // 29012021 console.log('HISTORY ::',history.text1);
                    // if(shit_conn){}
                    // else{
                        
                    // }
                    
    
                    // if(arr_stack.length > 4){
                    //     // 27012021 // 28012021 // 29012021 console.log('dohuia nie?');

                    //     let temp = checkUsedPoints(history);
                    //     addBannedArr(temp);
                    //     Skip_invalid_roads(arr_banned_points);
                    //     stop_func = true;
                    //     // htibnm ghj,ktvve c pfrhsnsvb ljhjufvb
                    //     // решить проблемму с закрытыми дорогами
                    //     // чтобы проходил по всем возможным
                    //     // если не будет дорог закончи функцию
                    //     // Дорогу осилит идущий
                    // }else{
                        
                        
                        
                        
                    // }
                    
                }
            }
            
        }        
    }
    function addToGLobal(item){
        for(let i =0; i < item.length;i++){
            optionsPoints.arrPoints.push(item[i]);
        }
    }
    function RemoveRepeatedRecords(item){
        // 27012021 // 28012021 // 29012021 console.log("REMOVE :: ",item);
        let output = [];
        for(let i =0; i < item.length;i++){
            if(output.length == 0){
                output.push(item[0]);
                // break;
            }else{
                for(let j = 0; j < output.length;j++){
                    // 27012021 // 28012021 // 29012021 console.log(i,item[i],output[j]);
                    if(item[i] == output[j]){
                        break;
                    }else{
                        if(j == output.length - 1){
                            output.push(item[i]);
                            break;
                        }
                    }
                }
            }
            
        }
         // 28012021 // 29012021 console.log(output);
        return output;
    }
    function filtrArrHistory(){
        let output = [];
        for(let i =0; i < arr_stack.length;i++){
            // 27012021 // 28012021 // 29012021 console.log(arr_stack[i]);
            if(arr_stack[i][0] == 1+s+''){
                if(arr_stack[i][arr_stack[i].length-1] == 1+f+''){
                    if(arr_stack[i] != output[output.length-1]){
                        output.push(arr_stack[i]);
                    }
                }else if(arr[Number(arr_stack[i][arr_stack[i].length-1])-1].HaveConnection(f+1)){
                    // 
                    output.push(arr_stack[i]+`,${arr[f].numOfPoints}`);
                }
                
                
            }
        }
         // 28012021 // 29012021 console.log(output);
        return output;
    }
    function deleteREpeatedRoad(str){
        let dontAddToHistory = false;
        for(let i =0; i < arr_stack.length;i++){
            // 27012021 // 28012021 // 29012021 console.log(arr_stack[i],str,arr_stack[i] == str);
            if(arr_stack[i] == str){
                dontAddToHistory = true;
                str = Number(str[str.length-1]);
                // 29012021 console.error(str);

                addBannedArr([{el:str,f:'NotVisible'}]);
            }
        }
        return dontAddToHistory;
    }
    function research_bann_road(){
        let arr = optionsPoints.arrWithRoadPoints;
        let b = arr_banned_points;
        let clear_arr = [];

        for(let i =0; i < arr.length;i++){
            for(let j = 0; j < b.length;j++){
                if(arr[i].numOfPoints == b[j].el){
                    break;
                }else{
                    if(j == b.length-1){
                        clear_arr.push(arr[i]);
                    }
                }
                
            }
        }

        // 29012021 console.error('CLEAR ARR::',clear_arr);

        for(let i =0; i < clear_arr.length;i++){
            let current_state = clear_arr[i].ShowUsedRoads()
            // 27012021 // 28012021 // 29012021 console.log(current_state);
            if(current_state.bool){
                // ({el:arr[arr_points_last_way[j]-1].numOfPoints,f:'NotVisible'});
                // 29012021 console.error('EXTRA BAN::',clear_arr[i]);
                addBannedArr([{el:clear_arr[i].numOfPoints,f:'NotVisible'}]);
            }else{
                // if(current_state.len > 1){
                //     // 27012021 // 28012021 // 29012021 console.log('NEED DELETE WAY');
                //     addBannedArr([{el:[clear_arr[i].numOfPoints,arr[f].numOfPoints],f:'NotWayOnceTo'}]);
                // }
                // ({el:[arr[arr_points_last_way[j-1]-1].numOfPoints,arr[f].numOfPoints],f:'NotWayOnceTo'});
            }
        }
    }
    function start_anothe_loop(){
        Skip_invalid_roads(arr_banned_points);
        research_bann_road();
        stop_func = true;
        history = {};
                            
        setTimeout(()=>{
            stop_func = false;
            showNextPoints(s);
            
        },50);
    }
    function addBannedArr(el){
        // 29012021 console.error(arr_banned_points,el,el.length);
        for(let i =0; i < el.length;i++){
            arr_banned_points.push(el[i]);
        }
        
        
        // // 27012021 // 28012021 // 29012021 console.log(arr_banned_points);
    }

    function checkUsedPoints(history){
        // // 27012021 // 28012021 // 29012021 console.log(history);

        let arr = optionsPoints.arrWithRoadPoints;
        let arr_points_last_way = [];
        let is_2_more_conn_point = false;
        let only_one = false;
        let arr_point_inside_points_2_more_conn = [];
        let how_much_2_more_conn = 0;
        history.text2 = history.text2.split(',');

        for(let i =0; i < history.text2.length;i++){
            arr_points_last_way.push(Number(history.text2[i]));
        }

        // // 27012021 // 28012021 // 29012021 console.log(arr_points_last_way);

        for(let y =0; y < arr_points_last_way.length;y++){
            if(arr[arr_points_last_way[y]-1].ShowConnections().length > 2){
                how_much_2_more_conn++;
                arr[arr_points_last_way[y]-1].usedTimes++;
            }
        }
        // 27012021 // 28012021 // 29012021 console.log('2 more ::',how_much_2_more_conn);

        for(let j =0; j < arr_points_last_way.length;j++){
            if(arr_points_last_way[j] == arr[f].numOfPoints){
                // 27012021 // 28012021 // 29012021 console.log(arr_points_last_way[j],arr[f].numOfPoints,arr_points_last_way[j] == arr[f].numOfPoints,arr[arr_points_last_way[j-1]-1]);
                
                
                if(arr[arr_points_last_way[j-1]-1].ShowConnections().length - arr[arr_points_last_way[j-1]-1].ShowVisitedConnections().length >= 1){
                     // 28012021 // 29012021 console.log('Not dell finish point NOT BAN');

                    if(optionsPoints.Stage == 1){
                        let current_state = checkHaveWeAvailibleWays();
                        // 27012021 // 28012021 // 29012021 console.log(current_state,arr_points_last_way[j-1],arr[f].numOfPoints,arr[f].ShowUsedRoads());
                        if(current_state.len - noName_temp > 1){
                            noName_temp++;
                             // 28012021 // 29012021 console.log('Not dell finish point NEED BAN');
                            arr_point_inside_points_2_more_conn.push({el:[arr[arr_points_last_way[j-1]-1].numOfPoints,arr[f].numOfPoints],f:'NotWayOnceTo'});
                        }
                    }
                    
                    
                }else{
                     // 28012021 // 29012021 console.log('Not dell finish point NEED BAN');
                    arr_point_inside_points_2_more_conn.push({el:[arr[arr_points_last_way[j-1]-1].numOfPoints,arr[f].numOfPoints],f:'NotWayOnceTo'});
                }
                
            }
            else{
                if(is_2_more_conn_point){
                    if(arr[arr_points_last_way[j]-1].ShowConnections().length > 2){

                        
                        how_much_2_more_conn--;
                        if(how_much_2_more_conn > 1 || how_much_2_more_conn == 0){
                            is_2_more_conn_point = false;
                        }else if(arr[arr_points_last_way[j]-1].ShowConnections().length > 2 &&
                            arr[arr_points_last_way[j]-1].usedTimes == arr[arr_points_last_way[j]-1].ShowConnections().length - 1){
                                arr_point_inside_points_2_more_conn.push({el:arr[arr_points_last_way[j]-1].numOfPoints,f:'NotVisible'});
                                // NotVisible
                            }
                        // skip a next time
                    }else{
                        
                        
                            if(only_one){
                                // arr_point_inside_points_2_more_conn.push(arr[arr_points_last_way[j]-1]);
                                arr_point_inside_points_2_more_conn.push({el:arr[arr_points_last_way[j]-1].numOfPoints,f:'NotVisible'});
                                // NotVisible
                                is_2_more_conn_point = false;
                                only_one = false;
                            }else{
                                // arr_point_inside_points_2_more_conn.push(arr[arr_points_last_way[j]-1]);
                                arr_point_inside_points_2_more_conn.push({el:arr[arr_points_last_way[j]-1].numOfPoints,f:'NotVisible'});
                                // NotVisible
                            }
                        
                        
                    }
                }
                else{
                    if(arr[arr_points_last_way[j]-1].ShowConnections().length > 2){

                        
                        how_much_2_more_conn--;
                        if(how_much_2_more_conn >= 1){
                            is_2_more_conn_point = true;
                        }else{
                            if(how_much_2_more_conn == 0){
                                //  only one banned

                                is_2_more_conn_point = true;
                                only_one = true;

                            }
                        }
                        
                    }
                }
                // 27012021 // 28012021 // 29012021 console.log(arr_points_last_way[j],is_2_more_conn_point);
            }
        }
         // 28012021 // 29012021 console.log('skip a next time::',arr_point_inside_points_2_more_conn);
        return arr_point_inside_points_2_more_conn
    }
    function Skip_invalid_roads(roads){
        let arr = optionsPoints.arrWithRoadPoints;
        let r = roads;
        arr[0].ResetAllVisited();

        for(let i = 0; i < arr.length;i++){
            for(let j =0; j < r.length;j++){
                // // 27012021 // 28012021 // 29012021 console.log('search del elem',r[j].el,(r[j].el+'').length)
                // 
                if((r[j].el+'').length <= 2){
                    // // 27012021 // 28012021 // 29012021 console.log(r[j].el,arr[i].numOfPoints,arr[r[j].el-1].numOfPoints);
                    if(arr[i] == arr[r[j].el-1]){
                        // skip
                        // // 27012021 // 28012021 // 29012021 console.log('del elem',arr[r[j].el-1]);
                        arr[r[j].el-1].NotVisible();
                    }else{
                        // makeSelectedPointSuperVisible(i+1);
                    }
                }
                else if((r[j].el+'').length == 3){
                    // // 27012021 // 28012021 // 29012021 console.log(r[j].el);
                    if(arr[i] == arr[r[j].el[0]-1]){
                        // skip
                        // // 27012021 // 28012021 // 29012021 console.log('del elem',arr[r[j].el[0]-1]);
                        arr[r[j].el[0]-1].NotWayOnceTo(r[j].el[1]);
                    }else{
                        // makeSelectedPointSuperVisible(i+1);
                    }
                }
            }
        }
         // 28012021 // 29012021 console.log(arr,r);
    }
    function checkHaveWeAvailibleWays(){
        let arr = optionsPoints.arrWithRoadPoints;
        let childs = arr[f].availablePoints;
        let output = 0;
        let sumOutputs = -(childs.length);
        for(let i =0; i < childs.length;i++){

            sumOutputs += childs[i].elem.availablePoints.length;

            for(let j =0; j < childs[i].elem.availablePoints.length;j++){
                
                if(childs[i].elem.availablePoints[j].isVistedPersonal == true){
                    if(childs[i].elem.ShowConnections().length < 2){}
                    else{
                        // 29012021 console.warn(j,childs[i].elem.availablePoints[j]);
                        output++;
                    }
                }
            }
            // // 29012021 console.warn(i,arr[f].availablePoints[i]);
        }
        // 29012021 console.warn(output,sumOutputs,sumOutputs - output);
        return sumOutputs - output > 0? {bool:true,int:output,len:childs.length} : {bool:false,int:output,len:childs.length};
    }
}
function SearchMinDistance(x1,y1,x2,y2){
    // let st_p = InputPoints.start_point_input.value - 1;
    // let f_p = InputPoints.finish_point_input.value - 1;
    // let arr = optionsPoints.arrWithRoadPoints;

    // let x = getDistanceX(arr[st_p].x,arr[f_p].x);
    // let y = getDistanceY(arr[st_p].y,arr[f_p].y);

    let x = getDistanceX(x1,x2);
    let y = getDistanceY(y1,y2);

    

    //// 27012021 // 28012021 // 29012021 console.log('POINT A::',arr[st_p]);
    //// 27012021 // 28012021 // 29012021 console.log('POINT B::',arr[f_p]);

    //// 27012021 // 28012021 // 29012021 console.log('x::',x,'y::',y,'dist::',getClearDist(x,y));

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
    return getClearDist(x,y);
}

function showAllCircle(){
    let arr = optionsPoints.arrWithRoadPoints;
    for(let i =0; i < arr.length;i++){
        arr[i].ShowAgainCircle();
    }
}
function MakeCodeForStageTwo(){
    // 27012021 // 28012021 // 29012021 console.log('STAGE::',optionsPoints.Stage);
    // init();
    optionsPoints.Stage = 1;
    optionsPoints.arrWithRoadPoints[0].ResetAllVisited();
    startSearchingWay();
}
function makeCleanArr(){
    let output = [];
    let gl = optionsPoints.arrPoints;
    for(let i =0; i < gl.length;i++){
        if(output.length == 0){
            output.push(gl[0]);
        }else{
            for(let j = 0; j < output.length;j++){
                // // 28012021 // 29012021 console.log(i,gl[i],output[j],gl[i] == output[j]);
                if(gl[i] == output[j]){
                    break;
                }
                else{
                    if(j == output.length-1){
                        output.push(gl[i]);
                    }
                }
            }
        }
        
    }
    // 29012021 console.warn(output);
    optionsPoints.arrPoints = output;
    updtResult();
}
function updtResult(){
    OutPuts.result.innerHTML = '';
    let arr = optionsPoints.arrWithRoadPoints;
    for(let i =0; i < optionsPoints.arrPoints.length;i++){
        OutPuts.result.innerHTML += `<p class='result_output'>${optionsPoints.arrPoints[i]}</p>`;
    }
}