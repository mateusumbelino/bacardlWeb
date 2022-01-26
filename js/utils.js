function getLayoutObject(){
    const obj = new Object();
    const grid = new Object();
    const size = new Object();
    obj.size = getSize();
    obj.grid = getGrid();
    obj.layout = getLayout();
    return JSON.stringify(obj);
}

function getSize(){
    const size = new Object();
    size.width = document.getElementsByName('cardWidth')[0].value;
    size.height = document.getElementsByName('cardHeight')[0].value;
    size.unit = document.getElementsByName('cardUnit')[0].value;
    return size;
}

function getGrid(){
    const grid = new Object();
    grid.width = document.getElementsByName('gridWidth')[0].value;
    grid.height = document.getElementsByName('gridHeight')[0].value;
    return grid;
}

function getLayout(){
    const array = [];
    const layouts = Array.from(document.getElementsByClassName('layoutForm'));
    for(i of layouts){
        let campos = Array.from(i.getElementsByClassName('layoutField'))
        obj = new Object();
        obj[campos[0].name] = campos[0].value
        obj[campos[1].name] = campos[1].value
        obj[campos[2].name] = campos[2].value
        obj[campos[3].name] = campos[3].value
        obj[campos[4].name] = campos[4].value
        if(obj.type == 'image'){
            obj[campos[6].name] = campos[6].value
        }
        else{
            obj[campos[5].name] = campos[5].value
        }
        array.push(obj)
    }
    return array;
}


