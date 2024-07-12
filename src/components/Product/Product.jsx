
import styles from './product.module.css' 
import { products as productsData } from "./product.data.js"
import { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../Footer/Footer'
import { GrSearch } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function Product() {
	const [products, setProducts] = useState(productsData)
	const [isSearch, setIsSearch] = useState('');


	const [ name, setName ] = useState('');
	const [ image, setImage] = useState('');
	const [ price, setPrice] = useState('');
	const [ info, setInfo] = useState('');
	const createProduct = (e) => {
		e.preventDefault();

		const id = new Date();
		const p = { id, name, image, price, info };
		const updateProducts = [p, ...products]
		setProducts(updateProducts)
		setName('');
		setImage('');
		setPrice('');
		setInfo('');
		  console.log(p)
	  };
	
	const handleChange = (e) => {
		setIsSearch(e.target.value);
	}
	const [isStyledI, setIsStyledI] = useState(false);
	const handleClickI = () => {
	  setIsStyledI(!isStyledI);
	  if (isStyledA) {
		setIsStyledA(false);
	  }
	};
	const [isStyledA, setIsStyledA] = useState(false);
	const handleClickA = () => {
	  setIsStyledA(!isStyledA);
	  if (isStyledI) {
		setIsStyledI(false);
	  }
	};
  const [sortedProducts, setSortedProducts] = useState(products);
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    if (isStyledI) {
      setSortedProducts([...products].sort((a, b) => a.price - b.price));
    } else if (isStyledA) {
      setSortedProducts([...products].sort((a, b) => b.price - a.price));
    } else {
      setSortedProducts(products);
    }
  }, [isStyledI, isStyledA]);

  useEffect(()=>{
	if (isSearch){
		const filteredProducts = products.filter((prod) =>
        prod.name.toLowerCase().includes(isSearch.toLowerCase())
      );
	  	setSortedProducts(filteredProducts);
		  if (filteredProducts.length === 0) {
			setIsFound(true);
		  } else {
			setIsFound(false);
		  }
	} else{
		setSortedProducts(products);
	}
  },[isSearch])

  return (
    <>
	    <div className={styles.wrapper}>
			<header className={styles.header}>
				<div className={styles.head_contain}>
					<div className={styles.head_row}>
						<a href="#">
							<img className={styles.head_logo} src="src/assets/logo.png" alt="logo-store-online" />
						</a>
						<div className={styles.head_search}>
							<input type="text" onChange={handleChange} placeholder="Введите запрос" />
							<GrSearch />
						</div>
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.main_row_1}>
					<div className={styles.main_row}>
						<h1 className={styles.main_h}>Товары</h1>
						<div className={styles.main_sort_row}>
							<div className={isStyledI ? styles.head_sort + ' '+styles.head_sort_active : styles.head_sort}>
								<a href="#" onClick={handleClickI}>Сортировать по возрастанию</a>
							</div>
							<div className={isStyledA ? styles.head_sort + ' '+styles.head_sort_active : styles.head_sort}>
								<a href="#" onClick={handleClickA}>Сортировать по убыванию</a>
							</div>
						</div>
					</div>
					<form className={styles.form}>
						<input placeholder='Name' onChange={(e)=> setName(e.target.value)}  value ={name}/>
						<input placeholder='Image-URL' onChange={(e)=> setImage(e.target.value)} value ={image} />
						<input placeholder='Price' onChange={(e)=> setPrice(e.target.value)}  value ={price}/>
						<textarea onChange={(e)=> setInfo(e.target.value)}  value ={info} className={styles.input_four} placeholder='About product' />
						<button onClick={createProduct}>Confirm</button>
					</form>
				</div>
				<div className={styles.prod_row}>
					{isFound ? <h1 className={styles.not_found}>Not Found</h1> : null}
					{sortedProducts.map((prod) => (
						<div key={prod.id} className={styles.prod_item}>
						{prod.image ? <div
							className={styles.prod_img}
							style={{
							background: `url(${prod.image}) 0 0/230px 140px no-repeat`,
							}}/> :
							<div className={styles.prod_no_img}>No Image</div>}
							<div className={styles.prod_text}>
								<h2 className={styles.name_prod}>{prod.name}</h2>
								<h3 className={styles.price_prod}>
								{new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
								}).format(prod.price)}
								</h3>
								
								<Link to={`/products/${prod.id}`}><div className={styles.link_div_but}>View Details</div> </Link>
							</div>
						</div>
					))}
				</div>
			</main>
			<footer className={styles.footer}><Footer/></footer>
		</div>	
    </>
  );
}
export default Product;
