import { AdditionalPropertyDataForm } from './AdditionalPropertyDataForm'
import './App.css'
import { LandlordDataForm } from './LandLordDataForm'
import { PropertyDeedForm } from './PropertyDeedForm'
import { SubmitButton } from './SubmitButton'
import { TenantDataForm } from './TenantDataForm'

function App() {


  return (
    <div className="app">
      <LandlordDataForm />
      <TenantDataForm />
      <PropertyDeedForm />
      <AdditionalPropertyDataForm />
      <SubmitButton />
    </div>
  )
}

export default App
