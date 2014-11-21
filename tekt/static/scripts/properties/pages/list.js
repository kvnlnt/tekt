ARK.Properties_page_list = function(){

    var listCollection = new ARK.Properties();
    var listView       = new ARK.Properties_part_list({collection:listCollection});
    var createView     = new ARK.Properties_part_create({collection:listCollection});

    return{
        listView:listView,
        listCollection:listCollection,
        createView:createView
    }

};