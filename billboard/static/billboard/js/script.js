var Billboard = {}

Billboard.init = function(){
    Billboard.defineVars();
    Billboard.bindEvents();
};

Billboard.defineVars = function(){
    Billboard.title = $("#title");
    Billboard.content = $("#content");
    Billboard.author = $("#author");
};

Billboard.bindEvents = function(){
    $("#add").on("click", Billboard.handleAddClick);
    $("#submit").on("click", Billboard.handleSubmit);
    $("#delete").on("click", Billboard.handleDeleteClick);
};

Billboard.handleAddClick = function(){
        date = Billboard.generateDate()
        $("#date-form").text(date)
        $("#add-button").addClass("invisible")
        $("#add-form-wrap").removeClass("invisible");
};

Billboard.handleSubmit = function(e){
        var valid = this.form.checkValidity();
        if (valid) {
            e.preventDefault();
            $.ajax({
            url: "http://127.0.0.1:8000/billboard/add",
            dataType: "json",
            type: 'POST',
            data:{
                csrfmiddlewaretoken: $.cookie("csrftoken"),
                title: Billboard.title.val(),
                content: Billboard.content.val(),
                author: Billboard.author.val()
                }
            }).done(function(){
                Billboard.generateAd(Billboard.title.val(), Billboard.content.val(), Billboard.author.val());
                Billboard.emptyForm();
            });
        }
};

Billboard.handleDeleteClick = function(){
    $("#add-button").removeClass("invisible");
    $("#add-form-wrap").addClass("invisible");
    Billboard.emptyForm();
}

Billboard.generateDate = function(){
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = (day<10 ? '0' : '') + day + '/'
    + (month<10 ? '0' : '') + month + '/' +
    d.getFullYear();
    return output;
};

Billboard.generateAd = function(title, content, author){
    let date = Billboard.generateDate();
    let container = $("#adds-container");
    let ad = $("<fieldset>").addClass("fieldset-ad stripe");
    ad.append($("<legend>").addClass("date").text(date));
    ad.append($("<div>").addClass("title").text(title));
    ad.append($("<p>").addClass("content").text(content));
    ad.append($("<div>").addClass("right-align").append($("<span>").addClass("author").text(author)));
    container.prepend(ad);
};

Billboard.emptyForm = function(){
    Billboard.title.val("");
    Billboard.content.val("Your message here");
    Billboard.author.val("")
};

$(document).ready(function () {
    Billboard.init();
});