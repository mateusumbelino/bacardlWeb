var lastFieldID = 0;
var lastCardID = 0;
var currentLayoutFields = [];
const layoutElements = document.getElementById("layoutElements");
const layoutField = 
"<div class='fieldGroup'>" +
"<div> <label>Type<span class='obrigatory'>*</span>:</label> <select name='type' class='layoutFieldType' onchange='showImageFields(this, this.parentNode.parentNode.parentNode)'><option value='text'>Text</option> <option value='image'>Image</option></select> </div>" +
"<div> <label>Name<span class='obrigatory'>*</span>:</label> <input type='text' class='layoutFieldName' name='name' onchange='registerField(this, this.parentNode.parentNode)'></input> </div>" +
"</div>" +
"<div class='fieldGroup'>" +
"<div> <label>Start<span class='obrigatory'>*</span>:</label> <input type='text' name='start'></input> </div>" +
"<div> <label>End<span class='obrigatory'>*</span>:</label> <input type='text' name='end'></input> </div>" +
"</div>" +
"<div class='fieldGroup'>" +
"<div><label>Level<span class='obrigatory'>*</span>:</label> <input type='number' name='level'></input> </div>" +
"</div>" + 
"<div class='fieldGroup imageDependant invisible'>" +
"<div> <label>Scale<span class='obrigatory'>*</span>:</label> <input type='number' value='1' name='scale'></input> </div>" +
"<div> <label>Default:</label> <input type='file' name='default'></input></div>" +
"</div>" + 
"<div class='closeBtn'> <a onclick='removeLayoutField(this.parentNode.parentNode)'>X</a></div>";

const cardElements = document.getElementById("cardElements");
const cardField = "<div class='layoutFieldContainer'></div>"
+"<div class='closeBtn'> <a onclick='removeCardField(this.parentNode.parentNode)'>X</a></div>";


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
    let layoutFieldObj = {name: fieldObject.value, type: layoutFieldType};
    
    currentLayoutFields.push(layoutFieldObj);
    updateCardFields();
}

function showImageFields(fieldType, fieldGroup) {
    
    let imageGroup = fieldGroup.getElementsByClassName('imageDependant')[0];

    if(fieldType.value == 'image') {
        if(imageGroup.classList.contains('invisible')) imageGroup.classList.remove('invisible');
    } else {
        if(!imageGroup.classList.contains('invisible')) imageGroup.classList.add('invisible');
    }
}

function updateCardFields() {
    for(let i=1; i < cardElements.childElementCount + 1; i++) { //childrenNode 0 is a text for some reason
        
        let cardField = cardElements.childNodes[i].getElementsByClassName('layoutFieldContainer')[0];
        cardField.innerHTML = ""; //Clears the card field
        
        if(currentLayoutFields.length == 0) {
            //Write message about no fields
            let message = document.createElement("div");
            message.innerHTML = "<p> There are no layout fields registered </p>";
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

function removeCardField(cardObject) {
    cardObject.remove();
}