class Tab {
     rowCount = 1;
     colCount = 1; 
     gridItemCount = 1; 
     tabNumber;
     grid ;

     constructor(tabCount){
        this.tabNumber = tabCount
        this.grid = document.getElementById('grid'+this.tabNumber);
     };

     addRow(){
         rowCount++;
         this.applyDraging(this.colCount)
         grid.style.gridTemplateRows = `repeat(${this.rowCount}, 100px)`;
     };

     addColumn() {
        colCount++;
        this.applyDraging(this.rowCount)
        grid.style.gridTemplateColumns = `repeat(${colCount}, 100px)`;
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

}