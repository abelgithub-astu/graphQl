
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_CLIENT } from '../mutations/clientMutations'

export default function AddClientModal() {
  const [name, setname] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, phone, email },
    //refetchQueries: [{ GET_CLIENTS }],
    update(cache, { data: addClient }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS })

      cache.writeQuery(
        {
          query: GET_CLIENTS, data: { clients: [{...clients, addClient}] }
        })
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || email === '' || phone === '') {
      alert('Please fill all the fields')
    }
   
    addClient(name, email, phone)

    setemail('')
    setphone('')
    setname('')

  }

  return (
    <>

      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClient">
        <div className='d-flex align-items-center' >
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>


      <div className="modal fade" id="addClient" aria-labelledby="addClientLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientLabel">Add Client</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit} >
                <div className='mb-3' >
                  <label className="form-label">Name</label>
                  <input type="text" id='name' value={name} onChange={(e) => setname(e.target.value)} className="form-control" />
                </div>
                <div className='mb-3' >
                  <label className="form-label">Email</label>
                  <input type="text" id='email' value={email} onChange={(e) => setemail(e.target.value)} className="form-control" />
                </div>
                <div className='mb-3' >
                  <label className="form-label">Phone</label>
                  <input type="text" id='phone' value={phone} onChange={(e) => setphone(e.target.value)} className="form-control" />
                </div>
                <button type='submit' data-bs-dismiss='modal' className="btn btn-secondary"> Submit </button>

              </form>
            </div>

          </div>
        </div>
      </div>


    </>
  )
}
