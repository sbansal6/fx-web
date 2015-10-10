/**
   * Define soure file component :-
   * Properties:- 
   *    FileName : Select file from directory (Phase 1)
   *    Html :- Dynamic html for popup box (Phase 1)
   *    Fields:- Array of Fields in fileName, drop down check box (Phase 2), update html
   *    FileProperties: Define file properties like file type (Phase 2), update html
   * 
*/
   var FileSourceConnector = function(){
    var self = this ;
    this.category = "Connector"
    this.key = "FileSource"
    this.fileName = ""
    this.fields = []
    this.loc = "85 160"
    this.image = "/images/textfile.gif"
  }


module.exports = FileSourceConnector;  