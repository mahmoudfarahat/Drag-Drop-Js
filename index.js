let draggedItem = null;
let positions = {};
// let rowCount = 1; // Initial number of rows
// let colCount = 1; // Initial number of columns
// let gridItemCount = 1; // Initial number of grid items
let tabCount = 1;

 


document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'INPUT') {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }
});


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
            e.preventDefault();
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    
        item.addEventListener('dragleave', (e) => {
            item.style.backgroundColor = 'transparent';
        });
    
        item.addEventListener('drop', (e) => {
            item.style.backgroundColor = 'transparent';
            item.appendChild(draggedItem);
            const inputId = draggedItem.id;
            const gridId = item.id;
            const position = calculatePosition(gridId);
            positions[inputId] = position;
        });
    });
    
    
}
applyDragingForCells()




function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
}

function handleDragLeave(e) {
    e.target.style.backgroundColor = 'transparent';
}

function handleDrop(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.appendChild(draggedItem);
    const inputId = draggedItem.id;
    const gridId = e.target.id;
    const position = calculatePosition(gridId);
    positions[inputId] = position;
}

function calculatePosition(gridId) {
    const index = parseInt(gridId.replace('grid-item', '')) - 1;
    const row = Math.floor(index / colCount) + 1;
    const col = (index % colCount) + 1;
    return { row: row, col: col };
}

function savePositions() {
    const configuration = {
        rows: rowCount,
        columns: colCount,
        positions: positions
    };
    const json = JSON.stringify(configuration, null, 2);
    console.log(json);
}

 
let tabs = {};
tabs[1] = new Tab(1);

// function addRow() {

//         tab.addRow()
//     // const grid = document.getElementById('grid'+tabNumber);
//     // rowCount++;
//     // applyDraging(colCount,tabNumber,grid)
//     // grid.style.gridTemplateRows = `repeat(${rowCount}, 100px)`;
// }

// function addColumn() {
//     tab.addColumn()
//     // const grid = document.getElementById('grid'+tabNumber);
//     // colCount++;
//     // applyDraging(rowCount,tabNumber,grid)
//     // grid.style.gridTemplateColumns = `repeat(${colCount}, 100px)`;
// }


// function applyDraging(count,tabNumber,grid) {
//     for (let i = 0; i < count; i++) {
//         gridItemCount++;
//         const newGridItem = document.createElement('div');
//         newGridItem.className = 'grid-item';
//         newGridItem.id = `tab${tabNumber}-grid-item${gridItemCount}`;
//         newGridItem.addEventListener('dragover', handleDragOver);
//         newGridItem.addEventListener('dragenter', handleDragEnter);
//         newGridItem.addEventListener('dragleave', handleDragLeave);
//         newGridItem.addEventListener('drop', handleDrop);
//         grid.appendChild(newGridItem);
//     }
// }



// function addNewTab() {

//     tabCount++;
//     const tabId = "tab" + tabCount + "default";
//     const tabTitle = "Tab " + tabCount;

//     // Add new tab header
//     const newTabHeader = $('<li><a href="#' + tabId + '" data-toggle="tab">' + tabTitle + "</a></li>");

//     $("#tabHeaders").append(newTabHeader);

//     // Add new tab content
//     const newTabContent = $('<div class="tab-pane fade" id="' + tabId + '">' + "</div>");

//     $("#tabContents").append(newTabContent);

//     addGrid(newTabContent, tabCount)
// }

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

