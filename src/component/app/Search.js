import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import MainContext from '../../context/MainContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';

const Search = (props) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    const { storeProductsData } = useContext(MainContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedstoreProductsData, setSearchedstoreProductsData] = useState([]);
 
    useEffect(() => {
        if (storeProductsData.length != 0) {
            const filteredClubs = storeProductsData.filter(Club => {
                let ClubLowercase = (
                    Club.product_name
                ).toLowerCase();
                let searchTermLowercase = searchTerm.toLowerCase();
                return ClubLowercase.indexOf(searchTermLowercase) > -1;
            });
            setSearchedstoreProductsData(filteredClubs);
        }
    }, [searchTerm]);

    useEffect(() => {
        setSearchedstoreProductsData(storeProductsData)
    }, [storeProductsData]);

    return (
        <>
            <section className="pt-5 osahan-main">
                <div className="container">
                    <div class="input-group mt-3 rounded shadow-sm overflow-hidden bg-white">
                        <div class="input-group-prepend">
                            <button class="border-0 btn btn-outline-secondary text-success bg-white"><i class="icofont-search"></i></button>
                        </div>
                        {/* <input type="text" class="shadow-none border-0 form-control pl-0" placeholder="Search for storeProductsData.." aria-label="" aria-describedby="basic-addon1" /> */}
                        <input type="text" onChange={e => setSearchTerm(e.target.value)} class="shadow-none border-0 form-control pl-0" id="inlineFormInputGroupUsername2" placeholder="Search for storeProductsData.." />
                    </div>
                    <div className="mt-3 bg-white" style={{ position: "fixed", width: "94%", height: "74%", overflowY: "auto", padding: "0px 10px 10px" }}>
                        <div className="row">
                            {searchedstoreProductsData.length ?
                                searchedstoreProductsData.slice(0, 8).map((product, i) => {
                                    return (
                                        <>
                                            <div className="col-12 p-2">
                                                <Link to={"/" + (product.product_uniq_slug_name) + "/" + product.id}>
                                                    <div className="row">
                                                        <div className="col-2 d-flex justify-content-center">
                                                            <img style={{ height: 40 }} src={product?.product_image} alt="" />
                                                        </div>
                                                        <div className="col-10 d-flex align-items-center">
                                                            <h5 className='mb-0' style={{ fontSize: 16, color: "#000" }}>{product.product_name} </h5>
                                                            <span className='ml-auto' style={{ color: "#000", marginRight: 10 }}>₹{Math.round((product?.sale_price))}/{product?.product_size + product?.product_unit}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div style={{ width: "95%", margin: "auto", borderBottom: "1px solid #d0d0d0" }}></div>
                                        </>
                                    )
                                }) : <>
                                    <div className="col-12">
                                        <div className="text-center mt-5">
                                            <FcSearch size={36} />
                                            <h6 className='mt-2'>Result not found</h6>
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Search;