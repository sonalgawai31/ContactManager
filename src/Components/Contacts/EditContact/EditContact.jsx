import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const EditContact = () => {

  let navigate = useNavigate()

  let{contactId}=useParams()
  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:"",
      group:''
    },
    groups:[],
    errorMessage:''
  })

  useEffect(()=>{
    let prom = new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response=ContactServices.getContact(contactId)
      res(response)
    })
    prom.then((resp1)=>{
      console.log(resp1);
      setState({...state,loading:false,contact:resp1.data})
      return new Promise((res1,rej1)=>{
        let groupResponse = ContactServices.getGroups()
        res1(groupResponse)
      }).then((resp2)=>{
        console.log(resp2);
        setState({...state,loading:false,contact:resp1.data,groups:resp2.data})
      })
    })
  },[contactId])

  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
  }

  let submitForm=(event)=>{
    event.preventDefault();
    let promise = new Promise((res,rej)=>{
      let response = ContactServices.updateContact(state.contact,contactId)
      res(response)
      rej("error")
      
    })
    promise.then((res)=>{
      if (res) {
        navigate('/contacts/list',{replace:true})
      }
    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error})
      navigate(`/contacts/edit/${contactId}`,{replace:true})
    })
  }

  let {loading,contact,groups,errorMessage}=state
  return (
    <div>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      {/* <pre>{JSON.stringify(groups)}</pre> */}
      {/* <h1>Edit Contact Page</h1> */}
      {
        loading ? <Spinner/> : <React.Fragment>
            <section className="edit-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 fw-bold text-primary'>Edit Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse molestiae iusto fugiat eos tenetur maxime in dolores pariatur incidunt iste ullam, assumenda ab quae explicabo laudantium. Nemo, corrupti officiis!</p>
            </div>
          </div>
          {/* ROW 2 */}
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" className='form-control' name='name' value={contact.name} required={true} onChange={updateInput} placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control'  name='photo' value={contact.photo} required={true} onChange={updateInput} placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input type="number" className='form-control' name='contact' value={contact.contact} required={true} onChange={updateInput} placeholder='Mobile Number' />
                </div>
                <div className="mb-2">
                  <input type="email" className='form-control'  name='email' value={contact.email} required={true} onChange={updateInput} placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control'  name='title' value={contact.title} required={true} onChange={updateInput} placeholder='Title' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control'  name='company' value={contact.company} required={true} onChange={updateInput} placeholder='Company' />
                </div>
                <div className="mb-2">
                  <select name="" className='form-control' id="">
                    <option value="">Select A Group</option>
                    {
                      groups.length>0 &&
                      groups.map((group)=>{
                        return(
                          <option key={group.id} value={group.id}>{group.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className='btn btn-primary' value={"Update"} />
                  <Link to={"/"} className='btn btn-dark ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <img src={contact.photo} alt="" className='contact-img' />
            </div>
          </div>
        </div>
      </section>
        </React.Fragment>
      }
      
    </div>
  )
}

export default EditContact
