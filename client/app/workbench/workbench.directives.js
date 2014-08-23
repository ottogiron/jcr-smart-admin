define(['app/modules/directives','jquery','jstree'],function(directives,$){
    directives.
        directive('jumJsTree',['$timeout',function($timeout){
            function link(scope,element,attrs){ 
               
                
                //initialize jstree
                $(element).jstree({
                    core: {
                        data: loadData
                    },
                    "plugins" : [
                        "contextmenu", "dnd", "search",
                        "state", "types", "wholerow"
                     ],
                    contextmenu: {                        
                        items: function($tree){
                            return {
                                "Create": {
                                    "separator_after": true,
                                    label: "Create",
                                    "action": function(obj){
                                        scope.createTree($tree,obj);
                                    }
                                    
                                },
                                "Delete": {
                                    label: "Delete",
                                    "action": function(obj){
                                        scope.deleteTree($tree,obj);
                                    }
                                }
                            };
                        }
                    }
                   
                });
                
                function loadData(obj,cb){                    
                    if(scope.loadTree){
                        scope.loadTree(obj,function(trees){
                            var newTree = transformtoJSTree(trees);
                            cb.call(this,newTree);
                        }.bind(this));
                    }
                    else{
                        cb.call(this,[]);
                    }                   
                }
                
                function transformtoJSTree(trees) {
                    return _.map(trees, function(tree) {                      
                        if(tree.path){
                            return {
                                id: tree.path,
                                text: tree.name || tree.path,
                                children: true
                            };
                        }
                        
                    });
                } 

//                scope.$watch('trees',function(value){
//                       if(value){
//                            var nvalue = transformtoJSTree(value);
//                            $(element).jstree({core:{
//                              data: nvalue
//                          }});
//                       }                   
//                    });                
            }
            
            return {
                link: link
            }; 
    }]);
});
