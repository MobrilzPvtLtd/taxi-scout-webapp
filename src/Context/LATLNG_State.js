import React, { useContext, useEffect, useState } from 'react'
import LATLNG from './LATLNG'
import { SourceContext } from './SourceContext';
import { DestinationContext } from './DestinationContext';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


function LATLNG_State(props) {

   
      
  return (
<LATLNG.Provider  >
{props.children}
</LATLNG.Provider>
  )
}

export default LATLNG_State