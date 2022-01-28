async function getLayoutObject() {
    const obj = new Object();
    const grid = new Object();
    const size = new Object();
    obj.size = getSize();
    obj.grid = getGrid();
    obj.layout = await getLayout();
    return JSON.stringify(obj);
}

function getSize() {
    const size = new Object();
    // size.width = document.getElementsByName('cardWidth')[0].value;
    // size.height = document.getElementsByName('cardHeight')[0].value;
    // size.unit = document.getElementsByName('cardUnit')[0].value;
    size.width = 30;
    size.height = 50;
    size.unit = "mm";
    return size;
}

function getGrid() {
    const grid = new Object();
    // grid.width = document.getElementsByName('gridWidth')[0].value;
    // grid.height = document.getElementsByName('gridHeight')[0].value;
    grid.width = 5;
    grid.height = 10;
    return grid;
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);
    })
}

function base64ArrayBuffer(arrayBuffer) {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    for (var i = 0; i < mainLength; i = i + 3) {

        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

async function getLayout() {
    const array = [];
    const layouts = Array.from(document.getElementsByClassName('layoutForm'));
    for (i of layouts) {
        let campos = Array.from(i.getElementsByClassName('layoutField'))
        obj = new Object();
        obj[campos[0].name] = campos[0].value
        obj[campos[1].name] = campos[1].value
        obj[campos[2].name] = campos[2].value
        obj[campos[3].name] = campos[3].value
        obj[campos[4].name] = parseInt(campos[4].value)
        if (obj.type == 'image') {
            try {
                // TODO: Trocar pelo elemento imagem que esta sendo iterado
                let file = document.querySelector('input[type=file]').files[0];
                let contentBuffer = await readFileAsync(file);
                obj[campos[6].name] = base64ArrayBuffer(contentBuffer)
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            obj[campos[5].name] = parseFloat(campos[5].value)
        }
        array.push(obj)
    }
    return array;
}