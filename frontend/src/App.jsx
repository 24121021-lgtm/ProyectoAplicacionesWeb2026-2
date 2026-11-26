import Hero from './components/Hero'
import Bienvenida from './components/Bienvenida'
import Nosotros from './components/Nosotros'
import Experiencia from './components/Experiencia'
import CartaDigital from './components/CartaDigital'
import Novedades from './components/Novedades'
import Galeria from './components/Galeria'
import Reservas from './components/Reservas'
import Footer from './components/Footer'

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

        <CartaDigital />

        <Novedades />

        <Galeria />

        <Reservas />

      </main>

      <Footer />

    </>

  )

}

export default App