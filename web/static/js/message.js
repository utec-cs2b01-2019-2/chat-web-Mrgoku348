$(function(){
    var url = "http://127.0.0.1:8000/messages";
    var url_users = "http://127.0.0.1:8000/users";
    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url ,
            insertUrl: url ,
            updateUrl: url ,
            deleteUrl: url ,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),

        editing: {
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },

        remoteOperations: {
            sorting: true,
            paging: true
        },

        paging: {
            pageSize: 12
        },

        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [8, 12, 20]
        },

        columns: [{
            dataField: "id",
            dataType: "number",
            allowEditing: false
        }, {
            dataField: "content"
        }, {
            dataField: "sent_on",
            dataType: "date",
            format: "MM/dd/yyyy hh:mm"
        }, {
            dataField: "user_from_id",
            lookup: {
                    dataSource:  DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: url_users ,
                        insertUrl: url_users ,
                        updateUrl: url_users ,
                        deleteUrl: url_users ,
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    valueExpr: "id",
                    displayExpr: "username"
                }
        }, {
            dataField: "user_to_id",
            lookup: {
                    dataSource:  DevExpress.data.AspNet.createStore({
                        key: "id",
                        loadUrl: url_users ,
                        insertUrl: url_users ,
                        updateUrl: url_users ,
                        deleteUrl: url_users ,
                        onBeforeSend: function(method, ajaxOptions) {
                            ajaxOptions.xhrFields = { withCredentials: true };
                        }
                    }),
                    valueExpr: "id",
                    displayExpr: "username"
                }
        } ],
    }).dxDataGrid("instance");
});