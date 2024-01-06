import "./ShoppingListAddItem.css";
import {useState} from "react"

let toggleFormAddItem="col-xs-12 col-sm-12 col-md-12 hide-add-item";	

const ShoppingListAddItem=(props)=>{
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);		
			
	if(parseInt(props.currentUser)===parseInt(props.owner)){ // only shopping list owner can use this component			
					
		let addItem=(event)=>{       
			let new_name=event.target.name.value;
			let new_value=event.target.value.value;
			if(new_name.length<1){
				alert("Musíte vyplnit název.");	
			}else if(new_name.length>48){
				alert("Název je příliš dlouhý.");
			}else if(new_value.length>16){
				alert("Množství je příliš dlouhé.");
			}else{
				event.target.name.value="";
				event.target.value.value="";
				props.callbackAddItem({name:new_name,value:new_value});
				toggleFormAddItem="col-xs-12 col-sm-12 col-md-12 hide-add-item";	
			}			
			event.preventDefault();								
			}				
			
		let toggleNewItemForm=(event)=>{ 
			if(toggleFormAddItem==="col-xs-12 col-sm-12 col-md-12 hide-add-item"){
				toggleFormAddItem="col-xs-12 col-sm-12 col-md-12 show-add-item";				
			}else{
				toggleFormAddItem="col-xs-12 col-sm-12 col-md-12 hide-add-item";				
			}
			refresh();	
			event.preventDefault();
			}			
					
		return(
			<>
				<div className="shoppingListItem col-xs-12 col-sm-6 col-md-4 ">
					<div className="shoppingListItemAddInner">
						<button onClick={toggleNewItemForm}><span>&#10133;</span> Přidat položku</button>					
					</div>
				</div>
				<div className={toggleFormAddItem}>
					<form className="shopingListAddItemForm" onSubmit={addItem} >
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 "><h3>Přidání nové položky</h3></div>
							<div className="col-xs-12 col-sm-4 col-md-2 align-center"><b>Název:</b></div>
							<div className="col-xs-12 col-sm-8 col-md-3 "><input type="text" name="name" className="w-100" maxLength="48" required /></div>
							<div className="col-xs-12 col-sm-4 col-md-2 align-center"><b>Množství:</b></div>
							<div className="col-xs-12 col-sm-8 col-md-3 "><input type="text" name="value" className="w-100" maxLength="16" /></div>
							<div className="col-xs-12 col-sm-12 col-md-2 align-center "><button type="submit">Dokončit přidání</button></div>
						</div>
					</form>
				</div>
			</>
			);
		}	
	return(<></>); 	
	};
export default ShoppingListAddItem;
	
