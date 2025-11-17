function App() {
  const telegram = (window as any)?.Telegram?.WebApp?.initDataUnsafe;
  return (
    <>
      <img src="/favicon.svg" alt="KinoFetcherBot" style={{ width: '100px', height: '100px' }} />
      <div>KinoFetcherBot</div>
      <div>{telegram}</div>
    </>
  )
}

export default App
