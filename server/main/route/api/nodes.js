module.exports = function (app,isLoggedIn) {
    
    /**
     * Returns all nodes in the system (connectors specific to that users tho)
     * 
     */ 
    app.get('/api/nodes',isLoggedIn,function(req,res){
            res.json({
                nodes:[
                    {
                        name:"Text File",
                        type:"Source",
                        icon:"fa-file-text"
                        
                    },
                    {
                        name:"Google",
                        type:"Connector",
                        icon:""
                    },
                    {
                        name:"Replace",
                        type:"Function",
                        
                    }
                    ]
            });
    });
}