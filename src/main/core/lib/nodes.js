
var nodes = [
    {    name:'File'
        ,label:'File'
        ,type:'source'
        ,category:'source'
        ,image:"http://www.knowledgebase-script.com/kb/assets/file-txt.png"
        ,fields:[
        {name:'field1'}
        ,{name:'field2'}
        ,{name:'field3'}
    ]
        ,schema : {
            "type": "object",
            "properties": {
                "selectFile": {
                    "type": "string",
                    "format": "uri"
                },
                "type": {
                    "type":"string",
                    "title":"FileType",
                    "enum":['csv','tab']
                }
            }
        }
        ,options :{
            "fields":{
                "selectFile": {
                    "type": "file"

                },
                "type":{
                    "removeDefaultNone":true
                }
            },
            "form": {
                "attributes": {
                    "method": "POST",
                    "action": "/upload"
                },
                "buttons": {
                    "submit": {
                        "value": "Submit the Form",
                        "click": function(){
                            // this has all the values, use this to update data object or any other object on save.
                            var val = this.getValue();
                            var form = $('#alpaca2')
                            form.ajaxSubmit({
                                error: function(xhr) {
                                    console.log('error happend in form submit',xhr.status)
                                    alert('Error: ' + xhr.status);
                                },
                                success: function(response) {
                                    alert(response);
                                    console.log('selected node',nodeId)
                                }
                            });
                            return false;

                        }
                    }


                }
            }

        }
        ,data:{}
    },
    {   name:'Google'
        ,label:'Google'
        ,type:'target'
        ,category:'target'
        ,image:"http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png"
        ,fields:[
        {name:'id',required:true}
        ,{name:'title',required:true}
        ,{name:'description',required:true}
        ,{name:'google_product_category',required:true}
        ,{name:'product_type',required:true}
        ,{name:'link',required:true}
        ,{name:'image_link',required:true}
        ,{name:'price',required:true}
        ,{name:'condition',required:true}
        ,{name:'availability',required:true}
        ,{name:'brand',required:true}
        ,{name:'gtin',required:false}
        ,{name:'mpn',required:false}
        ,{name:'item_group_id',required:false}
        ,{name:'additional_image_link',required:false}
        ,{name:'sale_price',required:false}
        ,{name:'sale_price_effective_date',required:false}
        ,{name:'gender',required:false}
        ,{name:'age_group',required:false}
        ,{name:'color',required:false}
        ,{name:'size',required:false}
        ,{name:'material',required:false}
        ,{name:'pattern',required:false}
        ,{name:'shipping_weight',required:false}
        ,{name:'adwords_grouping',required:false}
        ,{name:'adwords_labels',required:false}
        ,{name:'excluded_destination',required:false}
        ,{name:'online_only',required:false}
        ,{name:'expiration_date',required:false}
        ,{name:'adwords_redirect',required:false}
        ,{name:'adult',required:false}
        ,{name:'multipack',required:false}
    ]}
];

module.exports = nodes;