const AjaxHelper = (url) => {
    app.post(url, function(req, res) {
        return res.json();
    });
}


export default AjaxHelper;