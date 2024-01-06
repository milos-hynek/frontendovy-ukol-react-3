import "./ShoppingListEdit.css";
import {useState} from "react"

let toggleFormEditSL="hide-edit-shopping-list";	

const ShoppingListEdit=(props)=>{
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);		
			
	if(parseInt(props.currentUser)===parseInt(props.owner)){ // only shopping list owner can use this component			
					
		let saveList=(event)=>{       			
			if(props.shoppingList.name.length<1){
				alert("Musíte vyplnit název.");	
			}else if(props.shoppingList.name.length>128){
				alert("Název je příliš dlouhý.");
			}else if(props.shoppingList.description.length>512){
				alert("Popis je příliš dlouhý.");
			}else if(props.shoppingList.is_archived>1||props.shoppingList.is_archived<0){
				alert("Neplatná data archivace.");
			}else{		
				props.callbackSaveShoppingList({name:props.shoppingList.name,description:props.shoppingList.description,is_archived:props.shoppingList.is_archived});										
				alert('Nákupní seznam úspěšně upraven.');
				toggleFormEditSL="hide-edit-shopping-list";		
			}			
			event.preventDefault();
			}				
			
		let toggleEditSLForm=(event)=>{ 
			if(toggleFormEditSL==="hide-edit-shopping-list"){
				toggleFormEditSL="show-edit-shopping-list";				
			}else{
				toggleFormEditSL="hide-edit-shopping-list";				
			}
			refresh();	
			event.preventDefault();
			}		
		
		let changeName=(event)=>{props.shoppingList.name=event.target.value;refresh();}
		let changeDescription=(event)=>{props.shoppingList.description=event.target.value;refresh();}				
		let changeArchiv=(event)=>{props.shoppingList.is_archived=event.target.value;refresh();}		
								
		return(
			<>
				<div className="align-right">
					<button className="sl-toggle" onClick={toggleEditSLForm}>&#128394; Upravit nákupní seznam</button>					
				</div>

				<div className={toggleFormEditSL}>
					<form className="shopingListEditForm" onSubmit={saveList} >
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 "><h3>Upravení nákupního seznamu</h3></div>							
							<div className="col-xs-12 col-sm-12 col-md-2 align-center"><b>Název:</b></div>
							<div className="col-xs-12 col-sm-12 col-md-10 "><input type="text" name="name" value={props.shoppingList.name} maxLength="128" className="w-100" onChange={changeName} required /></div>														
							<div className="col-xs-12 col-sm-12 col-md-2 align-center"><b>Popis:</b></div>							
							<div className="col-xs-12 col-sm-12 col-md-10 "><input type="text" name="description" value={props.shoppingList.description} maxLength="512" className="w-100" onChange={changeDescription} /></div>
							<div className="col-xs-12 col-sm-12 col-md-2 align-center"><b>Archiv:</b></div>							
							<div className="col-xs-12 col-sm-12 col-md-10 ">
								<select name="is_archived" value={props.shoppingList.is_archived} className="w-100" onChange={changeArchiv} >
									<option value="0">Ne, nákupní seznam není archivován</option>
									<option value="1">Ano, nákupní seznam je archivován</option>
								</select>
							</div>
							
							<div className="col-xs-12 col-sm-12 col-md-12 align-center"><button type="submit">Uložit</button></div>
						</div>
					</form>
				</div>
			</>
			);
		}	
	return(<></>); 	
	};
export default ShoppingListEdit;
	
