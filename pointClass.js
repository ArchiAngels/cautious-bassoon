console.log('CLASS POINT CONNECTED',newScript());

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
        this.usedTimes = 0;
        optionsPoints.arrWithRoadPoints.push(this);
        optionsPoints.countNumOfPoint++;
        makeCircle(this.x,this.y,this.radius,this.color,this.numOfPoints);
        // if(optionsPoints.countNumOfPoint > 2 && ModifyViewPoints.showLines.checked){
        //     showAllRoads();
        // }
        // //console.log(optionsPoints.arrWithRoadPoints);
    }
    ItIsMe(){
        //console.log(this);
    }
    ShowAgainCircle(){
        makeCircle(this.x,this.y,this.radius,this.color,this.numOfPoints);
    }
    ShowConnections(){
        // //console.log(this.availablePoints);
        return this.availablePoints
    }
    ShowVisitedConnections(){
        let count = [];
        for(let i =0; i < this.availablePoints.length;i++){
            if(this.availablePoints[i].isVistedPersonal){
                count.push(this.availablePoints[i]);
            }
        }
        console.log(count);
        return count;
    }
    SetConnection(id){
        //console.log('Make conn',id)
        if(id == '' && id != this.countNumOfPoint){return //console.log('set connection error ID')
    }
        else{
            if(this.availablePoints.length == 0){
                this.availablePoints.push({id:id,elem:optionsPoints.arrWithRoadPoints[id-1],isVistedPersonal:false}); // add new point to current
                optionsPoints.arrWithRoadPoints[id-1].availablePoints.push({id:this.numOfPoints,elem:this,isVistedPersonal:false}); // add current point to new
            }else{
                for(let i = 0; i < this.availablePoints.length;i++){
                    if(this.availablePoints[i].id == id){
                        //skip repeat elem
                        //console.log('skip repeated elem');
                        break;
                    }else if(i == this.availablePoints.length - 1){
                        this.availablePoints.push({id:id,elem:optionsPoints.arrWithRoadPoints[id-1],isVistedPersonal:false}); // add new point to current
                        optionsPoints.arrWithRoadPoints[id-1].availablePoints.push({id:this.numOfPoints,elem:this,isVistedPersonal:false}); // add current point to new
                    }
                }
            }
            // this.ShowConnections();
        }
        
    }
    DelConnection(id2){
        if(id2 == ''){return //console.log('delete error ID')
    }
        else{

            let arrLength = this.availablePoints.length;
            let connectedPoint = optionsPoints.arrWithRoadPoints[id2-1];
            let tempArr = [];

        for(let i = 0; i < arrLength;i++){
            if(this.availablePoints[i].id == id2){//console.log('del this',this,' >> ',this.availablePoints[i])
        }
            else{tempArr.push(this.availablePoints[i])}
        }
            //console.log(tempArr);
            this.availablePoints = tempArr;
            //console.log(this.availablePoints);
            tempArr = [];
            
        for(let j = 0; j < connectedPoint.availablePoints.length;j++){
            if(connectedPoint.availablePoints[j].id == this.numOfPoints){
                // //console.log('del this',connectedPoint,' >> ',this);
                //console.log(connectedPoint.availablePoints[j],connectedPoint.availablePoints[j].id,this.numOfPoints);
            }else{tempArr.push(connectedPoint.availablePoints[j]);}
        }
            connectedPoint = tempArr;
            optionsPoints.arrWithRoadPoints[id2-1].availablePoints = tempArr;
            //console.log(connectedPoint);
        }
    }
    ShowAllAvailbleRoads(clearCanvas){
        let arr = this.availablePoints;
        if(clearCanvas){
            resizeCNV();
        }
        for(let i = 0; i < arr.length;i++){
            makeLine(this.x,this.y,arr[i].elem.x,arr[i].elem.y);
        }
    }
    ResetAllVisited(){
        let arr = optionsPoints.arrWithRoadPoints;

        for(let i = 0; i < arr.length;i++){
            let connections = arr[i].availablePoints;
            for(let j = 0; j < connections.length;j++){
                connections[j].isVistedPersonal = false;
                for(let y =0; y < connections[j].elem.ShowConnections().length ;y++){
                    if(connections[j].elem.availablePoints[y].id == arr[i].numOfPoints){
                        connections[j].elem.availablePoints[y].isVistedPersonal = false;
                    }
                }
            }
        }
    }
    NotVisible(){
        let connections = this.availablePoints;
        // console.log('NOT VISIBLE POINT::',this.numOfPoints);
        for(let i = 0; i < connections.length;i++){
            for(let y =0; y < connections[i].elem.ShowConnections().length ;y++){
                connections[i].isVistedPersonal = true;
                // console.log(connections[i]);
                    if(connections[i].elem.availablePoints[y].id == this.numOfPoints){
                        connections[i].elem.availablePoints[y].isVistedPersonal = true;
                        // console.log(connections[i].elem.availablePoints[y]);
                    }
            }
        }
    }
    NotWayOnceTo(id){
        let connections = this.availablePoints;
        for(let i = 0; i < connections.length;i++){
            // for(let y =0; y < connections[i].elem.ShowConnections().length ;y++){
                // connections[i].isVistedPersonal = true;
                    if(connections[i].id == id){
                        connections[i].isVistedPersonal = true;
                        // console.log('del connect ',this.numOfPoints,connections[i].id);
                        break
                    }
            // }
        }
    }
    HaveConnection(id){
        let opos_el = optionsPoints.arrWithRoadPoints[id-1];
        let own_el = this.availablePoints;
        let output = false;

        for(let i =0; i < own_el.length;i++){
            if(own_el[i].elem == opos_el){
                // console.log('FIND!',this, opos_el); 
                output = true;
                break
            }
        }
        return output
    }
    ShowUsedRoads(){

        let s = Number(InputPoints.start_point_input.value)-1;
        // let f = Number(InputPoints.finish_point_input.value)-1;

        let arr = optionsPoints.arrWithRoadPoints;
        let own_el = this.availablePoints;
        let output = 0;

        for(let i =0; i < own_el.length;i++){
            if(own_el[i].isVistedPersonal == true || 
                // own_el[i].elem.numOfPoints == arr[f].numOfPoints || 
                own_el[i].elem.numOfPoints == arr[s].numOfPoints){
                output++;
            }
        }
        return own_el.length - output == 0? {bool:true,int:output,len:own_el.length}:{bool:false,int:output,len:own_el.length};
        // console.log(output,own_el.length,own_el);
    }
}