import React from "react";

interface RezultatProps{
    rezultat: String;
    rezultatSeznama: String;
    loading: boolean;
}

export default function Rezultat(props: RezultatProps){
    return(
      <div className="container">
        <div className={`rezultat ${props.rezultat === 'Geslo ni bilo pwned.' ? 'good' : 'bad'}`}>
          {props.rezultat && (
            <div>
              <h2>Rezultat:</h2>
              <p>{props.rezultat}</p>
            </div>
          )}
        </div>
        <div className={`rezultat ${props.rezultatSeznama === 'Geslo je na seznamu pogostih gesel. Prosim izberite varnejše geslo.' ? 'bad' : 'good'}`}>
          {props.rezultatSeznama && (
            <div>
              <h2>Rezultat seznama:</h2>
              <p>{props.rezultatSeznama}</p>
            </div>
          )}
        </div>
      </div>
    );
  }