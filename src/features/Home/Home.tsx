import React from "react"
import Button from "../../components/ui/Button/Button"
import Input from "../../components/ui/Input/Input"
import buttonStyles from "../../components/ui/Button/Button.module.css"
import inputStyles from "../../components/ui/Input/Input.module.css"


export default function Home() {
  return (
    <div>
         <h1>Medtrack baby let'sgo</h1>
        <p>Prueba prueba parrafo 1, 2, 3</p>
        <Button 
        onClick={() => alert('Button clicked!')} 
        label="Click Me"
        className={buttonStyles.button}
        />
        <Input 
          type="text" 
          placeholder="Type something..." 
          onChange={(e) => console.log(e.target.value)}
          className={inputStyles.input}
        />
    </div>
  )
}

