
import "./App.css";
import { useEffect, useState } from 'react'

// import './App.css'
function App() {

  const FirebaseUrl="https://groceryapp-f4325-default-rtdb.firebaseio.com/"

    const[groceries,setGroceries]=useState([]);
    const[name,setName]=useState("");
    const[quantity,setQuantity]=useState("");
    const[editId,setEditId]=useState(null);
 
useEffect(() =>{
  fetchGroceries();
},[]
);

// fetch all items
const fetchGroceries = () =>{
  fetch(`${FirebaseUrl}.json`,)
  .then((response) => response.json())
  .then((data) => {
    const items =data 
    ? Object.entries(data).map(([id,item]) => ({id, ...item})):[];setGroceries(items);
  });
};



const addGrocery = () => {
  const newItem = {name,quantity:Number(quantity)};
  fetch(`${FirebaseUrl}.json`,{
    method:"POST",
    body:JSON.stringify(newItem),
    headers:
    {
      "Content-Type": "application/json"

    },
})
  .then(() =>{
    fetchGroceries();
    setName("");
    setQuantity("");
  });

};

// Update Grocery
const updateGrocery = () =>{
          const updatedItem = {name,quantity:Number(quantity)};
          fetch(`${FirebaseUrl}/${editId}.json`,{
            method:"PUT",
            body:JSON.stringify(updatedItem),
            headers:
            {
              "Content-Type":"applicaton/json"
            },
          })
          .then(() => {
            fetchGroceries();
            setName("");
            setQuantity("");
            setEditId(null);
          });
};


// Delete Item
const deleteGrocery =(id) =>{
    fetch(`${FirebaseUrl}/${id}.json`,{
      method:"DELETE",
    }).then(()=>fetchGroceries());
};


// Populate form for editing
const editGrocery = (item) =>{
  setName*(item.name);
  setQuantity(item.quantity);
  setEditId(item.id);
}
    

  return (
    <>
      <div className='grocery_form' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
        <h2>🛒Grocery App</h2>
        <input style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} type="text"
               placeholder='Item Name'
               value={name}
               onChange={(e) => setName(e.target.value)} 
        />

        <input style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} type="number"
               placeholder='Item Quantity'
               value={quantity}
               onChange={(e) => setQuantity(e.target.value)} 
        />

        <button  style={{ marginTop: '10px', padding: '8px 100px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer', backgroundImage: 'linear-gradient(135deg, #28a745, #218838)', }} onClick={editId ? updateGrocery : addGrocery} >
                         {editId ? "Update" : "Add"}
                
        </button>

        

       <ul>
      {groceries.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong> -{item.quantity}
          <button onClick={() => editGrocery(item)} style ={{marginLeft: "10px" ,fontWeight:"600"}}>Edit</button>
          <button onClick={() => deleteGrocery(item.id)} style={{marginLeft: "5px" , color:"white", fontWeight:"600"}}>Delete</button>
        </li>
      ))}
     </ul>
      
      
      </div>
     
    </>
  );
}

export default App;