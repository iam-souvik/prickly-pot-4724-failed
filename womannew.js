const mealDetailsContent = document.querySelector('.meal-details-content');
let removeRecepe = () => {
    mealDetailsContent.innerHTML = null;
    mealDetailsContent.parentElement.classList.remove('showRecipe');
}
document.getElementById("recipe-close-btn").addEventListener("click", removeRecepe);



async function getData() {
    let url = "https://www2.hm.com/en_in/women/new-arrivals/clothes/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=36&page-size=36";
    try {
        let res = await fetch(url)
        let data = await res.json();
        return data.products;
    } catch (err) {
        return err;
    }
}


async function productNewData() {
    let url = "https://www2.hm.com/en_in/women/new-arrivals/clothes/_jcr_content/main/productlisting.display.json?sort=stock&image-size=small&image=model&offset=36&page-size=36";
    let data = await getData(url)
    let newData = [];
    for (let k = 0; k < data.length; k++) {
        let Price = data[k].price;
        let image1 = data[k].image[0].dataAltImage;
        let image2 = data[k].image[0].src;
        let title = data[k].title;
        let brandName = data[k].brandName;
        let colorname = data[k].swatches[0].colorName;
        let category = data[k].category;
        let articleCode = data[k].articleCode;

        var bag = [];
        for (var i = 0; i < Price.length; i++) {
            if (Price[i] == "R" || Price[i] == "s") {
                continue;
            }
            else {
                bag.push(Price[i]);
            }

        }

        var Price1 = ""
        for (var j = 1; j < bag.length - 3; j++) {
            if (bag[j] == ",") {
                continue;
            }
            else {
                Price1 = Price1 + bag[j]
            }
        }
        Price1 = Number(Price1);

        let obj = {
            price: Price1,
            image1: image2,
            image2: image1,
            title: title,
            brandName: brandName,
            color: colorname,
            category: category,
            articleCode: articleCode,
        }
        newData.push(obj)



    }

    // console.log(newData)
    return newData;

}
async function getProductData() {

    let xx = await productNewData()
    console.log(xx)
    append(xx)
}

getProductData()
async function sortingData() {
    let selected = document.getElementById("sort").value
    console.log(selected)

    let xx = await productNewData()
    if (selected == "Price-Low-to-High") {
        xx.sort(function (a, b) {
            return a.price - b.price;
        })
        append(xx)
    }
    if (selected == "Price-High-to-Low") {
        xx.sort(function (a, b) {
            return b.price - a.price;
        })
        append(xx)
    }


}
function append(data) {
    let container = document.getElementById("container")
    container.innerHTML = null;
    data.forEach((el) => {



        let div = document.createElement("div")
        div.setAttribute("id", "holdproduct")
        let cou = 0;
        div.addEventListener("click", function () {
            if (cou == 2) {

                sendData(el)
                console.log(el)
            }
            else if (cou == 3) {
                cou = 0;
            }
            cou++;
        })
        div.style.height = "500px"

        let imgdiv = document.createElement("div")
        imgdiv.setAttribute("id", "box")
        let productInfo = document.createElement("div")
        productInfo.setAttribute("id", "productInfo")
        let bac = document.createElement("img")
        bac.setAttribute("class", "hover_img")
        bac.src = el.image2;
        let frunt = document.createElement("img")
        frunt.src = el.image1;
        let heart = document.createElement("div")
        heart.setAttribute("id","heart")
        let count = 0;
        heart.addEventListener("click", function () {
            if (count % 2 == 0) {

                heart.style.backgroundColor = "black"
                count = 1;
            }
            else {
                heart.style.backgroundColor = "rgb(121, 112, 112)"
                count = 0;
            }

        })
        let button = document.createElement("button")
        button.setAttribute("class", "btn")
        button.innerHTML = "QUICK SHOP";
        button.addEventListener("click", () => {
            appednCart(el)
        })
        let p = document.createElement("p");
        p.innerText = `Product: ${el.title}`;
        let p1 = document.createElement("p");
        p1.innerText = `Brand: ${el.brandName}`;
        let p2 = document.createElement("p");
        p2.innerText = "Rs." + " " + el.price + ".00";
        // console.log(p,p1,p2)

        imgdiv.append(frunt, bac, heart, button)
        productInfo.append(p, p1, p2)
        div.append(imgdiv, productInfo)
        container.append(div)
    });
}

