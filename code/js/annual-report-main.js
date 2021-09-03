//hide div until clarendon loads
//this method of loading custom fonts was tested against others including some native browser behavior, css inline code, etc, with inconclusive results.
//this method relies on traditional @font-face techniques for implementing custom fonts. See the custom-type-starter.scss file.

document.fonts.ready.then(function () {
    var titleContent = document.getElementById('hide-title-load');
    titleContent.style.visibility = "visible";
});

document.fonts.ready.then(function() {
    var statContent = document.getElementById('hide-clar-load');
    console.log(statContent);
    statContent.style.visibility = "visible";
});

