import { makeDOMwithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";

export const getProductCard = (productInfo, removeCartCallback) => {
  const {imgSrc, name, discountPercent, price, originalPrice} = productInfo;

  const productCard = makeDOMwithProperties('div', {className: 'product-card',});

/* ---product-image-con --- */
const productImageCon = makeDOMwithProperties('div', {className: 'product-image-con',});

const productImage = makeDOMwithProperties('img', {
  src: imgSrc,
  alt: name,
});

const cartToggleBtn = getCartToggleButton(productInfo, removeCartCallback);

// 자식요소를 하나하나 넣기 귀찮으니까 한반에 넣을 함수 만들어서 
appendChildrenList(productImageCon, [productImage,cartToggleBtn]);
// Node.appendChild.
// Node.insertBefore
/* ----- product-image-con ------ */

/* ----- product-description ---- */
const productDescription = makeDOMwithProperties('div', {className: 'product-description'});
const productName = makeDOMwithProperties('div', {className: 'product-name', innerHTML: name});
const productPriceCon = makeDOMwithProperties('div', {className: "product-price-con"});
const productDiscountPercent = makeDOMwithProperties('div', {className: 'product-discount-percent', innerHTML: `${discountPercent}%`});
const productPrice = makeDOMwithProperties('div', {className: 'product-price', innerHTML: `${price.toLocaleString()}원`});
const productOriginalPrice = makeDOMwithProperties('div', {className : 'product-original-price', innerHTML : `${originalPrice.toLocaleString()}원`})

appendChildrenList(productDescription, [productName, productPriceCon, productOriginalPrice]);
appendChildrenList(productPriceCon, [productDiscountPercent, productPrice]);
/* ------product-description ------- */

appendChildrenList(productCard, [productImageCon, productDescription]);

return productCard;
}