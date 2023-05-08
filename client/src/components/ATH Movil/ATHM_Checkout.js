import React, { useState, useRef } from 'react';

function Image({ src, width, height }) {
  ATHM_Checkout = {

      env: 'sandbox', //change this to "production" for deployment
      publicToken: 'sandboxtoken01875617264', //change this to our business account public token for deployment

      timeout: 600, //cancels payment processs if the payment isn't completed in this many seconds

      theme: 'btn', //options here are btn, btn-black & btn-light
      lang: 'en', //change this to es for spanish

      total: 25.00,

      metadata1: 'metadata1 test', //we can add information about the website here
      metadata2: 'metadata2 test', //We can add additional information here

      // items: [ //technically optional but adding this makes for cleaner checkout
      //     {
      //         "name":"Sample Event",
      //         "description":"This is the description to a sample event",
      //         "quantity":"1",
      //         "price":"25.00",
      //         "tax":"0.00",
      //         "metadata":"sample event metadata" //we can add event information here
      //     },
      // ],
      
    onCompletedPayment: function (response)
		{
      
		  //Handle response
		},
    onCancelledPayment: function (response)
		{
      
		  //Handle response
		},
    onExpiredPayment: function (response)
		{
      
		  //Handle response
		}
  }


  return (
    <div id="ATHMovil_Checkout_Button"></div>
  );
}

export default Image;