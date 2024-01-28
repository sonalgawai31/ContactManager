import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import EditContact from './Components/Contacts/EditContact/EditContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import NavBar from './Components/NavComp/NavBar';


function App() {
  return (
    <div className="App">
      {/* <Spinner/> */}
      <NavBar/>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Navigate to={'contacts/list'}/>} />
          <Route path='/contacts/list' element={<ContactList/>}/>
          <Route path='/contacts/edit/:contactId' element={<EditContact/>}/>
          <Route path='/contacts/view/:contactId' element={<ViewContact/>}/>
          <Route path='/contacts/add' element={<AddContact/>}/>

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
