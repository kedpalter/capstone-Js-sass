import { getAllShoes } from "./index.js";
getAllShoes();
// let renderProducts = (arrProd) => {
//     let gridProd = '';
//     for (let prod of arrProd) {
//         gridProd += `
//             <div class="prod-card">
//             <div class="prod-img"><img src="${prod.image}" alt=""></div>
//                 <div class="prod-card-body">
//                     <h3 class="prod-name">${prod.name}</h3>
//                     <p class="prod-desc">${prod.shortDescription}</p>
//                 </div>
//                 <div class="prod-card-footer">
//                     <a href="./detail.html?id=${prod.id}" target="_blank" class="prod-buynow-btn" onclick="">Buy now</a>
//                     <div class="prod-price">
//                         <span>${prod.price}$</span>
//                     </div>
//                 </div>
//             </div>
//         `
//     } return gridProd;
// }
// get Query Param
const params = new URLSearchParams(window.location.search);
const shoeId = params.get('id');
console.log(shoeId);

let getShoesDetail = async (shoeId) => {
    let responseShoes = await axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${shoeId}`,
        method: 'GET',
        responseType: 'json',
    });
    renderShoes(responseShoes.data.content);
    // console.log(responseShoes.data.content.image);
}


getShoesDetail(shoeId);

let renderShoes = (arrShoes) => {
    let detailInfo = document.querySelectorAll('[data-field]');

    for (let info of detailInfo) {
        let data = info.getAttribute('data-field');
        switch (data) {
            case 'image': {
                info.src = arrShoes.image;
            }
                break;
            case 'avail-size': {
                const ul = document.querySelector('#avail-size');
                for (let size of arrShoes.size) {
                    const li = document.createElement('li');
                    li.innerHTML = size;
                    ul.appendChild(li);
                }

            };
                break;
            default: {
                info.innerHTML = arrShoes[data];
            }
                break;
        }

    }
}
// -----------------------

let choose = +document.querySelector('#choose').innerHTML;

let btn = document.querySelectorAll('.plus-minus');
btn.forEach((value) => {
    value.addEventListener('click', () => {
        if (value.id == 'plus') {
            choose++;
        } else {
            choose--;
        }
        document.querySelector('#choose').innerHTML = choose;
    })
})