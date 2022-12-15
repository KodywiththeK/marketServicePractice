import { fetchSectionListData } from "./module/fetch.js";
import { getProductSection } from "./module/projectSection.js";

// const productSection = getProductSection("인기상품", [
//   {
//     "id" : 1, 
//     "imgSrc" : "/public/assets/파프리카.jpg",
//     "name" : "파프리카 2입",
//     "discountPercent" : 20,
//     "price" : 2000,
//     "originalPrice" : 2500
//   },
//   {
//     "id" : 2, 
//     "imgSrc" : "/public/assets/당근.jpg",
//     "name" : "친환경 당근 400g",
//     "discountPercent" : 33,
//     "price" : 2000,
//     "originalPrice" : 3000
//   },
//   {
//     "id" : 3, 
//     "imgSrc" : "/public/assets/단호박.jpg",
//     "name" : "단호박 1등",
//     "discountPercent" : 12,
//     "price" : 3000,
//     "originalPrice" : 3520
//   }
// ]);

// document.body.appendChild(productSection);

try {
  const sectionInfoList = await fetchSectionListData();

  sectionInfoList.forEach((sectionInfo) => {
    // console.log(sectionInfo)
    const { sectionTitle, productList  } = sectionInfo;
    const productSectionDOM = getProductSection(sectionTitle, productList);
    document.body.appendChild(productSectionDOM)
  })

} catch (error) {
  console.log(error);
}





