import { useEffect, useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';
import './App.scss';

export default function App() {

  const [baseLocation, setBaseLocation] = useState('Mexico');
  const API_KEY = '6f5b0ea7cea44e93b1032505220108';
  const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${baseLocation}`;
  const [query, setQuery] = useState('');
  const [api, setApi] = useState();
  const date = new Date()


  useEffect(() => {
      axios.get(BASE_URL).then((response) => {
        setApi(response)
      })
  }, [baseLocation])

const handleSubmit = (e) => {
  e.preventDefault()
  setBaseLocation(query)
}
const handleChange = (e) => {
setQuery(e.target.value)
}

if(!api) return

  return (
    <Main weather={api.data.current.condition.text}>
      <Contenedor>
        <ContenedorBuscador>
            <h1>Ingresa tu ubicación</h1>
              <form className='contenedorInput' onSubmit={handleSubmit}>
              <Form.Control type='text' placeholder='Busca tu ciudad o localidad' onChange={handleChange}/>
              <Button variant='primary' onClick={handleSubmit}>Buscar</Button>
              </form>
        </ContenedorBuscador>
      <ContenedorInfo>
        <hr />
        <h1>{api.data.location.name},  {api.data.location.region}, {api.data.location.country}</h1>
        <h2>{date.toString()}</h2>
        <hr />
        <div className="contenedorGrados">
          <div className="contenedorTemperatura">
            <h1>{api.data.current.temp_c} C°</h1>
            <h2>Máxima</h2>
          </div>
          <div className="contenedorTemperatura">
            <h1>{api.data.current.feelslike_c} C°</h1>
            <h2>Sensación Termica</h2>
          </div>
        </div>
        <hr />
        <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
          <img src={api.data.current.condition.icon} alt="" />
          <h1>{api.data.current.condition.text}</h1>
        </div>
      </ContenedorInfo>
      </Contenedor>
    </Main>
  )
}

const Main = styled.div`
  	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	justify-content: center;
	align-items: center;
  ${props => 
  props.weather === 'Sunny' ? 'background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);' : 
  props.weather === 'Partly cloudy' ? 'background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);' :
  props.weather === 'Cloudy' ? 'background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);' :
  props.weather === 'Patchy rain possible' ? 'background-image: linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);' :
  props.weather === 'Clear' ? 'background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);' :
  null
  }
  `
const Contenedor = styled.div`
  border-radius: 0.4rem;
  background-color: #8EC5FC;
background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  align-items: space-evenly;
  width: min(700px, 90%);
  height: auto;
  margin: 2rem 0;
`
const ContenedorBuscador = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1{
    color: #fff;
    font-size: 2rem;
  }
   .contenedorInput{
    display: flex;
    gap: 1rem;
   }
`
const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  hr{
    color: inherit;
  }

  h1{
    font-size: 1.5rem;
    color: #fff;
  }
  h2{
    font-size: 1.2rem;
    color: #474747;

  }
  .contenedorGrados{
    display: flex;
    gap: 2rem;
    .contenedorTemperatura{
      display: flex;
      flex-direction: column;

      h1{
        color: #fff;
        font-size: 1.5rem
      }
      h2{
        color: #474747;
        font-size: 1.2rem;
      }
    }
  }

`