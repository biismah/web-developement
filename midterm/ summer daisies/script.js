
// Get HTML elements

const searchInput = document.getElementById("productSearch");
const sortButton = document.getElementById("sortPrice");
const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");


// Get all existing product cards

const products = Array.from(productGrid.children);


// Premium price limit (N x 100)

const premiumLimit = 28 * 100;


// TASK 3 (A): Add Premium Labels

products.forEach(function(product) {

    // Get price from the existing product card

    const priceText = product.querySelector(".product-card p").textContent;

    // Convert price into a number

    const price = Number(priceText.replace(/[^\d.]/g, ""));

    // Check if price is greater than 2800

    if (price > premiumLimit) {

        // Create Premium label

        const label = document.createElement("span");

        label.textContent = "Premium";
        label.classList.add("premium-label");

        // Add label inside the product card

        product.querySelector(".product-card").prepend(label);

    }

});


// TASK 3 (B): Search and Category Filter

function filterProducts() {

    // Get search text

    const searchText = searchInput.value.toLowerCase().trim();

    // Get selected category

    const selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    );

    let visibleCount = 0;


    // Check every existing product

    products.forEach(function(product) {

        // Get product name

        const productName = product.querySelector(
            ".product-card h3"
        ).textContent.toLowerCase();

        // Get product category

        const productCategory = product.dataset.category;

        // Check search match

        const matchesSearch = productName.includes(searchText);

        // Check category match

        let matchesCategory = true;

        if (selectedCategory.id !== "filter-all") {

            const categoryName = selectedCategory.id.replace(
                "filter-", ""
            );

            matchesCategory = productCategory === categoryName;

        }


        // Product must match BOTH conditions

        if (matchesSearch && matchesCategory) {

            product.style.display = "";
            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });


    // Show or hide No products found message

    if (visibleCount === 0) {

        productGrid.style.display = "none";
        noProducts.style.display = "block";

    } else {

        productGrid.style.display = "";
        noProducts.style.display = "none";

    }

}


// Search when user types

searchInput.addEventListener("input", filterProducts);


// Apply search again when category changes

document.querySelectorAll(
    'input[name="category"]'
).forEach(function(radio) {

    radio.addEventListener("change", filterProducts);

});


// TASK 3 (C): Sort Products by Price

let ascending = true;

sortButton.addEventListener("click", function() {

    // Sort existing product elements by their prices

    products.sort(function(a, b) {

        const priceA = Number(
            a.querySelector(".product-card p")
                .textContent.replace(/[^\d.]/g, "")
        );

        const priceB = Number(
            b.querySelector(".product-card p")
                .textContent.replace(/[^\d.]/g, "")
        );


        if (ascending) {

            return priceA - priceB;

        } else {

            return priceB - priceA;

        }

    });


    // Move existing cards into sorted order

    products.forEach(function(product) {

        productGrid.appendChild(product);

    });


    // Reverse sorting direction for next click

    ascending = !ascending;


    // Apply current search and category filters

    filterProducts();

});


// Run filtering when page loads

filterProducts();
