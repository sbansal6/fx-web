var GoogleConnector = function(){
      var self = this;
      this.category = "File",
      this.key = "Google",
      this.fields = [
         { name: "ProductID", color: "#F7B84B", figure: "Ellipse" },
         { name: "ProductName", color: "#F25022", figure: "Rectangle" },
         { name: "Color", color: "#00BCF2" ,figure: "Triangle" },
         { name: "Brand", color: "#F25022" ,figure: "Rectangle" },
         { name: "Description", color: "#00BCF2" ,figure: "Rectangle" }
     ],
     this.loc = "485 160"
}

module.exports = GoogleConnector ;