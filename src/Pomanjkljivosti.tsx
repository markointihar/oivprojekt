import React from "react";

interface PomanjkljivostiProps{
    geslo:String;
    stanje:String;
    stevilka:boolean;
    malaCrka:boolean;
    velikaCrka:boolean;
    znak:boolean;
    dovoljZnakov:boolean;
}

export default function Pomanjkljivosti(props: PomanjkljivostiProps){
    return(
        <div className={`rezultat ${props.stanje}`}>
        {!props.stevilka && props.geslo.length > 0 && (
          <div>
            <h2>Geslo potrebuje številko</h2>
          </div>
        )}
        {!props.malaCrka && props.geslo.length > 0 &&(
          <div>
            <h2>Geslo potrebuje malo črko.</h2>
          </div>
        )}
        {!props.velikaCrka && props.geslo.length > 0 &&(
          <div>
            <h2>Geslo potrebuje veliko črko</h2>
          </div>
        )}
        {!props.znak && props.geslo.length > 0 &&(
          <div>
            <h2>Geslo potrebje poseben znak</h2>
          </div>
        )}
        {!props.dovoljZnakov && props.geslo.length > 0 &&(
          <div>
            <h2>Geslo more imeti vsaj 12 znakov</h2>
          </div>
        )}
      </div>
    )
}