function sendData(el) {
    console.log(el)
    localStorage.setItem("productData", JSON.stringify(el))

    window.location.href = "addtocart.html"
}
// Show & Hide filter:-
var count = 0
function showFilter() {
    if (count % 2 == 0) {
        flag = false;
        var filterbut = document.getElementById("filter")
        filterbut.innerText = "Hide Filter";
        filterbut.style.width = "50%"

        let container = document.getElementById("container")
        container.style.width = "70%"
        container.style.marginLeft = "2%"


        let category = document.createElement("ul");
        category.innerText = "Category"
        category.setAttribute("id", "category")
        category.addEventListener("click", filterCategory);

        let size = document.createElement("ul");
        size.innerText = "Size"
        size.setAttribute("id", "size")
        size.addEventListener("click", filterSize);

        let color = document.createElement("ul");
        color.innerText = "Color"
        color.setAttribute("id", "color")
        color.addEventListener("click", filterColor);

        let discount = document.createElement("ul");
        discount.innerText = "Discount"
        discount.setAttribute("id", "discount")
        discount.addEventListener("click", filterDiscount);

        let trending = document.createElement("ul");
        trending.innerText = "Trending"
        trending.setAttribute("id", "trending");
        trending.addEventListener("click", filterTrending);


        var sidefilter = document.getElementById("sidefilter");
        sidefilter.style.width = "25%"


        sidefilter.append(category, size, color, discount, trending);
        // let heart=document.getElementById("heart")
        // heart.style.marginTop = "-130%"
         let btn=document.querySelector(".btn")
         btn.style.marginTop = "-22%"
         btn.style.marginLeft = "20%"
        count++
    }
    else {
        flag = true;
        var filterbut = document.getElementById("filter")
        filterbut.innerText = "show Filter";
        filterbut.style.width = "25%"

        let sidefilter = document.getElementById("sidefilter");
        sidefilter.innerHTML = null
        sidefilter.style.width = "0%"

        let container = document.getElementById("container");
        container.style.width = "98%"
        container.style.marginLeft = "0%"

        count++
    }


}


// Show & Hide filter END
// ====================================================================================================
var catcount = 0
function filterCategory() {

    if (catcount % 2 == 0) {

        let limen = document.createElement("li") || [];
        limen.setAttribute("id", "limen")

        let li = document.createElement("li");
        li.innerText = "Dresses & Jumpsuits";
        let li1 = document.createElement("li");
        li1.innerText = "Tops";
        let li2 = document.createElement("li");
        li2.innerText = "Sweaters";
        let li3 = document.createElement("li");
        li3.innerText = "Leggings & Sweatpants";
        let li4 = document.createElement("li");
        li4.innerText = "Skirts";
        let li5 = document.createElement("li");
        li5.innerText = "Sweatshirts & Sweatpants";
        let li6 = document.createElement("li");
        li6.innerText = "Pajamas";
        let li7 = document.createElement("li");
        li7.innerText = "Matching Sets";
        var category = document.getElementById("category");
        category.style.height = "auto"
        limen.append(li, li1, li2, li3, li4, li5, li6, li7)
        category.append(limen);

        catcount = 1
    }
    else {
        let limen = document.getElementById("limen").innerHTML = null;
        catcount = 0

    }

}

// ===============================================================================================================


