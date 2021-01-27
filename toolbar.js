console.log('TOOLBAR CONNECTED',newScript());

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

    }else{//console.log('to fast wait')
}

    cant_show_hide_tools_timeout = true;

    setTimeout(()=>{cant_show_hide_tools_timeout = false},750);
})

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
    result : document.getElementById('result'),
    results: document.getElementsByClassName('result_output'),
    distance_html: document.getElementsByClassName('box_noname'),
    speedh : document.getElementsByClassName('speed')
};

function clearAll(){

    optionsPoints.arrWithRoadPoints = [];
    optionsPoints.countNumOfPoint = 1;
    optionsPoints.Stage = 0;

    ModifyViewPoints.showLines.checked = false;
    ModifyViewPoints.showNums.checked = false;
    ModifyViewPoints.spawn_points.checked = false;

    InputPoints.start_point_input.value = '';
    InputPoints.finish_point_input.value = '';

    ChoiceYourWay.visit_all.checked = false;
    ChoiceYourWay.most_faster_road.checked = false;

    OutPuts.result.innerHTML = ''

    Connections.make_connection.checked = '';
    Connections.connection_list.innerHTML = '';
    Connections.connection_elems.innerHTML = '';

    Connections.deleteConnect.checked = false;
    Connections.SaveUpdates.checked = false;
    Connections.ConnectInfo.checked = false;

    Connections.curr_point = null;
    Connections.OnlyAddConnections = false;
    Connections.last_clicked_point = null;
}