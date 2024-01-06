import "./AddShoppingList.css";
import {useState} from "react"

let toggleFormAdd="col-xs-12 col-sm-12 col-md-12 hide-add";	
let name="";
let description="";
	
const AddShoppingList=(props)=>{
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);									
				
	let addShoppingList=(event)=>{       
		if(name.length<1){
			alert("Musíte vyplnit název.");	
		}else if(name.length>128){
			alert("Název je příliš dlouhý.");
		}else if(description.length>512){
			alert("Popis je příliš dlouhý.");
		}else{	
			props.callbackAddShoppingList({name:name,description:description});													
			toggleFormAdd="col-xs-12 col-sm-12 col-md-12 hide-add";		
			name="";
			description="";	
		}
		event.preventDefault();				
		}				
		
	let toggleNewForm=(event)=>{ 
		if(toggleFormAdd==="col-xs-12 col-sm-12 col-md-12 hide-add"){
			toggleFormAdd="col-xs-12 col-sm-12 col-md-12 show-add";				
		}else{
			toggleFormAdd="col-xs-12 col-sm-12 col-md-12 hide-add";				
		}
		refresh();	
		event.preventDefault();
		}			
			
	let changeName=(event)=>{name=event.target.value;refresh();}
	let changeDescription=(event)=>{description=event.target.value;refresh();}				
					
	return(
		<>			
			<div className="align-right"><button onClick={toggleNewForm}><span>&#10133;</span> Přidat nákupní seznam</button></div>								
			<div className={toggleFormAdd}>
				<form className="shopingListAddForm" onSubmit={addShoppingList} >
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 "><h3>Přidání nového nákupního seznamu</h3></div>						
						<div className="col-xs-12 col-sm-12 col-md-2 align-center"><b>Název:</b></div>
						<div className="col-xs-12 col-sm-12 col-md-10 "><input type="text" name="name" value={name} maxLength="128" className="w-100" onChange={changeName} required /></div>														
						<div className="col-xs-12 col-sm-12 col-md-2 align-center"><b>Popis:</b></div>							
						<div className="col-xs-12 col-sm-12 col-md-10 "><input type="text" name="description" value={description} maxLength="512" className="w-100" onChange={changeDescription} /></div>					
						<div className="col-xs-12 col-sm-12 col-md-12 align-center"><button type="submit">Dokončit přidání a přejít do editace nákupního seznamu</button></div>
					</div>
				</form>
			</div>
		</>
		);			
	};
export default AddShoppingList;
	
