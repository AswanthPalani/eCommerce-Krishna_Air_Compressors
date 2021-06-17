import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
        <Switch>
          <Route exact path="/">
          <div>
        <br/>
        <div className="l-main">
            <section className="home" id="home">
                <div className="home__container bd-container bd-grid">
                    <div className="home__data">
                        <h1 className="home__title">Welcome!!</h1>
                        <h2 className="home__subtitle">Try the best air compressors<br/>in the market.</h2>
                    </div>
    
                    <img src="assets/img/home.png" alt="" className="home__img"/>
                </div>
            </section>
        
            <section className="about section bd-container" id="about">
                <div className="about__container  bd-grid">
                    <div className="about__data">
                        <span className="section-subtitle about__initial">About us</span>
                        <h2 className="section-title about__initial">Quality is always the <br/> First Preference</h2>
                        <p className="about__description">Krishna air compressors made a modest beginning with the manufacturing of compressor and its spare parts ,motors and pumps in the year 2003
                            The compressors from this manufacturing house are easy to install and use, the spare parts are easily replaceable and they are equally durable and reliable. The compressors are installed with an effective control system that ensure highest power saving for the industries.</p>
                    </div>

                    <img src="assets/img/about.png" alt="" className="about__img"/>
                </div>
            </section>

            <section className="services section bd-container" id="services">
                <span className="section-subtitle">Offering</span>
                <h2 className="section-title">Our Amazing Services</h2>

                <div className="services__container  bd-grid">
                    

                    <div className="services__content">
                        <h3 className="services__title">Krishna Motor Services</h3>
                        <p className="services__description">We offer our clients excellent quality services for many years, with the best quality products in the city.</p>
                    </div>

                    <div className="services__content">
                        <svg className="services__img" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M19.1978 49.6016C17.4308 49.6016 15.9981 51.0342 15.9981 52.8012C15.9981 54.5682 17.4308 
                            56.0008 19.1978 56.0008C20.9648 56.0008 22.3974 54.5682 22.3974 52.8012C22.3974 51.0342 20.9648 
                            49.6016 19.1978 49.6016ZM19.1978 53.8677C18.6088 53.8677 18.1312 53.3902 18.1312 52.8012C18.1312 
                            52.2122 18.6088 51.7347 19.1978 51.7347C19.7868 51.7347 20.2643 52.2122 20.2643 52.8012C20.2643 
                            53.3902 19.7868 53.8677 19.1978 53.8677Z"/>
                            <path d="M50.1275 49.6016C48.3605 49.6016 46.9279 51.0342 46.9279 52.8012C46.9279 54.5682 48.3605 
                            56.0008 50.1275 56.0008C51.8945 56.0008 53.3271 54.5682 53.3271 52.8012C53.3271 51.0342 51.8945 
                            49.6016 50.1275 49.6016ZM50.1275 53.8677C49.5385 53.8677 49.0609 53.3902 49.0609 52.8012C49.0609 
                            52.2122 49.5385 51.7347 50.1275 51.7347C50.7165 51.7347 51.194 52.2122 51.194 52.8012C51.194 
                            53.3902 50.7165 53.8677 50.1275 53.8677Z"/>
                            <path d="M3.19962 21.8715H5.3327V24.0045H3.19962V21.8715Z"/>
                            <path d="M0 26.1377H2.13308V28.2708H0V26.1377Z"/>
                            <path d="M52.2606 11.2061H58.6598V13.3391H52.2606V11.2061Z"/>
                            <path d="M47.9944 11.2061H50.1275V13.3391H47.9944V11.2061Z"/>
                            <path d="M34.1294 4.80676H44.7948V6.93985H34.1294V4.80676Z"/>
                            <path d="M29.8632 4.80676H31.9963V6.93985H29.8632V4.80676Z"/>
                            <path d="M63.9925 59.2005V57.0674H54.8842C55.7935 56.0607 56.3575 54.7906 56.495 53.4412L63.4593 
                            49.461C63.5087 49.4266 63.5556 49.3886 63.5988 49.3469C63.6363 49.3214 63.6723 49.2928 63.7056 
                            49.2626C63.7858 49.1777 63.8514 49.0798 63.8998 48.9735C63.905 48.9636 63.9123 48.9574 63.917 
                            48.948C63.9655 48.8272 63.9915 48.6986 63.9936 48.5684C63.9936 48.5564 63.9998 48.547 63.9998 
                            48.535V38.9362C63.9951 38.9049 63.9889 38.8742 63.9806 38.8435C63.9821 38.8159 63.9821 38.7877 
                            63.9806 38.7601L61.8475 25.9616C61.8428 25.946 61.8371 25.9299 61.8308 25.9148C61.8308 25.9033 
                            61.8308 25.8903 61.8308 25.8788L60.7643 21.6127C60.645 21.1367 60.2169 20.8034 59.7264 20.8049H46.7893C46.6446 
                            20.2852 46.3696 19.8103 45.9905 19.4259L38.708 12.1435C38.1096 11.5414 37.2951 11.204 36.4457 
                            11.2061H10.6654C10.0764 11.2061 9.59888 11.6836 9.59888 12.2726V16.5388H0V18.6719H9.59888V21.8715H7.4658V24.0046H9.59888V26.1377H4.26617V28.2707H9.59888V37.8696C9.00989 
                            37.8696 8.53234 38.3472 8.53234 38.9362V48.535C8.53234 48.5574 8.54432 48.5767 8.54536 48.6001C8.55161 
                            48.6965 8.57088 48.7918 8.60264 48.8829C8.61254 48.9168 8.62451 48.9501 8.63805 48.9829C8.68805 49.0949 
                            8.75679 49.1969 8.84168 49.285L12.8178 53.2611C12.9198 54.6749 13.4911 56.0149 14.441 57.0674H0V59.2005H63.9925ZM44.1016 50.6681H25.2236C25.0929 
                            50.2984 24.9278 49.9411 24.731 49.6016H44.5943C44.3974 49.9411 44.2323 50.2984 44.1016 50.6681ZM25.597 
                            52.8012H43.7282C43.7288 54.3776 44.3141 55.8977 45.3708 57.0674H23.9545C25.0111 55.8977 25.5965 54.3776 
                            25.597 52.8012ZM45.8613 52.8012C45.8613 50.4452 47.7715 48.535 50.1275 48.535C52.4835 48.535 54.3937 
                            50.4452 54.3937 52.8012C54.3937 55.1572 52.4835 57.0674 50.1275 57.0674C47.7715 57.0674 45.8613 55.1572 45.8613 
                            52.8012ZM56.2898 51.0946C56.145 50.5723 55.9336 50.0703 55.6607 49.6016H58.9093L56.2898 51.0946ZM61.6662 
                            37.8696H51.194V27.2042H59.8894L61.6662 37.8696ZM59.4269 25.0711H50.1275C49.5385 25.0711 49.0609 25.5487 
                            49.0609 26.1377V38.9362C49.0609 39.5252 49.5385 40.0027 50.1275 40.0027H61.8595V42.1358H58.6598V44.2689H61.8595V47.4685H53.6578C51.519 
                            46.0463 48.736 46.0463 46.5972 47.4685H22.7281C20.5893 46.0463 17.8063 46.0463 15.6674 
                            47.4685H10.6654V43.2023H14.9316V41.0692H10.6654V40.0027H45.8613C46.4503 40.0027 46.9279 
                            39.5252 46.9279 38.9362V22.938H58.8937L59.4269 25.0711ZM11.732 28.2707H20.2643V26.1377H11.732V24.0046H21.3308V21.8715H11.732V18.6719H17.0647V16.5388H11.732V13.3391H36.4457C36.7285 
                            13.3402 36.9993 13.4527 37.1998 13.6516L44.4823 20.9341C44.6828 21.1341 44.7948 21.4059 44.7948 21.6892V37.8696H11.732V28.2707ZM13.6646 
                            49.6016C13.4766 49.9255 13.3177 50.2661 13.1901 50.6181L12.1736 49.6016H13.6646ZM14.9316 
                            52.8012C14.9316 50.4452 16.8418 48.535 19.1978 48.535C21.5537 48.535 23.4639 50.4452 23.4639 
                            52.8012C23.4639 55.1572 21.5537 57.0674 19.1978 57.0674C16.8418 57.0674 14.9316 55.1572 14.9316 52.8012Z"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect width="64" height="64" fill="white"/>
                                </clipPath>
                                </defs>
                        </svg>
                        <h3 className="services__title">Delivery</h3>
                        <p className="services__description">Fast Delivery Options Available</p>
                    </div>
                </div>
            </section>
            <section className="menu section bd-container" id="menu">
                <span className="section-subtitle">Special</span>
                <h2 className="section-title">Our Best Selling Products</h2>
            </section>
            <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
            <footer className="footer section bd-container" id="contact">
            <div className="footer__container bd-grid">
                <div className="footer__content">
                    <a href="#" className="footer__logo">Krishna Air Compressors</a>
                    <span className="footer__description">Showroom</span>
                    <div>
                        <a href="#" className="footer__social"><i className='bx bxl-facebook'></i></a>
                        <a href="#" className="footer__social"><i className='bx bxl-instagram'></i></a>
                        <a href="#" className="footer__social"><i className='bx bxl-twitter'></i></a>
                    </div>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Address</h3>
                    <ul>
                        <li>NO.347, A V MILLS,</li>
                        <li>VARUDEVAN STREET 1040,</li>
                        <li>KOVAI ROAD,KARUR</li>
                        <li>Karur,Tamil Nadu,639002</li>
                        <li>+91-9361044046</li>
                        <li>krishnaaircompressors@gmail.com</li>
                    </ul>
                </div>
            </div>
            </footer>
          </div>
          </div>
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
        </Switch>
      </div>
      
    </Router>
  );
};

export default App;
