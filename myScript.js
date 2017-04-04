var myCanvas = document.getElementById("canvas");
var myContext = myCanvas.getContext("2d");

var RECT_WIDTH = 40
var RECT_HEIGHT = RECT_WIDTH


class Rectangle {
    constructor(cntxt, x, y) {
        this.context = cntxt
        this.x = x
        this.y = y
        this.checked = false;
    }
    draw() {
        if (this.checked) {
            this.context.fillStyle = "#000000"
            this.context.fillRect(this.x, this.y, RECT_HEIGHT, RECT_WIDTH)
        } else {
            //clear previous filled rect
            this.context.fillStyle = "#FFFFFF"
            this.context.fillRect(this.x, this.y, RECT_HEIGHT, RECT_WIDTH)
            this.context.rect(this.x, this.y, RECT_HEIGHT, RECT_WIDTH)
        }
    }
    onclick() {
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
        this.draw()
    }

}



var grid = Array(20);
for (var i = 0; i < grid.length; i++) {
    grid[i] = Array(20);
}


for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Rectangle(myContext, i * RECT_WIDTH, j * RECT_HEIGHT)
        grid[i][j].draw()
    }
}
myCanvas.addEventListener('mousedown', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message)
    var message = 'rectangle: ' + Math.floor(mousePos.x / 50) + ',' + Math.floor(mousePos.y / 50)
    console.log(message)
    var rect = grid[Math.floor(mousePos.x / RECT_WIDTH)][Math.floor(mousePos.y / RECT_HEIGHT)]
    rect.onclick()
    myContext.stroke()
 
}, false);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function getLiveNeighbours(x,y){
     var liveNeighbours = 0;
     if (grid[x+1][y+1].checked){
         liveNeighbours ++;
     }
     if (grid[x-1][y+1].checked){
         liveNeighbours ++;
     }
     if (grid[x-1][y-1].checked){
         liveNeighbours ++;
     }
     if (grid[x+1][y-1].checked){
         liveNeighbours ++;
     }

     if (grid[x+1][y].checked){
         liveNeighbours ++;
     }
     if (grid[x-1][y].checked){
         liveNeighbours ++;
     }
     if (grid[x][y-1].checked){
         liveNeighbours ++;
     }
     if (grid[x][y+1].checked){
         liveNeighbours ++;
     }
     return liveNeighbours;
}


//game of life loop
/*Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.*/
function gameOfLifeLoop(){
        var cellsToDie = [];
        var cellsToReproduce = [];

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var cell = grid[i][j]
            try{
              var neigbourCount = getLiveNeighbours(i,j);

            }catch(e){
               // console.log(i + "," + j)
 
                continue

            }
           // console.log(neigbourCount)
          // console.log(cell.checked)
            if(cell.checked){
                
                //live cell
                if(neigbourCount < 2){
                    cellsToDie.push(cell)
                }
                if(neigbourCount>3){
                    cellsToDie.push(cell)
                }
            }else{
                //dead cells
                if(neigbourCount == 3){
                    cellsToReproduce.push(cell)
                }
            }
        }
    }
    for(var i = 0; i < cellsToDie.length; i++){
        console.log(i + "," + i + "dies")
        cellsToDie[i].checked = false;
        cellsToDie[i].draw()


    }
     for(var i = 0; i < cellsToReproduce.length; i++){
        console.log(i + "," + i + "respawns")

        cellsToReproduce[i].checked = true;
        cellsToReproduce[i].draw()
    }
    myContext.stroke();
 
}
var buttonStart = document.getElementById("btnStart")
var buttonPause = document.getElementById("btnPause")
buttonStart.onclick = function(){intervalRef = setInterval(gameOfLifeLoop,1000)}

myContext.stroke();