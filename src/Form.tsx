import React from "react";
interface FormProps {
    submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
    geslo: any;
    handleGesloChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Form(props: FormProps){
    return(
        <div>
            <form onSubmit={props.submitHandler} className={'forma'}>
            <input className={"polje"} type="password" id="geslo" value={props.geslo} onChange={props.handleGesloChange} />
            <button type="submit">
            <img src={require("./isci.png")}></img>
          </button>
        </form>
        </div>
        
    )
}