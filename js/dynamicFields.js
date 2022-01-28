var lastFieldID = 0;
var lastCardID = 0;
var currentLayoutFields = [];
const layoutElements = document.getElementById("layoutElements");
const layoutField = 
"<div class='fieldGroup'>" +
"<div> <label>Type<span class='obrigatory'>*</span>:</label> <select name='type' class='layoutFieldType layoutField' onchange='showTypeFields(this, this.parentNode.parentNode.parentNode)'><option value='text'>Text</option> <option value='image'>Image</option></select> </div>" +
"<div> <label>Name<span class='obrigatory'>*</span>:</label> <input type='text' class='layoutFieldName layoutField' name='name' onchange='registerField(this, this.parentNode.parentNode)'></input> </div>" +
"</div>" +
"<div class='fieldGroup'>" +
"<div> <label>Start<span class='obrigatory'>*</span>:</label> <input type='text' name='start' class='layoutField'></input> </div>" +
"<div> <label>End<span class='obrigatory'>*</span>:</label> <input type='text' name='end' class='layoutField'></input> </div>" +
"</div>" +
"<div class='fieldGroup'>" +
"<div><label>Level<span class='obrigatory'>*</span>:</label> <input type='number' name='level' class='layoutField'></input> </div>" +
"</div>" + 
"<div class='fieldGroup textDependant'>" +
"<div> <label>Font Size<span class='obrigatory'>*</span>:</label> <input type='number' value='1' min='0' name='scale' class='layoutField'></input> </div>" +
"</div>" + 
"<div class='fieldGroup imageDependant invisible'>" +
"<div> <label>Default:</label> <input type='file' name='default' class='layoutField'></input></div>" +
"</div>" + 
"<div class='closeBtn'> <a onclick='removeLayoutField(this.parentNode.parentNode)'>X</a></div>";

const cardElements = document.getElementById("cardElements");
const cardField = "<div class='layoutFieldContainer'></div>"
+"<div class='closeBtn'> <a onclick='removeCardField(this.parentNode.parentNode)'>X</a></div>";

const gridExample = document.getElementById("gridExample");

function addLayoutField() {
    lastFieldID++;
    var layoutDiv = document.createElement("div");
    layoutDiv.id = "layoutField-" + lastFieldID;
    layoutDiv.className = "layoutForm";
    layoutDiv.innerHTML = layoutField;
    layoutElements.appendChild(layoutDiv);
}

function registerField(fieldObject, fieldGroup) {
    let layoutFieldType = fieldGroup.getElementsByClassName('layoutFieldType')[0].value;
    
    let layoutID = fieldGroup.parentElement.id;
    layoutID = layoutID.charAt(layoutID.length-1);
    
    removeLayoutByID(layoutID);

    let layoutFieldObj = {name: fieldObject.value, type: layoutFieldType, id: layoutID};

    currentLayoutFields.push(layoutFieldObj);
    updateCardFields();
}

function showTypeFields(fieldType, fieldGroup) {
    let imageGroup = fieldGroup.getElementsByClassName('imageDependant')[0];
    let textGroup = fieldGroup.getElementsByClassName('textDependant')[0];

    if(fieldType.value == 'image') {
        if(imageGroup.classList.contains('invisible')) imageGroup.classList.remove('invisible');
        if(!textGroup.classList.contains('invisible')) textGroup.classList.add('invisible');
    } else {
        if(!imageGroup.classList.contains('invisible')) imageGroup.classList.add('invisible');
        if(textGroup.classList.contains('invisible')) textGroup.classList.remove('invisible');
    }
}

function updateCardFields() {
    for(let i=1; i < cardElements.childElementCount + 1; i++) { //childrenNode 0 is a text for some reason
        
        let cardField = cardElements.childNodes[i].getElementsByClassName('layoutFieldContainer')[0];
        cardField.innerHTML = ""; //Clears the card field
        
        if(currentLayoutFields.length == 0) {
            //Write message about no fields
            let message = document.createElement("div");
            message.innerHTML = "<p> There are no layout fields registered yet. </p>";
            cardField.appendChild(message);
        } else for(let j=0; j<currentLayoutFields.length; j++) {
            let fieldName = currentLayoutFields[j].name;
            let fieldType = currentLayoutFields[j].type;

            let currentField = document.createElement("div");
            currentField.className = "cardField";
            
            //Check if the field is an image
            if(fieldType == 'text') currentField.innerHTML = "<div> <label>" + fieldName + ":</label> <input type='text' name='" + fieldName + "'></input> </div>";
            else currentField.innerHTML = "<div> <label>" + fieldName + ":</label> <input type='file' name='" + fieldName + "'></input> </div>";
            
            cardField.appendChild(currentField);
        }

    }
}

function addCardField() {
    lastCardID++;
    var cardDiv = document.createElement("div");
    cardDiv.id = "cardField-" + lastCardID;
    cardDiv.className = "cardForm";
    cardDiv.innerHTML = cardField;
    cardElements.appendChild(cardDiv);
    
    updateCardFields();
}

function removeLayoutField(layoutObject) {
    let layoutOptionName = layoutObject.getElementsByClassName('layoutFieldName')[0].value;
    
    let layoutOption = currentLayoutFields.find(obj => {
        return obj.name === layoutOptionName
    })

    let optionIndex = currentLayoutFields.indexOf(layoutOption);

    if (optionIndex > -1) {
        currentLayoutFields.splice(optionIndex, 1);
    }

    layoutObject.remove();
    updateCardFields();
}

function removeLayoutByID(layoutID) {
    let layoutOption = currentLayoutFields.find(obj => {
        return obj.id === layoutID
    })

    let optionIndex = currentLayoutFields.indexOf(layoutOption);

    if (optionIndex > -1) {
        currentLayoutFields.splice(optionIndex, 1);
    }

    updateCardFields();
}

function removeCardField(cardObject) {
    cardObject.remove();
}

function buildGrid() {
    
    let width = document.getElementsByName('gridWidth')[0].value;
    let height = document.getElementsByName('gridHeight')[0].value;
    let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    let theTable = "<table class='exampleGrid'>";

    if(height > 0) {
        //Grid Letter Row
        theTable+= "<tr>";
        theTable += "<td class='GridEmpty'></td>";

        for(let j=0; j<width; j++) {
            theTable += "<td class='GridLetter'>"+alphabet[j]+"</td>";
        }
        theTable+= "</tr>";
    }

    for(let i=0; i<height; i++) {

        theTable += "<tr>";
        theTable += "<td class='GridNumber'>"+(i+1)+"</td>"; //Grid Number in the Start of each Row

        for(let j=0; j<width; j++) {
            theTable += "<td></td>";
        }

        theTable += "</tr>";
    }

    theTable += "</table>"

    gridExample.innerHTML = theTable;
}