import React, { useEffect, useState } from 'react';
import * as CryptoJS from 'crypto-js';
import Form from './Form';
import Rezultat from './Rezultat';
import Pomanjkljivosti from './Pomanjkljivosti';

export default function Telo() {
  const [geslo, setGeslo] = useState("");
  const [rezultat, setRezultat] = useState("");
  const [rezultatSeznama, setRezultatSeznama] = useState("");
  const [loading, setLoading] = useState(false);

  

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const sha1Hash = CryptoJS.SHA1(geslo).toString(CryptoJS.enc.Hex).toUpperCase();
      const prefix = sha1Hash.substring(0, 5);
      const postfix = sha1Hash.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!response.ok) {
        throw new Error('Napaka pri poizvedbi API-ja');
      }
      const data = await response.text();
      // Preveri, ali je celoten hash prisoten v odgovoru API-ja
      const found = data.split('\n').find(line => line.trim().startsWith(postfix));

      if (found) {
        const count = found.split(':')[1];
        setRezultat(`Geslo je bilo najdeno v bazi podatkov ${count} krat.`);
      } else {
        setRezultat('Geslo ni bilo pwned.');
      }
    } catch (error) {
      console.error('Napaka:', error);
    }
    preveriSeznamGesel();
    setGeslo("");
  }

  function preveriSeznamGesel() {
    setLoading(true);
    fetch('http://localhost:3001/preveri-geslo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ geslo: geslo }),
    })
    .then(response => response.json())
    .then(data => {
      setRezultatSeznama(data.message);
      setLoading(false);
    })
    .catch(error => {
      console.error('Napaka:', error);
      setLoading(false);
    });
  }

  const [malaCrka, setMalaCrka] = useState(false);
  const [velikaCrka, setVelikaCrka] = useState(false);
  const [stevilka, setStevilka] = useState(false);
  const [znak, setZnak] = useState(false);
  const [stanje, setStanje] = useState("");

  const [dovoljZnakov, setDovoljZnakov] = useState(false);
  function handleGesloChange(event: React.ChangeEvent<HTMLInputElement>) {
    const novoGeslo = event.target.value;
    setGeslo(novoGeslo);
  
    setMalaCrka(/[a-z]/.test(novoGeslo));
    setVelikaCrka(/[A-Z]/.test(novoGeslo));
    setStevilka(/[0-9]/.test(novoGeslo));
    setZnak(/[^a-zA-Z0-9]/.test(novoGeslo));
    setDovoljZnakov(novoGeslo.length >= 12);
  
    let pogoji = 0;
    if (malaCrka) pogoji++;
    if (velikaCrka) pogoji++;
    if (stevilka) pogoji++;
    if (znak) pogoji++;
    if (dovoljZnakov) pogoji++;
  
    if (pogoji >= 2 && pogoji < 5) {
      setStanje('mid');
    } else if(pogoji < 2){
      setStanje('bad');
    }
  }

  return (
    <div className={"container"}>
      <h1>Geslo checker</h1>
      <div className='container'>
        <h2>Vpišite geslo in preverite če je vaše geslo bilo pwned in ali je vaše geslo v seznamu kompromiziranih gesel</h2>
      </div>
      <Form handleGesloChange={handleGesloChange} submitHandler={submitHandler} geslo={geslo} />
      <Rezultat rezultat={rezultat} rezultatSeznama={rezultatSeznama} loading={loading} />
      <div className={`spinner ${loading ? 'visible' : ''}`}></div>
      <Pomanjkljivosti geslo={geslo} stanje={stanje} stevilka={stevilka} malaCrka={malaCrka} velikaCrka={velikaCrka} znak={znak} dovoljZnakov={dovoljZnakov} />
    </div>
  );
}
