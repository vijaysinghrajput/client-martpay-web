import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';

import Image from 'react-bootstrap/Image'

const Category = (props) => {

    const data = useContext(contextData);
    const { storeCategoryData, storeCategoryRelode, delivery_city, website_name } = useContext(contextData);
    const [showData, setShowData] = useState(storeCategoryData);


    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const [loca, setLcoa] = useState()





    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const p = position.coords;
            setLcoa({
                longitude: p.longitude,
                latitude: p.latitude
            })
        })
    }



    return (
        <>
            <div className="osahan-categories">
                {location.pathname !== "/category" &&
                    <div className="d-flex align-items-center mb-2">
                        <h5 className="m-0">What do you looking for??</h5>
                        <Link to="/category" className="ml-auto btn btn-outline-success btn-sm">See more</Link>
                    </div>
                }
                <div className="row">
                    {data.isLoading ? (
                        <>
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                            <CategoryLoading />
                        </>
                    ) : storeCategoryData ? (
                        < >
                            <div className="row">
                                {storeCategoryData.map((item, i) => {
                                    if (item.category_level == 0) {
                                        return (
                                            <div className="col-6 col-sm-6 col-md-1 mt-2" key={i}>
                                                <div className="list-card bg-none h-100">
                                                    <div className="p-1">


                                                        <Link state={location.pathname} to={"/" + (item.category_name).replace(/\s/g, "-").toLowerCase() + "/" + item.master_category_id + "/" + item.category_name}>
                                                            <img
                                                                class="img-fluid item-img w-100"
                                                                src={item.category_image}

                                                            />
                                                            <p className="m-0 pt-1 text-center" style={{ color: "#505050", fontSize: 14 }}>{item.category_name}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </>
                    ) : null}
                    {/* <div className="btn btn-primary" onClick={getLocation}>
                        Get Location
                    </div>
                    <div className="box">
                        <p>Latitude : {loca?.latitude}</p>
                        <p>Longitude : {loca?.longitude}</p>
                    </div> */}
                </div>
            </div>
        </>
    )

}

export default Category;


