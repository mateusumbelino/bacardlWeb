var defaultLayout = 
"layout:"+
"\n\t- name: Titulo\n\t  type: text\n\t  start: C11\n\t  end: G9\n\t  level: 3\n" + 
"\n\t- name: Ilustra\n\t  type: image\n\t  start: B2\n\t  end: H9\n\t  level: 1\n" + 
"\n\t- name: TextBox\n\t  type: image\n\t  start: B10\n\t  end: H14\n\t  level: 1\n\t  default: tbt.png\n" +
"\n\t- name: Description\n\t  type: text\n\t  start: D12\n\t  scale: 0.6\n\t  end: G13\n\t  level: 2\n" + 
"\n\t- name: Fundo\n\t  type: image\n\t  start: A1\n\t  end: I15\n\t  level: 0\n\t  default: bg.png\n" + 
"\nsize:"+
"\n  width: 600\n  height: 1000\n  unit: px\n"+
"\ngrid:"+
"\n  width: 9\n  height: 15\n";

var defaultList =
'- Titulo: "Grifinória"\n' + 
'  Ilustra: Gryffindor.png\n' +
'  Description: "A casa dos Corajosos"\n'
+"\n"+
'- Titulo: "Corvinal"\n' + 
'  Ilustra: Ravenclaw.png\n' +
'  Description: "A casa dos Sábios"\n'
+"\n"+
'- Titulo: "Lufa-Lufa"\n' + 
'  Ilustra: Hufflepuff.png\n' +
'  Description: "A casa dos Honestos"\n'
+"\n"+
'- Titulo: "Sonserina"\n' + 
'  Ilustra: Slytherin.png\n' +
'  Description: "A casa dos Ardilosos"\n';

window.onload = function(){ 
    document.getElementById('cardSettingsForm').textContent=defaultLayout;
    document.getElementById('cardListForm').textContent=defaultList;
};

