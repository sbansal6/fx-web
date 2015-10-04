/**
   * Define soure file component :-
   * Properties:- 
   *    FileName : Select file from directory (Phase 1)
   *    Html :- Dynamic html for popup box (Phase 1)
   *    Fields:- Array of Fields in fileName, drop down check box (Phase 2), update html
   *    FileProperties: Define file properties like file type (Phase 2), update html
   * 
*/
   var FileSource = function(){
    var self = this ;
    this.category = "File"
    this.key = "Source"
    this.fileName = ""
    this.fields = []
    this.loc = "85 160"
    this.html = '<div title="Select File"> <form> FileName:<br> <select id="fileList" name="files"> </select> </form> </div>'
    this.editNode = function(e,obj){
      var html =  $(self.html)
      // add filenames to html

      listFilesInDirectory(function(err,result){
          result.forEach(function(file){
            html.find('#fileList').append($('<option>' + file + '</option>'));
          })
       });
      $(html)
                .appendTo('body')
                .dialog({
                    modal: true,
                    width: 425,
                    height: 275,
                    buttons: {
                        OK: function(){
                            // todo:- have to refresh whole diagram to change selected file. 
                            var fileName = $('#fileList option:selected').text();
                            self.fileName = fileName ;
                            // get all headers for this file using server rest api call
                            var data = myDiagram.model.findNodeDataForKey(self.key)
                            var newFields = [] 
                            getFileHeaders(fileName,function(err,result){
                              result.headers.forEach(function(header){
                                newFields.push({ name:header, color: "#F7B84B", figure: "Ellipse"})
                              })
                              myDiagram.model.setDataProperty(data,"fields",newFields)
                              
                            });
                            $(this).dialog('close');
                        },
                        CANCEL : function(){
                            $(this).dialog('close');
                        }
                    }
                });
     }
  }


module.exports = FileSource;  