class Tab {
     rowCount = 1;
     colCount = 1; 
     gridItemCount = 1; 
     tabNumber;
     grid ;
     o = 0
     constructor(tabCount){
        this.tabNumber = tabCount
        this.grid = document.getElementById('grid'+this.tabNumber);
    };



     addRow(){
         this.rowCount++;
         this.applyDraging(this.colCount)
         this.grid.style.gridTemplateRows = `repeat(${this.rowCount}, 100px)`;
     };

     deleteRow(){
        this.rowCount--;
        this.grid.style.gridTemplateRows = `repeat(${this.rowCount}, 100px)`;
     }

     addColumn() {
        this.colCount++;
        this.applyDraging(this.rowCount)
        this.grid.style.gridTemplateColumns = `repeat(${this.colCount}, 100px)`;
    }
    
    applyDraging(count) {
        for (let i = 0; i < count; i++) {
            this.gridItemCount++;
            const newGridItem = document.createElement('div');
          
          
            newGridItem.className = 'grid-item';
            newGridItem.id = `tab${this.tabNumber}-grid-item${this.gridItemCount}`;
            newGridItem.addEventListener('dragover', handleDragOver);
            newGridItem.addEventListener('dragenter', handleDragEnter);
            newGridItem.addEventListener('dragleave', handleDragLeave);
            newGridItem.addEventListener('drop', handleDrop);
            this.grid.appendChild(newGridItem);
        }
    }
    getPostions(){
        const positions = [];
        this.grid.querySelectorAll('.grid-item').forEach((item, index) => {
            if (item.firstChild) {
                const row = Math.floor(index / this.colCount) + 1;
                const col = (index % this.colCount) + 1;
                positions.push({
                    name: item.firstChild.id,
                    row: row,
                    col: col
                });
            }
        });
        return positions;
    }
    deleteRow() {
        if (this.rowCount > 1) {
            this.rowCount--;
            this.grid.style.gridTemplateRows = `repeat(${this.rowCount}, 100px)`;
            this.removeExcessGridItems(this.colCount);
            this.colCount = this.gridItemCount /this.rowCount
        }
    }
    
    deleteColumn() {
        if (this.colCount > 1) {
            this.colCount--;
            this.grid.style.gridTemplateColumns = `repeat(${this.colCount}, 100px)`;
            this.removeExcessGridItems();
            this.rowCount = this.gridItemCount /this.colCount
        }
    }

    removeExcessGridItems() {
        const items = Array.from(this.grid.querySelectorAll('.grid-item'));
        const newItemCount = this.rowCount * this.colCount;
        // Remove excess items from the end
        let index = items.length - 1;
    while (items.length > newItemCount && index >= 0) {
        const item = items[index]; // Get the item at the current index
        if (item.children.length == 0) {
            item.remove(); // Remove the item from the DOM
            items.splice(index, 1); // Remove the item from the array
            this.gridItemCount--;
        }
        index--; // Move to the previous item
    }
    }

    


}