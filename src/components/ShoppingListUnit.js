import "./ShoppingListUnit.css";
import {useState} from "react"

const ShoppingListUnit=(props)=>{
	
			
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);	
	const [item,setItem]=useState(props.item);
	const [shoppingLists,setShoppingLists]=useState(props.shoppingLists);
	
	if(parseInt(props.currentUser)===parseInt(item.id_owner)){
		// do nothing
	}else{
		let exist=0;
		for(let i=0;i<item.shopping_list_members.length;i++){
			if(parseInt(props.currentUser)===parseInt(item.shopping_list_members[i].id_user)){
				exist=1;
				}
			}
		if(exist==0){
			return(<></>);
			}
	}
	
	if(props.filterItems===0){ //not solved and not archived
		if(item.is_archived===1){return(<></>);} // archived skip
		if(item.is_solved===1){return(<></>);} // solved skip
		}
	if(props.filterItems===1){ //solved and not archived
		if(item.is_archived===1){return(<></>);} // archived skip
		if(item.is_solved===0){return(<></>);} // solved skip
		}
	if(props.filterItems===2){ //not archived
		if(item.is_archived===1){return(<></>);} // archived skip
		}	
	if(props.filterItems===3){ //archived
		if(item.is_archived===0){return(<></>);} // not archived skip
		}	
			
	//Delete shopping list
	let delShoppingList=(event)=>{       
	  if(window.confirm("Opravdu si přejete odebrat tento nákupní seznam?")){
		  props.callbackDeleteShoppingList(item.slid);     	
		  }
	  event.preventDefault();
	  }			
		
	let goIntoShoppingList=(event)=>{
		let data={Route:'detail',RouteId:item.slid};		
		props.callbackChangeRoute(data);  
		}	
	let isSolved="⌛︎"
	let isSolvedClass="shoppingListUnit";
	if(item.is_solved===1){
		isSolved="✓";
		isSolvedClass="shoppingListUnit solved";
		}
	let isArchived="";
	if(item.is_archived===1){
		isArchived=" (archiv)";
		}	
	let delButton=<button className="disabled" title="Nemáte dostatečná práva pro odstranění tohoto nákupního seznamu">✗</button>;	
	if(parseInt(props.currentUser)===parseInt(item.id_owner)){
		delButton=<button className="red" title="Odstranit nákupní seznam" onClick={delShoppingList} >✗</button>;	
		}
	
		

	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className={isSolvedClass} >
				<table className="w-100">
					<tbody>
						<tr>							
							<td>
								{isSolved} &nbsp;
								<a onClick={goIntoShoppingList} title="Zobrazit nákupní seznam" >{item.name}{isArchived}</a>
							</td>
							<td className="align-right">{delButton}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		);	
	};
export default ShoppingListUnit;
	
