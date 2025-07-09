let getAllShoes = async () => {
    let responseData = await axios({
        url: 'https://shop.cyberlearn.vn/api/Product',
        method: 'GET',
        responsesType: 'json',
    });
    console.log(responseData.data.content);
    //
    let html = renderProducts(responseData.data.content);
    document.querySelector('#productsList').innerHTML = html;

}
let renderProducts = (arrProd) => {
    let gridProd = '';
    for (let prod of arrProd) {
        gridProd += `
            <div class="prod-card">
                <div class="prod-card-body">
                    <div class="prod-img"><img src="${prod.image}" alt=""></div>
                    <h3 class="prod-name">${prod.name}</h3>
                    <p class="prod-desc">${prod.shortDescription}</p>
                </div>
                <div class="prod-card-footer">
                    <button class="prod-buynow-btn" onclick="">Buy now</button>
                    <div class="prod-price">
                        <span>${prod.price}$</span>
                    </div>
                </div>
            </div>
        `
    } return gridProd;
}



getAllShoes();