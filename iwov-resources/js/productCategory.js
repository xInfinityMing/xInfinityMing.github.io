$(document).ready(function(){
    // compared cards
    var comparedCards = [];

    var maxComparedNum = 4;

    if($(window).width() < 768) {
        maxComparedNum = 2;
    } 

    $(window).resize(function() {
        if($(window).width() < 768) {
            maxComparedNum = 2;  
        } 

        if($(window).width() >= 768) {
            maxComparedNum = 4;  
        }
        
        renderComparedCard();

        displayMaxCards();
    })

    initCarousel($(".try-figure-out"));
    initCarousel($(".bank-beyond-save"));
    displayMaxCards();

   // filter
   $(".category-page-filter .filter-list").on('click', 'li', function() {
        $(".category-page-filter .filter-list li").removeClass('btn-gradient-blue--active');    
        $(this).addClass('btn-gradient-blue--active');   
        categoryFilter($(this).text());
   })

   // load more
   $(".category-page-filter .more-btn").click(function() {
        $(".category-page-filter .category-items .category-item").removeClass('hiden-other');
        $(this).addClass('d-none');
   })

    // click compare btn in card, display overlay
   $(".category-page-filter .compare-btn").click(function() {
        var compardCard = {}; 
        var $card = $(this).closest(".category-item").find(".card");
        var $cardImgSrc = $card.find(".card-img-top").attr("src");
        var $cardId = $card.find(".card-body .card-id").text();
        var $cardTitle = $card.find(".card-body .card-title").text();
        compardCard.img = $cardImgSrc;
        compardCard.id= $cardId;
        compardCard.title = $cardTitle;

        if(comparedCards.length < maxComparedNum && !ifExist(compardCard.id)) {
            comparedCards.push(compardCard);
        }

        if($(".compare-overlay").hasClass("opacity-0")) {
            $(".compare-overlay").removeClass("opacity-0").addClass('opacity-1');
        }

        renderComparedCard();
    })
  
   // close compare overlay 
   $(".compare-overlay .close-btn").click(function(){
       comparedCards.length = 0;
       $(".compare-overlay").removeClass("opacity-1").addClass('opacity-0');
   })

   //start compare
   $(".compare-overlay .compare-box-btn").click(function(){
        var paramIds = getParamIds();
        var _href = $(this).attr("data-href");
        window.location.href = _href + "?ids=" + paramIds;
   })
   
   //delete compared card
   $(".compare-overlay").on('click','.inner-close-btn', function() {
      var _delId = $(this).siblings(".card-id").text();
      comparedCards = removeCardWithId(_delId);
      renderComparedCard();
   })

   function initCarousel($element) {
        // slide carousel 
        // - 2 becasue i add a empty carousel-item at the last for the last item style
        var carouselLength = $element.find('.tile-card-slide .carousel-item').length - 2;
        // If there is more than one item
        if (carouselLength) {
            $element.find('.tile-card-slide .carousel-control-next').removeClass('d-none');
        }

        $element.find('.tile-card-slide .carousel').carousel({
            interval: false,
            wrap: false
        }).on('slide.bs.carousel', function (e) {
            // First one
            if (e.to == 0) {
                $element.find('.carousel-control-prev').addClass('d-none');
                $element.find('.carousel-control-next').removeClass('d-none');
            } // Last one
            else if (e.to == carouselLength) {
                $element.find('.carousel-control-prev').removeClass('d-none');
                $element.find('.carousel-control-next').addClass('d-none');
            } // The rest
            else {
                $element.find('.carousel-control-prev').removeClass('d-none');
                $element.find('.carousel-control-next').removeClass('d-none');
            }
        });
   }

   function renderCard(element) {
     var card = '';
     if(element) {
       card = '<div class="compare-box-container fill">' + 
                '<div class="inner-close-btn"><img src="../iwov-resources/assets/Icons/icons-exit-blue.svg">' + 
                '</div>' +
                '<div class="compare-box rounded-10">' +
                    '<img class="img-stretch card-img" src="'+ element.img +'"> ' +
                '</div>' + 
                '<div class="subtitle mt-3">'+ element.title +'</div>' + 
                '<div class="card-id d-none">'+ element.id +'</div>' +
              '</div>';
        
     } else {
        card = '<div class="compare-box-container">' + 
                    '<div class="inner-close-btn"><img src="../iwov-resources/assets/Icons/icons-exit-blue.svg">' + 
                    '</div>' +
                    '<div class="compare-box rounded-10"></div>' + 
                    '<div class="subtitle mt-3"></div>' + 
                    '<div class="card-id d-none"></div>' +
                '</div>';
     }
     return card;
   }

   function removeCardWithId(id) {
        return comparedCards.filter(function(card) {
            if (card.id == id) {
                return false;
            }
            return true;
        });
   }

   function renderComparedCard() {
        var compardCardHtml = '';
        // render overlay cards
        for(var i = 0; i < maxComparedNum; i++ ) {
            if(comparedCards.length > 0) {
                for(var index = 0; index < comparedCards.length; index ++) {
                    if(i > comparedCards.length - 1) {
                        //render empty
                        compardCardHtml += renderCard();
                        break;
                    } 
                    
                    if(i == index) {
                        compardCardHtml += renderCard(comparedCards[index]);
                        break;
                    }
                }
            } else {
                compardCardHtml += renderCard();
            }
           
        }

        $(".compare-overlay .container").empty().append(compardCardHtml);
   }

   function getParamIds() {
        return comparedCards.map(function(card) {
            return card.id;
        })
   }

   function ifExist(id) {
        return comparedCards.filter(function(card) {
            if(card.id == id) {
                return true;
            }
            return false;
        }).length > 0;
   }

   function getMaxNum() {
       var maxNum = 3;
       if($(window).width() >= 576) {
          maxNum = 6;
       }

       return maxNum;
   }

   function displayLoadMoreBtn(count) {
        $(".category-page-filter .more-btn").removeClass("d-none").text("Load more accounts(" + count + ")");
   }

   // display max cards at category page filter component
   function displayMaxCards() {
        var maxNum = getMaxNum();
        var categoryItems = $(".category-page-filter").find(".category-items").children(".category-item");
        
        var dblockCategoryItems = categoryItems.filter(function(i,item) {
            if($(item).hasClass("hiden-filter")) {
                return false;
            }
            return true;
        });

        if(dblockCategoryItems.length > maxNum) {
            // hide others and add load more btn
            for(var index = 0; index < dblockCategoryItems.length; index ++) {
            
                if(index + 1 > maxNum) {
                    $(dblockCategoryItems[index]).addClass("hiden-other");
                }
            }
            
            displayLoadMoreBtn(parseInt(dblockCategoryItems.length - maxNum));

        } else {
            $(".category-page-filter .more-btn").addClass("d-none")
        }
   }

   function categoryFilter(categoryName) {
      var cname = formatCategoryName(categoryName);
      
      var categoryItems = $(".category-page-filter").find(".category-items").children(".category-item");
      
      categoryItems.filter(function(index,item) {
        $(item).removeClass("hiden-filter").removeClass("hiden-other");

        //all, first word is all
        if(cname.indexOf("all") == 0) {
            $(".category-page-filter").find(".category-items").children(".category-item").removeClass("hiden-filter").removeClass("hiden-other");
            displayMaxCards();
            return true;
        }

        var cardName = formatCategoryName($(item).find(".card .card-subtitle").text());
        if(cardName !== cname) {
            $(item).addClass("hiden-filter");
            return false;
        }
        return true;
      });
      
      displayMaxCards();
   }

   function formatCategoryName(name) {    
        return name.toLowerCase().replace(/\s*/g,"");
   }
   
})
