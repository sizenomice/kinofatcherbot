function App() {
  const alert = (window as any).telegram?.WebApp;
  return (
    <>
      <img src="/favicon.svg" alt="KinoFetcherBot" style={{ width: '100px', height: '100px' }} />
      <div>KinoFetcherBot</div>
      <div>{alert}</div>
    </>
  )
}

export default App
