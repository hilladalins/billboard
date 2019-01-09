var billboard = {}

billboard.init = function(){
    $("#add").on("click", function(){
        $("#add-button").addClass("unvisible")
        $("#add-form-wrap").removeClass("unvisible");
    })
}








$(document).ready(function () {
    billboard.init();
});