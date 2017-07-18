var createViewModel = require("./main-view-model").createViewModel;
var Observable = require("data/observable").Observable;

//var file_system_1 = require("file-system");
var miObjeto = function (vx, vy, vz) {
    this.vx = vx || '';
    this.vy = vy || '';
    this.vz = vz || '';
};
    
function onNavigatingTo(args) {
    var page = args.object;        
    page.bindingContext = createViewModel(); 


}
exports.onNavigatingTo = onNavigatingTo;



