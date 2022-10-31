import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContextData from '../../context/MainContext';
import { Filter } from '../comman/Fillter';
import OshanContainer from '../comman/OshanContainer';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



const ProductsBySubcategory = (props) => {

    const { storeProductsData,storeCategoryData, storeCategoryRelode,delivery_city,website_name} = useContext(ContextData);

    const { subcatID, subcatName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [storeProductsDataBySub, setstoreProductsDataBySub] = useState([]);
    const [SubCategoryListData, setSubCategoryListData] = useState([]);
    const [shorting, setShorting] = useState({});
    const [cateName, setcateName] = useState();

    const options = {
        autoplay: true,
        autoplayHoverPause: true,
        loop: false,
        margin: 4,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 4
            },
            250: {
                items: 4
            },
            500: {
                items: 4
            },
            750: {
                items: 7
            },
            1000: {
                items: 9
            },
            1250: {
                items: 11
            }
        }
    };


    useEffect(() => {
        // window.scrollTo(0, 0)
        setcateName(subcatName)
        setSubCategoryListData(storeCategoryData.filter(p => Number(p.master_category_level) == Number(subcatID)));
        setstoreProductsDataBySub(storeProductsData.filter(p => p.parent_category_id == subcatID));
        setIsLoading(false);
    }, [storeProductsData, subcatID]);

    const setShortingByClick = (shorting) => {
        const myProd = storeProductsData.filter(p => p.parent_category_id == subcatID);
        const { priceLTH, priceHTL, discount } = shorting;
        priceLTH ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
            : priceHTL ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)))
                : discount ? setstoreProductsDataBySub(myProd.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)))
                    : setstoreProductsDataBySub(storeProductsData.filter(p => p.parent_category_id == subcatID))
    }

    const filterCategory = (value,name) => {

            const newData = storeProductsData.filter(obj => obj.category_id == value)
            setstoreProductsDataBySub(newData);
            setcateName(name)
    }

    return (
        <>
            <Seo
                title={subcatName + " Home Delivery in "+(delivery_city)+" | "+(website_name)}
                descreption={subcatName + " Home Delivery in "+(delivery_city)+" | "+(website_name)+" is an online grocery delivery website and app in "+(delivery_city)}
                image={null}
            />

            <OshanContainer>
                


<div class="mt-2 mb-2">
<div class="d-flex align-items-center mb-3">
                    <h5 class="m-0">{subcatName} Category</h5>
 </div>
<div class="promo-sliders pb-0 mb-0">
                        {SubCategoryListData.length ? (
                            <OwlCarousel className='owl-theme' {...options}>
                                {SubCategoryListData.map((item, i) => {
                                    return (
                                        <div  className="item">
                                            <div onClick={()=>filterCategory(item.master_category_id,item.category_name)}
                                            class="osahan-slider-item mx-2">
                                                <a   href="#"><img src={item.category_image}
                                                    class="img-fluid mx-auto rounded" alt="Responsive image" /></a>
                     <p className="m-0 pt-1 text-center" style={{ color: "#505050", fontSize: 14 }}>{item.category_name}</p>

                                            </div>
                                        </div>
                                    )
                                })}
                            </OwlCarousel>
                        ) : null}
                    </div>
</div>

<div class="d-flex align-items-center mb-3 my-3">
                <h5>Buy {cateName} Online</h5>
                    <div class="m-0 text-center ml-auto">
                        <a href="#" data-toggle="modal" data-target="#exampleModal"
                            class="btn text-muted bg-white mr-2"><i class="icofont-filter mr-1"></i> Filter</a>
                    </div>
                </div>

                <div class="row">

                    {
                        storeProductsDataBySub.map((data, i) => {
                            return (
                                <BasicVegitableFruit data={data} />
                            )
                        })
                    }
                </div>
                <Filter setShortingMain={setShortingByClick} />
            </OshanContainer>
        </>
    )


}

export default ProductsBySubcategory;