var sizecount = 0
function filterSize() {

    if (sizecount % 2 == 0) {

        let limen = document.createElement("li") || [];
        limen.setAttribute("id", "limen")
        let limen1 = document.createElement("ul") || [];
        limen1.setAttribute("id", "limen1")
        let limen2 = document.createElement("ul") || [];
        limen2.setAttribute("id", "limen2")


        let li = document.createElement("li");
        li.innerText = "classic";
        let li1 = document.createElement("li");
        li1.innerText = "xx-small  ";
        let li2 = document.createElement("li");
        li2.innerText = "x-small";
        let li3 = document.createElement("li");
        li3.innerText = `small`;
        let li4 = document.createElement("li");
        li4.innerText = "medium";
        let li5 = document.createElement("li");
        li5.innerText = "large";
        let li6 = document.createElement("li");
        li6.innerText = "x-large";
        let li7 = document.createElement("li");
        li7.innerText = "small-medium";

        var size = document.getElementById("size");
        size.style.height = "auto"
        limen1.append(li, li1, li2, li3)
        limen2.append(li4, li5, li6, li7)
        limen.append(limen1, limen2)
        size.append(limen);

        sizecount = 1
    }
    else {
        let limen = document.getElementById("limen").innerHTML = null;
        sizecount = 0

    }

}

// ================================================================================================

var colorcount = 0
function filterColor() {

    if (colorcount % 2 == 0) {

        let limen = document.createElement("li") || [];
        limen.setAttribute("id", "limen")

        let li = document.createElement("li");
        li.innerText = "green";
        li.style.backgroundColor = "green"
        let li1 = document.createElement("li");
        li1.innerText = "White";
        li1.style.backgroundColor = "white"
        let li2 = document.createElement("li");
        li2.innerText = "Orange";
        li2.style.backgroundColor = "orange"
        let li3 = document.createElement("li");
        li3.innerText = "pink";
        li3.style.backgroundColor = "pink"
        let li4 = document.createElement("li");
        li4.innerText = "Black";
        li4.style.backgroundColor = "black"
        li1.style.color = "white"
        let li5 = document.createElement("li");
        li5.innerText = "yellow";
        li5.style.backgroundColor = "yellow"
        let li6 = document.createElement("li");
        li6.innerText = "Navy";
        li6.style.backgroundColor = "navy"
        let li7 = document.createElement("li");
        li7.innerText = "reg";
        li7.style.backgroundColor = "red"


        var color = document.getElementById("color");
        color.style.height = "auto"
        limen.append(li, li1, li2, li3, li4, li5, li6, li7)
        color.append(limen);

        colorcount = 1
    }
    else {
        let limen = document.getElementById("limen").innerHTML = null;
        colorcount = 0

    }

}

// ===========================================================================================================

var discountcount = 0
function filterDiscount() {

    if (sizecount % 2 == 0) {

        let limen = document.createElement("li") || [];
        limen.setAttribute("id", "limen")
        let limen1 = document.createElement("ul") || [];
        limen1.setAttribute("id", "limen1")
        let limen2 = document.createElement("ul") || [];
        limen2.setAttribute("id", "limen2")


        let li = document.createElement("li");
        li.innerText = "40% - 60% Off";
        let li1 = document.createElement("li");
        li1.innerText = "Less Than 40% Off ";


        var discount = document.getElementById("discount");
        discount.style.height = "auto"
        limen1.append(li)
        limen2.append(li1)
        limen.append(limen1, limen2)
        discount.append(limen);

        discountcount = 1
    }
    else {
        let limen = document.getElementById("limen").innerHTML = null;
        discountcount = 0

    }

}
// ==========================================================================================================

