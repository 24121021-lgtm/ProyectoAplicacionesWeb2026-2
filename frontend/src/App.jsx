import Hero from './components/Hero'
import Bienvenida from './components/Bienvenida'
import Nosotros from './components/Nosotros'
import Experiencia from './components/Experiencia'

function App() {

  return (

    <>

      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Hero />

      <main id="contenido">

        <Bienvenida />

        <Nosotros />

        <Experiencia />

      </main>

    </>

  )
}

export default App