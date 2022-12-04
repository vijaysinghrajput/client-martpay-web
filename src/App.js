import React, { Component, useEffect } from 'react';
import ContextProvider from './context/contextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import './App.css';

import LoginPage from './page/LoginPage';

import ChooseAreaPage from './page/ChooseAreaPage';
import AccountPage from './page/AccountPage';
import ConditionPage from './page/ConditionPage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Verification from './component/Authentication/Verification';
import ProductsBySubcategoryPage from './page/ProductsBySubcategoryPage';
import CartPage from './page/CartPage';
import ProductDetailsPage from './page/ProductDetailsPage';
import CategoryPage from './page/CategoryPage';
import AccountPageApp from './page/AccountPageApp';

import URL from './URL'
import { constants } from './URL'

import SearchPage from './page/SearchPage';
import { OrderSuccessFull } from './component/Cart/OrderSuccessfull';
import Select, { components } from "react-select";

import Cookies from 'universal-cookie';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';
const cookies = new Cookies();


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showAreaModel: false,
      storeCategorysData: [],
      storeProductsData: [],
      store_delivery_city: [],
      store_delivery_area: [],
      seo_area: [],
      keywords: [],
      store_id: null,
      store_delivery_city_name: 'Gorakhpur',
      store_delivery_area_name: null,
      delivery_area: '',
      delivery_city: '',
      website_name: "martpay.in"
    }
  }

  async CityHandleChange(SelectCityData) {

    console.log('SelectCityData', SelectCityData.city)
    await this.setState({ store_delivery_city_name: SelectCityData.city, store_delivery_area_name: null }, () => {
      this.FetchDeliveryArea(this.state.store_delivery_city_name)
    });

    console.log('SelectCity', this.state.store_delivery_city_name)
    // this.componentDidMount()

  };

  async AreaHandleChange(SelectedAreaData) {
    console.log('SelectedAreaData', SelectedAreaData.area)

    await this.setState({ store_delivery_area_name: SelectedAreaData.area, store_id: SelectedAreaData.store_id, storeCategorysData: [], storeProductsData: [] }, () => {
      this.fetchReloder()
    });


  };


  async componentDidMount() {

    // cookies.remove("isAreaDecided");

    const store_id = cookies.get("adminStoreId");
    const delivery_area = cookies.get("deliveryArea");
    const delivery_city = cookies.get("deliveryCity");
    console.log("store_id", store_id)
    this.setState({ store_id, delivery_area, delivery_city })

    this.FetchDeliveryCity();
    this.fetchReloder()
  }

  FetchDeliveryCity() {
    fetch(URL + "/APP-API/App/getDeliveryCityOfStore", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }, body: JSON.stringify({ store_id: constants.store_id })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ store_delivery_city: responseJson.store_delivery_city, store_delivery_city_name: responseJson.store_delivery_city[0].city })
        this.FetchDeliveryArea(responseJson.store_delivery_city[0].city)
      })

      .catch((error) => {
        //  console.error(error);
      });
  }

  FetchDeliveryArea(city_name) {
    fetch(URL + "/APP-API/App/getDeliveryAreaOfStore", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }, body: JSON.stringify({ city_name: city_name })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ store_delivery_area: responseJson.store_delivery_area })
      })
      .catch((error) => {
        //  console.error(error);
      });
  }



  fetchReloder() {
    fetch(URL + "/APP-API/App/getNavigationSeo", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }, body: JSON.stringify({ store_id: this.state.store_id })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          storeCategorysData: responseJson.storeCategorysData,
          storeProductsData: responseJson.storeProductsData,
          //  seo_area: responseJson.seo_area,
          //  keywords: responseJson.keywords, 
        })
        // fetchAllData(responseJson);
      })
      .catch((error) => {
        //  console.error(error);
      });
  }


  SaveAddress() {

    cookies.set('isAreaDecided', true, { maxAge: 9999999999 });
    cookies.set('deliveryArea', this.state.store_delivery_area_name, { maxAge: 9999999999 });
    cookies.set('deliveryCity', this.state.store_delivery_city_name, { maxAge: 9999999999 });
    cookies.set('adminStoreId', this.state.store_id, { maxAge: 9999999999 });


    this.componentDidMount()

  }
  render() {


    if (cookies.get('isAreaDecided') == undefined || cookies.get('isAreaDecided') == false) {
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            margin: "auto",
            background: "#fff",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6rem"
          }}
        >
          <SimpleGrid columns={{ base: 2 }}>

            <Box>
              <Box>
                <Image src='/img/logo.svg' margin={"auto"} display="block" />
              </Box>
              <form class="mb-4 w-75" style={{ margin: "auto", paddingTop: "2rem" }}>
                <div class="form-row">
                  <div class="col-md-12 form-group">
                    <label class="form-label"> <label class="text-danger">*</label> Select Delivery City</label>
                    <Select

                      defaultValue={{ label: this.state.store_delivery_city_name }}
                      value={{ label: this.state.store_delivery_city_name }}


                      onChange={(e) => this.CityHandleChange(e)}
                      options={this.state.store_delivery_city}
                    />
                  </div>

                  <div class="col-md-12 form-group">
                    <label class="form-label"> <label class="text-danger">*</label> Select Delivery Area</label>
                    <Select
                      value={{ label: this.state.store_delivery_area_name }}
                      onChange={(e) => this.AreaHandleChange(e)}
                      options={this.state.store_delivery_area}
                    />
                  </div>

                  <div className='col-md-12'>
                    <button onClick={() => this.SaveAddress()} type="button" className="btn btn-custom text-center">Shop Now</button>
                  </div>


                </div>
              </form>
            </Box>
            <Box>
              <Image src="https://media.istockphoto.com/id/1225013303/vector/vector-illustration-of-a-delivery-man-with-face-mask-delivering-an-order-on-a-motorcycle.jpg?s=612x612&w=0&k=20&c=Qe8cniQbXMQ7HKw1Z1wSN4owUjzAGczqRJvPbHehqME=" />
            </Box>

          </SimpleGrid>

        </div >

      )
    }

    if (this.state.storeCategorysData.length) {




      return (

        <>

          {/* <Link state={location.pathname} to={"/" +(delivery_city).replace(/\s/g, "-").toLowerCase()+"/" +(item.category_name).replace(/\s/g, "-").toLowerCase()  + item.master_category_id  + item.category_name}> */}

          <ContextProvider>
            {/* <ChakraProvider> */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path='*' exact={true} element={<NotFoundPage />} /> */}
                <Route path="/category" element={<CategoryPage />} />
                {this.state.storeCategorysData.map((item, i) => {
                  return (
                    <Route path={"/" + (item.category_name).replace(/\s/g, "-").toLowerCase() + "/:subcatID/:subcatName"} element={<ProductsBySubcategoryPage />} />
                  )
                })}
                {this.state.storeProductsData.map((item, i) => {
                  return (
                    <Route path={"/" + (item.product_uniq_slug_name) + "/:prodID"} element={<ProductDetailsPage />} />
                  )
                })}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/choose-area" element={<ChooseAreaPage />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/cart" element={<CartPage />} />

                <Route path="/search" element={<SearchPage />} />

                {/* USER ACCOUNT START */}
                <Route path="/orderSuccess" element={<OrderSuccessFull />} />
                <Route path="/accountApp" element={<AccountPageApp />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/notification" element={<AccountPage />} />
                <Route path="/offers" element={<AccountPage />} />
                <Route path="/orders" element={<AccountPage />} />
                <Route path="/address" element={<AccountPage />} />
                <Route path="/condition" element={<AccountPage />} />
                <Route path="/contact" element={<AccountPage />} />
                <Route path="/about" element={<ConditionPage />} />
                <Route path="/term-and-condition" element={<ConditionPage />} />
                <Route path="/privacy-and-policy" element={<ConditionPage />} />
                <Route path="/shipping-policy" element={<ConditionPage />} />
                <Route path="/return-and-refund-policy" element={<ConditionPage />} />
                <Route path="/faq" element={<ConditionPage />} />


                {/* USER ACCOUNT END */}

              </Routes>
            </BrowserRouter>
            {/* </ChakraProvider> */}
          </ContextProvider>



        </>

      );
    } else {
      return (
        <div >
          <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            Please Wait... <AiOutlineLoading3Quarters size={28} className="rorateMe ml-3" />
          </div>
        </div>
      )
    }
  }
}

export default App;