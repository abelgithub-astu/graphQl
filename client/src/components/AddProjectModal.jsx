
import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation,useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutation'


export default function AddProjectModal() {
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [clientId, setclientId] = useState('')
  const [status,setstatus] = useState('new')

  const[addProject] = useMutation(ADD_PROJECT,{
    variables:{name,description,status,clientId},
    update(cache, {data: addProject } ){
      const {projects} = cache.readQuery({ query: GET_PROJECTS})

      cache.writeQuery({
        query: GET_PROJECTS, data: {projects: [...projects,addProject]}
      })
    }
  })


const {loading,error,data} = useQuery(GET_CLIENTS)

  

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || description === '' || status === '') {
      alert('Please fill all the fields')
    }
   
    addProject(name,description,status,clientId)

    setname('')
    setdescription('')
    setstatus('new')
    setclientId('')
  }

if(loading) return null;
if(error) return <p>Something Went Wrong</p>

  return (
    <>
    {!loading && !error && ( <>
    
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
        <div className='d-flex align-items-center' >
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>


      <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit} >
                <div className='mb-3' >
                  <label className="form-label">Name</label>
                  <input type="text" id='name' value={name} onChange={(e) => setname(e.target.value)} className="form-control" />
                </div>
                <div className='mb-3' >
                  <label className="form-label">Description</label>
                  <textarea  id='description' value={description} onChange={(e) => setdescription(e.target.value)} className="form-control" />
                </div>
                <div className='mb-3' >
                  <label className="form-label">Status</label>
                  <select id='status' value={status} className='form-select' onChange={(e) => setstatus(e.target.value) } >
                    <option value='new'>Not Started</option>
                    <option value='progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label  className="form-label">Client</label>
                  <select id="clientId" value={clientId} onChange={(e)=> setclientId(e.target.value)} className="form-select">
                    <option value='' >Select Client</option>
                    {data.clients.map(client => (
                      <option value={client.id} key={client.id} >{client.name}</option>
                    ) )}
                  </select>
                </div>


                <button type='submit' data-bs-dismiss='modal' className="btn btn-primary"> Submit </button>

              </form>
            </div>

          </div>
        </div>
      </div>

    </> ) }
      

    
    </>
  )
}
