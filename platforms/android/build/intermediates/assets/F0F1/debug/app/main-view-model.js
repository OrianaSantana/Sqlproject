var Observable = require("data/observable").Observable;
var magnetometer = require("nativescript-plugin-magnetometer");
var TimeDatePicker = require("nativescript-timedatepicker");
var file_system_1 = require("file-system");
var dialogs = require("ui/dialogs");

var miObjeto = function (vx, vy, vz) {
    this.vx = vx || '';
    this.vy = vy || '';
    this.vz = vz || '';
};
var objeto;
var intervalo;
var intervalo1;
var intervalo2;
var data1;
var x;
var y;
var z;
var Gfecha;
var Gsalon;
var Gedificio;
var Formatear;   
var counter;
var ArregloGuardar = []; 
var edificio;
var activarUpdate = false;

function createViewModel() { 
    var viewModel = new Observable();    
    this._validarBoton = false; 

    viewModel.onTap1 = function () {
        if(!activarUpdate)
        {
            counter = 5000;   
            activarUpdate = true;
        }     
    };
    viewModel.onTap2 = function () {
        if(!activarUpdate){
            counter = 2000;
            activarUpdate= true;
        }        
    };
    viewModel.onTap3 = function () {
        if(!activarUpdate){
            counter = 8000;
            activarUpdate = true;    
        }    
    };

    viewModel.insert = function() {
        if(activarUpdate){
            if (!this._validarBoton) {
                this._validarBoton = true;
            }
            else if (this._validarBoton == true) {
                this._validarBoton = false;
                activarUpdate=false;
            }
            //this.SeleccionarLugar();
            this.activarMagnetometro();
        }else if(!activarUpdate){
            dialogs.action("Debe indicar el intervalo de tiempo para tomar medidas"); 
        }
        
    }

    Object.defineProperty(viewModel, "messageSalon", {
        get: function () {
            return this._mensajesalon;
        },
        set: function (value) {
            if (this._mensajesalon !== value) {
                this._mensajesalon = value;
                this.notifyPropertyChange('messageSalon', value);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModel, "messageEdificio", {
        get: function () {
            return this._mensajeedificio;
        },
        set: function (value) {
            if (this._mensajesedificio !== value) {
                this._mensajeedificio = value;
                this.notifyPropertyChange('messageEdificio', value);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(viewModel, "messageview", {
        get: function () {
            return this._mensajeview;
        },
        set: function (value) {
            if (this._mensajeview !== value) {
                this._mensajeview = value;
                this.notifyPropertyChange('messageview', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(viewModel, "messagetext", {
        get: function () {
            return this._mensajetext;
        },
        set: function (value) {
            if (this._mensajetext !== value) {
                this._mensajetext = value;
                this.notifyPropertyChange('messagetext', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    viewModel.tapLugar = function() {
        var _this = this;            
            try{
                dialogs.action("Seleccione un edificio", "Cancelar", ["001A", "001EC", "001L", "001P"]).then(function (result) {
                        if (result){
                            alert("El edificio seleccionado es:" + result);
                            console.log("El edificio seleccionado es: " + result);
                            _this.messageEdificio = result.toString();
                            Gedificio = result.toString();
                            edificio= result.toString();                            
                        }        
                });
            }  
                                               
     catch(execption){
        }   
    };

    viewModel.tapSalon = function(){
        var _this = this;        
        try{    
                if (edificio=="001A"){
                dialogs.action("Seleccione un salón", "Cancelar", ["0-001","1-11", "1-13","1-21","1-22","1-23","1-24","1-41","1-42","1-43",
                "1-44","1-51","1-52","1-53","1-54","1-55","1-56","1-58","1-59","2-11","2-12","2-13","2-21","2-22","2-23","2-24","2-41","2-42","2-43",
                "2-44","2-51","2-52","2-55","2-56","2-57","2-58","2-61","3-10","3-11","3-12","3-21","3-22","3-23","3-24","3-41","3-42","3-43","3-44",
                "3-51","3-52","3-54","3-55","3-56","3-57","3-58","3-59","4-11","4-12","4-21","4-22","4-41","4-43","4-51","4-52","4-53","4-54","4-55",
                "4-61","5-03","5-04","5-11","5-12","5-13","5-21","5-22","5-41","5-42","5-43","5-51","5-52","5-53","5-54","5-55","5-56","5-57","6-PB",
                "6-01","6-02","6-03","6-04","6-11","6-12","6-13","6-21","6-22","6-23","6-24","6-41","6-42","6-43","6-44","6-51","6-52","6-53",
                "6-54"]).then(function (result) {
                        if (result){
                            alert("El salón seleccionado es:" + result);
                            console.log("El salón seleccionado es: " + result);
                            _this.messageSalon = result.toString();
                            Gsalon = result.toString();                            
                        }        
                });
            }
            else if (edificio=="001EC"){
                    dialogs.action("Seleccione un salón", "Cancelar", ["-11","-12","-13","-14","-15","-16","-17","-21","-22","-23","-24","-25","-26",
                    "-27","-28","-31","-32","-33","-34","-35","-36","-37","-38","-41","-42","-43","-44","-45","-46","-47","-48"]).then(function (result) {
                     if (result){
                            alert("El salón seleccionado es:" + result);
                            console.log("El salón seleccionado es: " + result);
                            _this.messageSalon = result.toString();
                            Gsalon = result.toString();                            
                        }
                    });
                }
            else if (edificio=="001L"){
                    dialogs.action("Seleccione un salón", "Cancelar", ["BMPL","001-Auditorio","002A","006","009","011","013","014","015","018","018A","018B",
                    "021","023","024","024D","025","025A","025B","026","027","027A","027B","027C","028","0311","0401","0402","101","102","105","107","1105",
                    "111","1112","1113","1114","1115","113","117","1201","1202","1203","1204","1205","1206","1207","1208","1209","1210","1211","1212","1213",
                    "1214","1215","1216","1217","1218","124","1401","1402","211","-219","221","227B","227C","228B","228D","228E","2303","2304","2309","2310",
                    "2311","2312","2313","2314","2315","2316","2317","2318","2-36"]).then(function (result) {
                    if (result){
                            alert("El salón seleccionado es:" + result);
                            console.log("El salón seleccionado es: " + result);
                            _this.messageSalon = result.toString();
                            Gsalon = result.toString();                            
                    }
                 });
            
                }
                else if (edificio=="001P"){
                    dialogs.action("Seleccione un salón", "Cancelar", ["1-1","1-2","1-3","1-4","1-5","2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9",
                    "2-10","2-12","2-13","2-14","2-15","2-FI"]).then(function (result) {
                    if (result){
                            alert("El salón seleccionado es:" + result);
                            console.log("El salón seleccionado es: " + result);
                            _this.messageSalon = result.toString();
                            Gsalon = result.toString();                            
                    }
                    });
                }
        }
        
        catch(execption){
        }
    };

    viewModel.tapText = function () {
        var _this = this;
        //Create a callback function
        var mCallback = (function (result) {
            if (result) {
                alert("La fecha es: " + result);
                _this.messagetext = result.toString();
                Gfecha =  result.toString();     
                Gfecha = Gfecha.replace("-0430","");
                for (i = 0; i <= Gfecha.length; i++) { 
                    Gfecha = Gfecha.replace(" ","-");
                }                
                console.log(Gfecha);           
            }
        });
        //Initialize the PickerManager (.init(yourCallback, title, initialDate))
        TimeDatePicker.init(mCallback, null, null);
        //Show the dialog
        TimeDatePicker.showDatePickerDialog();
    };
    viewModel.activarMagnetometro = function () {
        if (this._validarBoton) {
            magnetometer.startMagnetometerUpdates(function (data) {
                data1 = data;
                objeto = new miObjeto(data.x, data.y, data.z);    
            }
            );
        }
        else if (!this._validarBoton) {
            magnetometer.stopMagnetometerUpdates();
        }
        this.updateTextView();
        
    };

    viewModel.select = function() {    
            var SDCard = android.os.Environment.getExternalStorageState();
            console.log("Estado de la memoria es:"+ " "+SDCard);
            var tempFilePath = file_system_1.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString());
            var folder = file_system_1.Folder.fromPath(tempFilePath);
            var nombreArchivo = "ArchivoArreglo";
            var testFile = folder.getFile(Gfecha+Gedificio+"-"+Gsalon+".txt")        
            console.log("Este es el arreglo:" + " "+ ArregloGuardar);
            testFile.writeText(JSON.stringify(ArregloGuardar));        
            testFile.readText()
                    .then(function (content) {
                    console.log("Contenido del archivo"+ content);
                    console.log("se guardo");
                }, function (error) {
                    console.log("Error " + error);
                });
    }

    viewModel.limpiar = function(){
        var _this = this;
        ArregloGuardar = [];
        _this.messageview = "";
        _this.messageSalon = "";
        _this.messageEdificio= "";
        _this.messagetext= "";

    }               

    viewModel.updateTextView = function () {
        //if (activarUpdate){
            var _this = this;
            if (this._validarBoton) {
                intervalo1 = setInterval(function () {_this.messageview = "x: " + objeto.vx + " " + "y: " + objeto.vy + " " + "z: " + objeto.vz;}, counter);
                intervalo = setInterval(function () { console.log(" " + " x: " + " " + data1.x + " " + " y: " + " " + data1.y + " " + " z: " + " " + data1.z); }, counter);            
                intervalo2 = setInterval(function(){ArregloGuardar.push(JSON.stringify(objeto))},counter);
            }else if (!this._validarBoton) {
                this.select();            
                clearInterval(intervalo);
                clearInterval(intervalo1);
                clearInterval(intervalo2);}
        //}else if(!activarUpdate){
           // dialogs.action("Debe indicar el intervalo de tiempo para tomar medidas"); 
        //}
        //activarUpdate = false;
    };       
 
    return viewModel;
}
exports.createViewModel = createViewModel;
