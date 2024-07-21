let draggedItem = null;
let positions = {};
let tabCount = 1;

let tabs = {};

// First Tab
tabs[1] = new Tab(1);

// when i start to Drap aa item
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'INPUT') {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }
});

// when i leave the mouse 
document.addEventListener('dragend', (e) => {
    setTimeout(() => {
        e.target.style.display = 'block';
        draggedItem = null;
    }, 0);
});




function applyDragingForCells(){

    document.querySelectorAll('.grid-item').forEach(item => {
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        item.addEventListener('dragenter', (e) => {
            if(item.children.length == 0){
            e.preventDefault();
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
        });
    
        item.addEventListener('dragleave', (e) => {
            item.style.backgroundColor = 'transparent';
        });
    
        item.addEventListener('drop', (e) => {
            if(item.children.length == 0){
                item.style.backgroundColor = 'transparent';
                item.appendChild(draggedItem);
            }
           
         
        });

    });
    
}

applyDragingForCells()




function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    if(e.target.children.length == 0 && e.target.tagName != 'INPUT'){
    e.preventDefault();
    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }
}

function handleDragLeave(e) {
    e.target.style.backgroundColor = 'transparent';
}

function handleDrop(e) {
     if(e.target.children.length == 0 && e.target.tagName != 'INPUT' ){
    e.target.style.backgroundColor = 'transparent';
    e.target.appendChild(draggedItem);
}
    
}

 

function savePositions() {
    console.log(tabs)
 
}

 


 

function addGrid(newTab, tabNumber) {

    const girdBody = `<div style="margin-bottom: 10px">
                               <button class="btn btn-primary" onclick="tabs[${tabNumber}].addRow()">
                                        Add Row
                                    </button>
                                <button class="btn btn-primary" onclick="tabs[${tabNumber}].addColumn()">
                                        Add Column
                                    </button>
                                </div>

                                <div class="container">
                                    <div class="grid" id="grid${tabNumber}">
                                        <div class="grid-item" id="tab${tabNumber}-grid-item1"></div>
                    
                                    </div>
                                </div>`


    newTab.append(girdBody)

    
    applyDragingForCells()
}



 function addTab(){

    tabCount++
    
    const tabId = "tab" + tabCount + "default";
    const tabTitle = "Tab " + tabCount;
    const newTabHeader = $('<li><a href="#' + tabId + '" data-toggle="tab">' + tabTitle + "</a></li>");

    $("#tabHeaders").append(newTabHeader);

    
    const newTabContent = $('<div class="tab-pane fade" id="' + tabId + '">' + "</div>");

    $("#tabContents").append(newTabContent);

    addGrid(newTabContent, tabCount)
 
    tabs[tabCount] = new Tab(tabCount);

}


// Make the input div Draggable
ApplyDragingForInputsDiv()

function ApplyDragingForInputsDiv(){
    let inputsDiv = document.getElementById('inputs')

    inputsDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    inputsDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        inputsDiv.appendChild(draggedItem)
    });


}