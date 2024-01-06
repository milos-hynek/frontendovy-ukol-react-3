import "./ShoppingListDetail.css";
import ShoppingListEdit from "./ShoppingListEdit.js";
import ShoppingListItem from "./ShoppingListItem.js";
import ShoppingListAddItem from "./ShoppingListAddItem.js";
import ShoppingListMember from "./ShoppingListMember.js";
import ShoppingListAddMember from "./ShoppingListAddMember.js";
import {useState} from "react"

let filterItems=2; // all of them defaul	

const ShoppingListDetail=(props)=>{
	//helping array for users:
	let usersById=[];
	props.users.forEach((user)=>( 	
		usersById[user.uid]=user
		));
			
	//component rendering updates:
	const [update,setUpdate]=useState(0);
	const refresh=()=>setUpdate(update+1);
	
	//Shopping list helper
	const [shoppingList,setShoppingList]=useState(props.shoppingList);
	
	//helping array for members:
	let membersById=[];
	shoppingList.shopping_list_members.forEach((member)=>( 	
		membersById[member.id_user]=member.id_user
		));
	
	//Save shopping list
	let callbackSaveShoppingList=(data)=>{
		shoppingList.name=data.name;
		shoppingList.description=data.description;
		shoppingList.is_archived=data.is_archived;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);			
		refresh();		
		}
		
	//change some item status from shopping list
	let callbackChangeStatusItem=(id)=>{	
		let completeSolved=1;
		shoppingList.shopping_list_items.forEach((item,index)=>{ 				
			if(item.sliid===id){
					if(item.is_solved===1){
						shoppingList.shopping_list_items[index].is_solved=0;
					}else{
						shoppingList.shopping_list_items[index].is_solved=1;
					}					
				}	
			if(shoppingList.shopping_list_items[index].is_solved===0){
				completeSolved=0;
				}			
			});
		shoppingList.is_solved=completeSolved;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
			
	//Delete some item from shopping list
	let callbackDeleteItem=(id)=>{					
		let completeSolved=1;
		shoppingList.shopping_list_items.forEach((item,index)=>{ 				
				if(item.sliid===id){
					shoppingList.shopping_list_items.splice(index,1);				
					alert("Položka úspěšně odstraněna z nákupního seznamu.");	
				}else{
					if(shoppingList.shopping_list_items[index].is_solved===0){
						completeSolved=0;
						}	
				}
			});
		shoppingList.is_solved=completeSolved;
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
	
	//Add some item into shopping list
	let callbackAddItem=(data)=>{	
		let item_id=(Math.floor(Math.random()*10000000)*10);
		let newItem={sliid:item_id,id_shopping_list:shoppingList.slid,name:data.name,value:data.value,is_solved:0};
		shoppingList.shopping_list_items.push(newItem);		
		shoppingList.is_solved=0;
		alert("Položka úspěšně přidána do nákupního seznamu.");	
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);		
		refresh();		
		}	
	
	//Delete some member from shopping list
	let callbackDeleteMember=(slmid)=>{					
		shoppingList.shopping_list_members.forEach((member,index)=>{ 	
			if(member.slmid===slmid){
				shoppingList.shopping_list_members.splice(index,1);				
				alert("Člen úspěšně odstraněn z nákupního seznamu.");	
				}								
			});				
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);	
		refresh();		
		}
		
	//Add new member into shopping list
	let callbackAddMember=(user_id)=>{		
		let member_id=(Math.floor(Math.random()*10000000)*10);
		let newMember={slmid:member_id,id_shopping_list:shoppingList.slid,id_user:user_id};
		shoppingList.shopping_list_members.push(newMember);
		alert("Člen úspěšně přidán do nákupního seznamu.");	
		const updatedShoppingList=shoppingList;
		setShoppingList(updatedShoppingList);			
		refresh();		
		}		
		
	let doGoBack=(event)=>{
		let data={Route:'list',RouteId:0};		
		props.callbackChangeRoute(data);  
		}	
	
	if(parseInt(props.currentUser)===parseInt(shoppingList.id_owner)||parseInt(props.currentUser)===membersById[parseInt(props.currentUser)]){}else{ // only owner and member can see shopping list		
		return (
			<div className="shoppingListDetail">
				<div className="align-right pad-top-8"><button onClick={doGoBack} title="Zpět na výpis nákupních seznamů" >Zpět na výpis nákupních seznamů</button></div>
				<h2>Nemáte oprávnění vidět nákupní seznam "{shoppingList.name}" - nejste ani&nbsp;členem a&nbsp;ani&nbsp;vlastníkem nákupního seznamu.</h2>
			</div>
			);
		}
	
	let archived="";
	if(shoppingList.is_archived===1){
		archived="(archivováno)";
		}
	
	let solved="";
	if(shoppingList.is_solved===1){
		solved="- dokončeno";
		}
		
	let doFilterUnsolved=(event)=>{filterItems=0;refresh();}
	let doFilterSolved=(event)=>{filterItems=1;refresh();}
	let doFilterAll=(event)=>{filterItems=2;refresh();}
		
	let filterUnsolved=<button onClick={doFilterUnsolved} title="Vypsat pouze nevyřešené položky">Nevyřešené</button>;
	let filterSolved=<button onClick={doFilterSolved} title="Vypsat pouze vyřešené položky">Vyřešené</button>;
	let filterAll=<button onClick={doFilterAll} title="Vypsat všechny položky">Vše</button>;
	
	if(filterItems===0){filterUnsolved=<button onClick={doFilterUnsolved} title="Vypsat pouze nevyřešené položky" className="activeFilter">Nevyřešené</button>;}
	if(filterItems===1){filterSolved=<button onClick={doFilterSolved} title="Vypsat pouze vyřešené položky" className="activeFilter">Vyřešené</button>;}
	if(filterItems===2){filterAll=<button onClick={doFilterAll} title="Vypsat všechny položky" className="activeFilter">Vše</button>;}
	
	return(
		<div className="shoppingListDetail">
			<div className="align-right pad-top-8"><button onClick={doGoBack} title="Zpět na výpis nákupních seznamů" >Zpět na výpis nákupních seznamů</button></div>
			<h2>{shoppingList.name} {solved} {archived}</h2>			
			<p>{shoppingList.description}</p>
			<ShoppingListEdit shoppingList={shoppingList} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackSaveShoppingList={callbackSaveShoppingList} />	
			<div className="row pad-top-8 middle-md middle-sm middle-xs">
				<div className="col-xs-12 col-sm-6 col-md-6"><h3 className="gap-left-0">Položky</h3></div>
				<div className="col-xs-12 col-sm-6 col-md-6 align-right"> {filterUnsolved} {filterSolved} {filterAll} </div>
			</div>
			<div className="row">
				{shoppingList.shopping_list_items.map((item:{...})=>(
					<ShoppingListItem key={item.sliid} item={item} currentUser={props.currentUser} owner={shoppingList.id_owner} filter={filterItems} callbackDelItem={callbackDeleteItem} callbackChangeStatusItem={callbackChangeStatusItem} />
					))}
				<ShoppingListAddItem currentUser={props.currentUser} owner={shoppingList.id_owner} callbackAddItem={callbackAddItem} />							
			</div>
			<h3>Členové</h3>
			<div className="row">
				<div className="shoppingListOwner col-xs-12 col-sm-6 col-md-3">
					<div className="shoppingListOwnerInner">
						<b>{usersById[shoppingList.id_owner].degree} {usersById[shoppingList.id_owner].name}	{usersById[shoppingList.id_owner].surname}</b>
					</div>
				</div>
				{shoppingList.shopping_list_members.map((member:{...})=>(
					<ShoppingListMember key={member.slmid} member={member} users={usersById} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackDelMember={callbackDeleteMember} />
					))}
				<ShoppingListAddMember members={membersById} users={usersById} currentUser={props.currentUser} owner={shoppingList.id_owner} callbackAddMember={callbackAddMember} />	
			</div>			
		</div>
		);	
	};
export default ShoppingListDetail;
	
