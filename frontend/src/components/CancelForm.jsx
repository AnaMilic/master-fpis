import React from 'react'
import { useNavigate  } from "react-router-dom";

function CancelForm() {
    const navigate = useNavigate();
  return (
    <div>
        
        <div className='card'>
        <div className='card-body'>
          <form action="" method='' id='' onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}>
            <p style={{marginLeft:50+'px',marginRight:50+'px', fontSize:27+'px'}}> Enter informations to cancel your reservation. </p>
              
            <div className='field'>
                <label htmlFor="email"> Email: </label> <br />
                <input type="email" id="email" name="email" placeholder="Enter your email" required/>
              </div>
              
              <div className='field'>
                <label htmlFor="token"> Token: </label> <br />
                <input type="text" id="token" name="token" placeholder="Enter your token" required/>
              </div>


              <button type='submit' className='btn' onClick={(e) => {
                //e.preventDefault();
                e.stopPropagation();
                console.log({ e });
              }}> CANCEL RESERVATION </button>
              
            

          </form>
        </div>
      </div>
        
        <br /><button onClick={() => {
          navigate("/")
        }}> nazad </button>
        
    </div>
  )
}

export default CancelForm