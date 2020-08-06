import React, {Component} from 'react';
import Card from './Card';
import CategoryCard from './CategoryCard';
import AllUsers from './AllUsers';
import AllProductsTable from './AllProductsTable';
import LastProductNew from './LastProductNew';
//import { data } from 'jquery';





class  DivCont extends Component {

    constructor(props){
        super(props);
        this.state = {
            cards :[]
        }
    }

    
    componentDidMount(){
        fetch('/api/widgets/')
        .then(res => res.json())
        .then(res=>{
            this.setState({
                cards:res.data
                
            })
            console.log(res.data)
        })
        console.log('Montado');
    }
    

    
    render(){
        console.log('Rendered');

       

        return(

<div className="container-fluid">

{/*<!-- Page Heading -->*/}
<div className="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
</div>
    

    {/*<!-- Content Row -->*/}
    <div className="row">

    { 
        this.state.cards.map((card,i)=>{
        return(
        // <div className="col-md-3 mb-6 " >
                <Card key={i}{...card}/>
        // </div>
        );
    })
    }

    
  
    </div>
    {/*<!-- Content Row -->*/}
    <div className="row">
    
    {/*<!-- All users in DB -->*/}
    <AllUsers/>

    {/*<!-- Last Product in DB -->*/}
    <LastProductNew/>

    {/*<!-- All products table in DB -->*/}
    <AllProductsTable/>

    {/*<!-- Categories in DB -->*/}
    <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
            </div>
            <div className="card-body">
                {/*<!-- Categorie Cards -->*/}
                <div className="row">
                <CategoryCard categorie='01'/>
                <CategoryCard categorie='02'/>
                <CategoryCard categorie='03'/>
                <CategoryCard categorie='04'/>
                <CategoryCard categorie='05'/>
                <CategoryCard categorie='06'/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


             
        
    );
  }
}

export default DivCont;