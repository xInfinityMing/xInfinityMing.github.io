$(document).ready(function(){
    //init tooltips
    $('[data-toggle="tooltip"]').tooltip();

    displayTableCol();

    $(window).resize(function() {
        displayTableCol();
    })

    function displayTableCol() {
        if($(window).width() < 768) {
            $(".compare-tables table").addClass('two-cols');
        } else {
            $(".compare-tables table").removeClass('two-cols');
        }
    }

    const tableData = window.data_compare_accounts;

    let tableHTML = "",
        tableListingName = "",
        tableImg = "",
        tableDropdown = "",
        tableListing = "",
        tablecolLength = 4;
        tableListingLength = tableData.listingHeader.length;

    for(var dm=0;dm<tableData.listing.length;dm++) {
      tableListingName+="<button class='dropdown-item' type='button' id='"+tableData.listing[dm].id+"'>"
                      + tableData.listing[dm].name +"</button>"
    }  
    for(var key=0;key<tablecolLength;key++) {
      if(tableData.listing[key]) {
        tableImg+="<th class='col-6 col-md-3' data-img='"+(key+1)+"'><img class='img-fluid' src='"+ tableData.listing[key].img + "' alt='" + tableData.listing[key].name + "'></th>";
        tableDropdown+="<th data-listingHeader='"+(key+1)+"'>"
                      +"<div class='dropdown dropdown-header-one'>"
                      +"<button class='btn dropdown-toggle uob-h6' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+tableData.listing[key].name+"</button>"
                      +"<div class='dropdown-menu'>";
                      
        for(var dm=0;dm<tableData.listing.length;dm++) {
          tableDropdown+="<button class='dropdown-item' type='button' id='"+tableData.listing[dm].id+"'>"
                          + tableData.listing[dm].name +"</button>"
        }    
        tableDropdown+="</div></div></th>";
      } else {
        tableImg+="<th class='col-6 col-md-3' data-img='"+(key+1)+"'><img class='img-fluid' src='' alt=''></th>"
        tableDropdown+="<th class='empty-col' data-listingHeader='"+(key+1)+"'><div class='dropdown'><button class='btn dropdown-toggle uob-h6' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Select</button>"
        tableDropdown+="<div class='dropdown-menu'>";    
        tableDropdown+=tableListingName;
        tableDropdown+="</div></div></th>";
      }
    }

    for(var key2=0;key2<tableListingLength;key2++) {
      tableListing+="<tr><td colspan='"+tablecolLength+"' class='table-sub-title text-center'>"+tableData.listingHeader[key2]+"</td></tr>";
      tableListing+="<tr class='table-content-row'>";

      for(var list=0;list<tablecolLength;list++) {
        if(tableData.listing[list]) {
          tableListing+="<td data-listing='"+(list+1)+"'>"+tableData.listing[list].listing[key2]+"</td>";
        } else {
          tableListing+="<td data-listing='"+(list+1)+"'></td>";
        }
      } 
      tableListing+="</tr>";
    }

    tableHTML+="<table class='table shadow'><thead><tr class='table-header-img'>"
              + tableImg
              + "</tr>"
              + "<tr class='table-header-title'>"
              + tableDropdown
              + "</tr>"
              + "</thead>"
              + "<tbody>"
              + tableListing
              + "</tbody>"
              + "</table>"

    $('#appendTables').append(tableHTML);

    $('.dropdown-item').on('click', function() {
      let $this = $(this);
      if($(this).closest('th').hasClass('empty-col')) {
        $(this).closest('th').removeClass('empty-col');
      }
      $(this).closest('th').find('.dropdown-toggle').text($(this).text());

      for(var z=0;z<tablecolLength;z++) {
        $.each($('#appendTables tbody .table-content-row'), function(key) {
          if(tableData.listing[z]) {
            if(tableData.listing[z].id == $this.attr('id')) {
              $('[data-img="'+$this.closest('th').attr('data-listingheader')+'"]').find('img').attr('src', tableData.listing[z].img)
              $(this).find('[data-listing="'+$this.closest('th').attr('data-listingheader')+'"]').html(tableData.listing[z].listing[key])
            }
          }
        });
      }
    });
})