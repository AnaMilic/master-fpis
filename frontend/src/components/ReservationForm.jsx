import React from 'react'
import { useNavigate  } from "react-router-dom";

function ReservationForm() {
  const navigate = useNavigate();

  return (
    <div>
     
      <div className='card'>
        <div className='card-body'>
          <form action="" method='' id='' onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}>
            <p style={{marginLeft:50+'px',marginRight:50+'px', fontSize:25+'px'}}> Enter your informations to make a reservation. Field with * is required!</p>
              <div className='field'>
                <label htmlFor="name"> Name*: </label> <br />
                <input type="text" id="name" name="name" placeholder="Enter your name" required/>
              </div>

              <div className='field'>
                <label htmlFor="surname"> Surname*: </label> <br />
                <input type="text" id="surname" name="surname" placeholder="Enter your surname" required/>
              </div>

              <div className='field'>
                <label htmlFor="company"> Company: </label> <br />
                <input type="text" id="company" name="company" placeholder="Enter your company"/>
              </div>

              <div className='field'>
                <label htmlFor="address1"> Address 1*: </label> <br />
                <input type="text" id="address1" name="address1" placeholder="Enter your first address" required/>
              </div>

              <div className='field'>
                <label htmlFor="address2"> Address 2: </label> <br />
                <input type="text" id="address2" name="address2" placeholder="Enter your second address if you have it" />
              </div>

              <div className='field'>
                <label htmlFor="postNumber"> Post number*: </label> <br />
                <input type="text" id="postNumber" name="postNumber" placeholder="Enter post number" required/>
              </div>

              <div className='field'>
                <label htmlFor="city"> City*: </label> <br />
                <input type="text" id="city" name="city" placeholder="Enter city" required/>
              </div>

              <div className='field'>
                <label htmlFor="country"> Country: </label> <br />
                <input type="country" id="country" name="country" placeholder="Enter country" required/>
              </div>

              <div className='field'>
                <label htmlFor="email"> Email*: </label> <br />
                <input type="email" id="email" name="email" placeholder="Enter your email" required/>
              </div>

              <div className='field'>
                <label htmlFor="emailConf"> Email conformation*: </label> <br />
                <input type="email" id="email2" name="email2" placeholder="Confirm your email" required/>
              </div>

              <div className='field' >
                <label htmlFor="code"> Promo code: </label> <br />
                <input type="text" id="code" name="code" placeholder="Enter promo code" />
              </div>

              <button type='submit' className='btn' onClick={(e) => {
                //e.preventDefault();
                e.stopPropagation();
                console.log({ e });
              }}> MAKE RESERVATION </button>
              
            

          </form>
        </div>
      </div>
      
      
      <button onClick={() => {
          navigate("/")
        }}> nazad </button>

        

    </div>
  )
}

export default ReservationForm