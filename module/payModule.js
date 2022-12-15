import { getCartInfo } from "./cartToggleButton.js";

const DELIVERY_FREE_PRICE = 20000;
const DELIVERY_PAY_PRICE = 3000;

{/* <ul>
  <li>
    <span class="cart-pay-info-title">상품 금액</span>
    <span id="original-price" class="cart-pay-info-value">38,000</span>
  </li>
  <li>
    <span class="cart-pay-info-title">할인 금액</span>
    <span id="discount-price" class="cart-pay-info-value">0</span>
  </li>
  <li>
    <span class="cart-pay-info-title">배송비</span>
    <span id="delivery-price" class="cart-pay-info-value">+3,000</span>
    <span id="delivery-description">20,000원 이상 주문 시 무료배송</span>
  </li>
  <li>
    <span class="cart-pay-info-title">결제예정금액</span>
    <span id="total-price" class="cart-pay-info-value">41,000</span>
  </li>
</ul>
<button type="button">결제하기</button> */}

const originalPriceDOM = document.getElementById('original-price');
const discountPriceDOM = document.getElementById('discount-price');
const deliveryPriceDOM = document.getElementById('delivery-price');
const totalPriceDOM = document.getElementById('total-price');

// {
//   "id" : 2, 
//   "imgSrc" : "/public/assets/당근.jpg",
//   "name" : "친환경 당근 400g",
//   "discountPercent" : 33,
//   "price" : 2000,
//   "originalPrice" : 3000
// },

export const setPayInfo = () => {
// 1. 장바구니에서 물품 정보얻어오기
// 2. 물품 정보들을 순회하면서 총 가격, 할인된 가격, 배송비, 결제 금액을 계산하기
// 3. 2번에서 계산된 금액들을 DOM.innerHTML로 할당하기
  const cartInfoList = getCartInfo();
  
  let deliveryPrice = 0; // 20,000원 미만 구매하면 3000원, 이상구해하면 0원
  let totalPrice = 0;

  const { originalPrice, discountPrice } = cartInfoList.reduce((prev, curr) => ({
    originalPrice: prev.originalPrice + curr.originalPrice,
    discountPrice: prev.discountPrice + (curr.originalPrice - curr.price),
  }), {
    originalPrice : 0,
    discountPrice : 0,
  })

  // cartInfoList.forEach((cartInfo) => {
  //   originalPrice += cartInfo.originalPrice; 
  //   discountPrice += (cartInfo.originalPrice - cartInfo.price)
  // })
  const payPrice = originalPrice - discountPrice;
  if(payPrice >= DELIVERY_FREE_PRICE || payPrice === 0) {
    deliveryPrice = 0;
  } else {
    deliveryPrice = DELIVERY_PAY_PRICE;
  }
  totalPrice = payPrice + deliveryPrice;

  originalPriceDOM.innerHTML = `${originalPrice.toLocaleString()}원`;
  discountPriceDOM.innerHTML = discountPrice ? `-${discountPrice.toLocaleString()}원` : '0원';
  // 할인된 가격 = 원래가격(original price) - 판매가격(price)
  deliveryPriceDOM.innerHTML = deliveryPrice ? `+${deliveryPrice.toLocaleString()}원` : '0원';
  totalPriceDOM.innerHTML = `${totalPrice.toLocaleString()}원`;

}