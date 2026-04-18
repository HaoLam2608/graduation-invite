import GraduationEnvelopeScene from './components/GraduationEnvelopeScene.tsx'

function App() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-luxury-bg text-[#1f4877]">
      <div
        className="pointer-events-none fixed left-1/2 top-0 z-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(131,185,252,0.34)_0%,rgba(131,185,252,0)_70%)] blur-3xl"
        aria-hidden="true"
      />
      <div className="luxury-noise" aria-hidden="true" />
      <div className="luxury-grid" aria-hidden="true" />
      <GraduationEnvelopeScene />
    </main>
  )
}

export default App
