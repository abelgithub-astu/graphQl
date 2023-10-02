import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutation"

export default function EditProjectForm({project}) {
    const [name, setname] = useState(project.name)
    const [description, setdescription] = useState(project.description)
    const [status, setstatus] = useState(project.status)


    const [UpdateProject] = useMutation(UPDATE_PROJECT,
        {variables: {id:project.id,name,description,status}, 
        refetchQueries: [{ query: GET_PROJECT, variables: {id: project.id} }]
    } )

    const onSubmit = (e) => {
        e.preventDefault()

        if(!name || !description || !status){
          return  alert('Please Add All the Fields')
        }

        UpdateProject(name,description,status)


    }

  return (
    <div className="mt-5" >
        <h1>Update Project Details</h1>
        <form  onSubmit={onSubmit} >
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
                <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
