define(["jquery","datatables-plugin"],function(e){var t;return t={init:function(n){var r=[];e(".tablesorter-js > thead th").each(function(t){e(this).hasClass("no-tablesorter-js")?r.push({bSortable:!1}):r.push(null)});var i=t.oTable(r);e(".tablesorter-js").length&&(e("#filterTableInput").focus(),e("#filterTableInput").keydown(function(t){i.fnFilter(e(this).val())}))},oTable:function(t){var n=e(".tablesorter-js").dataTable({bPaginate:!1,bLengthChange:!1,bFilter:!0,bSort:!0,bInfo:!1,bAutoWidth:!1,bRetrieve:!1,asSorting:!0,bSearchable:!0,aaSorting:[],aoColumns:t,oLanguage:{sSearch:""},bStateSave:!0});return n}},t});