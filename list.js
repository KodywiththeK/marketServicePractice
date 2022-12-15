// 물품 목록 모두 불러와서 페이지에 띄우기 -> productList.js 에서 getProductList 사용
// fetch 문을 활용해서 데이터 불러오기

import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";

const sectionInfoList = await fetchSectionListData();
// 가져온 제이슨 data를 살펴보면, 여러개의 객체들로 이루어진 데이터인 것을 알 수 있다.
// 객체 내부에 sectionTitle과 productList가 있다.
// 우리는 각 배열을 순회하며, productList의 항목만을 가져와야 함
// console.log(sectionInfoList)
const productList = sectionInfoList.reduce((prev, curr) => {
  return [...prev, ...curr.productList];
  //newArray 는 prev + carr.productList
}, [])
  // 빈 배열을 초기값으로 받아서, prev에 초기값 들어가고, curr 에는 productList를 가져와서 
  // 스프레드 해준 값을 넣고 하나씩 누적시킨다.

const section = document.getElementsByTagName('section')[0];
const productListDOM = getProductList(productList);
// 방금 만든 productList의 상품 전체 정보를 getProductList매소드를 통해 리스트화 해서
// productListDOM에 할당해줌
section.appendChild(productListDOM);
// section태그에 마지막 요소로 삽입;\

setButtonEvent(productList);
setFilterEvent();