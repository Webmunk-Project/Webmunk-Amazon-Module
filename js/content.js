window.registerModuleCallback(function (config) {
  const addSelectors = [
    '[data-asin!=""][data-asin]', // Element has ASIN
    // '[data-csa-c-asin!=""][data-csa-c-asin]', // Element has ASIN
    '.a-carousel-card:has([href*="/dp/"])', // Sponsored links w ASIN in URL: "/dp/ASIN/"
    '.a-carousel-card:has([href*="/gp/product/"])', // Sponsored links w ASIN in URL: "/dp/ASIN/"
    '.a-carousel-card:has([href*="/gp/buyagain/"])', // Sponsored links w ASIN in URL: "/dp/ASIN/"
    '.a-carousel-card:has([href*="/gp/slredirect"])', // Sponsored links w/o ASIN
    '.a-section:has(.sbv-product-container)', // Product w/ video ad
    '.a-section:has(.sbv-product-container)', // Product w/ video ad
    'th.comparison_image_title_cell', // Comparison table
    'td.comparison_add_to_cart_button', // Comparison table
    '#ape_Detail_dp-ads-center-promo_Desktop_placement', // Large page ad
    'div#ad:has([href*="/dp/"])', //
    'div#ad:has(picture[data-testid="productImage"])', //
    '.a-fixed-left-grid-inner:has([href*="/dp/"])',
    'a[href*="/gp/product/"]', //
    'a[href*="/gp/buyagain/"]', //
    'a[href*="/dp/"]' //
  ]

  const clearSelectors = [
    '#reviews-image-gallery-container', // Review images
    '[data-video-url]', // Product videos,
    '.contributorNameID', // Authors / contributors,
    '#detailBullets_averageCustomerReviewsNameID', // Star reviews
    '#detailBullets_averageCustomerReviews', // Star reviews
    '#averageCustomerReviews' // Star reviews
  ]

  $.expr.pseudos.isAmazonProductItem = $.expr.createPseudo(function (parameters) {
    console.log('[Webmunk Amazon Tools] Setting up item selector...')

    return function (elem) {
      let isAmazonItem = false

      addSelectors.forEach(function (selector) {
        if (isAmazonItem) {
          // Do nothing
        } else if ($(elem).is(parameters + selector)) {
          isAmazonItem = true
        }
      })

      clearSelectors.forEach(function (selector) {
        if (isAmazonItem === false) {
          // Do nothing
        } else if ($(elem).is(parameters + selector)) {
          isAmazonItem = false
        }
      })

      return isAmazonItem
    }
  })

  const addGroupSelectors = [
    'div[data-asin]:has(span:webmunkContainsInsensitive("Amazon’s Choice"))', // Amazon's Choice
    'div[data-asin]:has(span:webmunkContainsInsensitive("For you from our brands"))' // Amazon's Choice
  ]

  $.expr.pseudos.isAmazonProductGroup = $.expr.createPseudo(function (parameters) {
    console.log('[Webmunk Amazon Tools] Setting up group selector...')

    return function (elem) {
      let isAmazonGroup = false

      addGroupSelectors.forEach(function (selector) {
        if (isAmazonGroup) {
          // Do nothing
        } else if ($(elem).is(parameters + selector)) {
          isAmazonGroup = true
        }
      })

      return isAmazonGroup
    }
  })
})
