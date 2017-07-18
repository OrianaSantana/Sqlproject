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
            counter = 500;
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
                dialogs.action("Seleccione un edificio", "Cancelar", ["001L"]).then(function (result) {
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
              
            
             if (edificio=="001L"){
                    dialogs.action("Seleccione un salón", "Cancelar", ["1207","1208","1209","1210","1211","1212","1213"]).then(function (result) {
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
                //var jsonText = JSON.stringify(objeto,replaceVar);            
                intervalo2 = setInterval(function(){ArregloGuardar.push(JSON.stringify(objeto))},counter);
                //intervalo2 = setInterval(function(){ArregloGuardar.push(jsonText)},counter);            
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
    function replaceVar(key, value){
        console.log(key);
        return toString().replace("{","");        
    };       
 
    return viewModel;
}
exports.createViewModel = createViewModel;