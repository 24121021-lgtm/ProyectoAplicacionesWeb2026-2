import Hero from './components/Hero'
import Bienvenida from './components/Bienvenida'
import Nosotros from './components/Nosotros'
import Experiencia from './components/Experiencia'
import CartaDigital from './components/CartaDigital'
import Novedades from './components/Novedades'
import Galeria from './components/Galeria'
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

        {/* Sección temporal de reservas */}

        <section
          id="reservas"
          className="bg-salvaje-oscuro px-6 py-16 text-center text-salvaje-crema"
        >

          <p className="mb-3 text-sm font-semibold tracking-widest text-salvaje-dorado">
            TU PRÓXIMA SALIDA EMPIEZA AQUÍ
          </p>

          <h2 className="mb-4 text-4xl font-bold">
            Reserva tu momento en Salvaje
          </h2>

          <p>
            Próximamente estará disponible nuestro
            formulario de reservaciones.
          </p>

        </section>

      </main>

      <Footer />

    </>

  )
}

export default App