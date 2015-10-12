var EbayConnector = function(){
      var self = this;
      this.category = "Connector"
      this.key = "Ebay"
      this.type = "Destination"
      this.image = "/images/ebay.jpg"
      this.movable = false
      this.copyable = false
      this.deletable = false
      this.fields = [
         { name: "ProductID", color: "#F7B84B", figure: "Ellipse" },
         { name: "ProductName", color: "#F25022", figure: "Rectangle" },
         { name: "Color", color: "#00BCF2" ,figure: "Triangle" },
         { name: "Brand", color: "#F25022" ,figure: "Rectangle" },
         { name: "Description", color: "#00BCF2" ,figure: "Rectangle" }
     ]
}

module.exports = EbayConnector ;