var trendingcount = 0
function filterTrending() {

    if (trendingcount % 2 == 0) {

        let limen = document.createElement("li") || [];
        limen.setAttribute("id", "limen")

        let li = document.createElement("li");
        li.innerText = "Best Seller (28)";
        let li1 = document.createElement("li");
        li1.innerText = "Top Rated (6)";
        let li2 = document.createElement("li");
        li2.innerText = "New - Last 2 Weeks (3)";
        let li3 = document.createElement("li");
        li3.innerText = "New - Last 4 Weeks (9)";
        let li4 = document.createElement("li");
        li4.innerText = "Mongrammable (39)";

        var trending = document.getElementById("trending");
        trending.style.height = "auto"
        limen.append(li, li1, li2, li3, li4)
        trending.append(limen);

        trendingcount = 1
    }
    else {
        let limen = document.getElementById("limen").innerHTML = null;
        trendingcount = 0

    }

}



let appednCart = (el) => {
    console.log(el)
    mealDetailsContent.innerHTML = `<div id="main">
     <div id="image">
         <img class="xzoom" src="${el.image1}" alt="">
     </div>
     <div id="text">
         <span>${el.brandName}</span>
          <h4>Broken-in short-sleeve T-sirt</h4>
          <p id="itemgod">item AGooB</p>
         <p id="view">View full detail</p>

         <h3 id="price">${el.price}</h3>
         <p id="color">Select Color ${el.price}-${el.price}</p>
         <h5 id="color_section" >color:  Deep Harbor</h5>
         <div id="colors_category">
                <div style="background-color:red"></div>
                <div style="background-color:rgb(46, 42, 42)"></div>
                <div style="background-color:rgb(43, 12, 12)"></div>
                <div style="background-color:rgb(38, 0, 255)"></div>
                <div style="background-color:rgb(251, 255, 0)"></div>
                <div style="background-color:rgb(0, 255, 255)"></div>
         </div>
         <label>Fit:<span id="fit_classic"> Classic</span></label>
         <div>
           <button class="btn_class" id="button" value="Classic">Classic</button>
           <button class="btn_class"id="button1" value="Slim">Slim</button>
           <button class="btn_class" id="button2" value="Tail">Tail</button>
         </div>
         <div id="size_dive">
             <p>Size: Select a Size</p>
              <p>Size Charts</p>
         </div>
         <p>All sizes are US sizes</p>
         <div id="size_dive">
             <button>X-Small</button>
             <button>Small</button>
             <button>Medium</button>
             <button>Large</button>
             <button>X-Large</button>
             <button>XX-Large</button>
         </div>
         <div id="quantity">
             <label>Quantity:</label>
             <select id="quantity_selection" >
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
                 <option value="6">6</option>
                 <option value="7">7</option>
                 <option value="8">8</option>
                 <option value="9">9</option>
             </select>
         </div>
         <p> Price include duties and taxes</p>
         <div class="size_fit">
             <h3>Size & Fit</h3>
             <p>+</p>
         </div>
         <div class="size_fit">
             <h3>Product Details</h3>
             <p>+</p>
         </div>

     </div>`
    let button = document.createElement("button")
    button.setAttribute("class", "additem")
    button.innerHTML = "ADD TO CART"
    button.addEventListener("click", function () {
        addtoBag(el)
    })
    let div6 = document.createElement('div')
    div6.setAttribute("id", "heart_div")
    let i = document.createElement("i")
    i.setAttribute("class", "fa fa-heart-o")
    i.setAttribute("id", "heartsection")

    div6.append(i)

    mealDetailsContent.append(button, div6)

    mealDetailsContent.parentElement.classList.add('showRecipe');
}

function addtoBag(el) {
    // let document.getElementById("addBag")
    let values = document.getElementById("quantity_selection").value
    let arr = JSON.parse(localStorage.getItem("productItem")) || [];

    obj = {
        price: el.Price1,
        image1: el.image2,
        image2: el.image1,
        title: el.title,
        brandName: el.brandName,
        color: el.colorname,
        category: el.category,
        articleCode: el.articleCode,
        Product_Qty: values,
    }
    arr.push(obj)
    localStorage.setItem("productItem", JSON.stringify(arr))
}