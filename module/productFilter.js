import { makeDOMwithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";

const MAX_PRICE = Number.MAX_VALUE;  

const minPriceFilter = document.getElementById('price-min-filter');
const maxPriceFilter = document.getElementById('price-max-filter');
const discountFilter = document.getElementById('discount-filter');
const filterButton = document.getElementsByClassName('product-filter-con')[0].lastElementChild;

// 필터 누름 ->min, max, discount값을 받아옴 -> 값을 이용해서 해당 물푸 추출 -> 다시 화면에 나타냄

const convertPriceToNumber = (originalPrice) => {
  const formattedString = String(originalPrice).replace('원','').replace(',',''); // "원"과 "," 제거
  const formattedNumber = Number(formattedString); // 숫자값으로 명시적 형변환
  return isNaN(formattedNumber) ? 0 : formattedNumber; 
    // 숫자 아니면 0, 맞으면 formattedNumber을 리턴
}
const formatToPrice = (event) => {
  const value = event.target.value;
  // 사용자가 입력창을 벗어나면, 입력창의 value를 가져와서 value 변수에 할당
  const result = Number(value); 
  // 그 value를 숫자값으로 바꿔준 후
  if(isNaN(result)) {
    // 숫자 값인지 아닌지 판단해서, 아니라면
    alert('숫자를 입력해주세요.') // alert 창 띄움
    event.target.value = 0;
    return;
  }
  event.target.value = `${result.toLocaleString()}원`
}

const convertPercentToPrice = (originalValue) => {
  const formattedString = String(originalValue).replace("%", '');
  const formattedNumber = Number(formattedString); // 숫자값으로 명시적 형변환
  return isNaN(formattedNumber) ? 0 : formattedNumber;
}

export const setButtonEvent = (productList) => {
  filterButton.onclick = () => {
    const maxPrice = convertPriceToNumber(maxPriceFilter.value) || MAX_PRICE;
    const minPrice = convertPriceToNumber(minPriceFilter.value) || 0;
    const discountRate = convertPercentToPrice(discountFilter.value) || 0;
    // 버튼을 클릭하면, 옵션에 할당된 값들을 들고와서

    const newProductList = productList.filter((productInfo) => {
      const { price, discountPercent } = productInfo;
      return price >= minPrice && price <= maxPrice && discountRate <= discountPercent;
    });
    // productList 중 조건에 만족하는 요소들을 filter로 선별해서 newProductList에 할당

    const sectionDOM = document.getElementsByTagName('section')[0];
    const originalProductListDOM = document.getElementsByClassName('product-list-con')[0];
    // 원래 할당 되어있던 물품 리스트를 가져온다.
    sectionDOM.removeChild(originalProductListDOM);
    // 해당 노드의 자식을 인자로 받아서, 그 자식요소를 삭제해주는 removeChild
    // newProductList가 추가적으로 삽입되는 것이 아닌, 기존 요소들이 제거되고 나타나야 하기 때문에.

    if(newProductList.length > 0) {
      // 입력 조건에 해당 조건에 맞는 물품이 있다면
      const productListDOM = getProductList(newProductList)
      sectionDOM.appendChild(productListDOM);
      // productListDOM으로 만들어서 sectionDOM 뒤에 삽입해준다.
    } else {
      const emptyProductListDOM = makeDOMwithProperties('div' , {
        className: 'product-list-con empty',
        innerHTML: '조건에 해당하는 상품이 없습니다.'
      });
      sectionDOM.appendChild(emptyProductListDOM);
    }
  };
}

export const setFilterEvent = () => {
  minPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(event.target.value); // 입력창을 클릭하면 
  }
  maxPriceFilter.onfocus = (event) => {
    event.target.value = convertPriceToNumber(event.target.value); // 입력창을 클릭하면 
  }
  // 입력된 값 그대로 표시
  // 3,000원 상태인 값을 -> 3000으로 바꿔줘야함.
  minPriceFilter.onblur = formatToPrice; // 입력창에서 벗어나면
  maxPriceFilter.onblur = formatToPrice;
  // 입력된 값이 format 된 형태
  discountFilter.onfocus = (event) => {
    event.target.value = convertPercentToPrice(event.target.value)
  };
  discountFilter.onblur = (event) => {
    const value = event.target.value;
    // 사용자가 입력창을 벗어나면, 입력창의 value를 가져와서 value 변수에 할당
    const result = Number(value);
    // 그 value를 숫자값으로 바꿔준 후
    if (isNaN(result)) {
      // 숫자 값인지 아닌지 판단해서, 아니라면
      alert('숫자를 입력해주세요.') // alert 창 띄움
      event.target.value = 0; // 이벤트 벨류값은 0으로 변경하고
      return; // 결과값 저장되지 않게 바로 리턴
    }
    if(result > 100 || result < 0) {
      alert('0 이상, 100 이하의 숫자를 입력해 주세요.');
      event.target.value = 0; // 마찬가지로 벨류값 0 저장
      return; // 바로 리턴
    }
    event.target.value = `${result}%`
  }
}