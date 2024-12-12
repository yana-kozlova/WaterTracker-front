function App() {
  return (<><header className="header">
    <div className="container">
      <a href="#" className="logo">
        Tracker of Water
      </a>
      <nav className="nav">
        <a href="/signin" className="nav-link">
          Sign in
        </a>
      </nav>
    </div>
  </header>

    <main className="main">
      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Water consumption tracker</h1>
            <p className="hero-subtitle">Record daily water intake and track</p>

            <ul className="benefits">
              <li className="benefit">
                <span className="icon">&#128197;</span>
                <span className="text">Habit drive</span>
              </li>
              <li className="benefit">
                <span className="icon">&#128202;</span>
                <span className="text">View statistics</span>
              </li>
              <li className="benefit">
                <span className="icon">&#9881;</span>
                <span className="text">Personal rate setting</span>
              </li>
            </ul>

            <a href="/tracker" className="btn">
              Try tracker
            </a>
          </div>

          <aside className="why-drink-water">
            <h2>Why drink water</h2>
            <ul>
              <li>Supply of nutrients to all organs</li>
              <li>Providing oxygen to the lungs</li>
              <li>Maintaining the work of the heart</li>
              <li>Release of processed substances</li>
              <li>Ensuring the stability of the internal environment</li>
              <li>Maintaining within the normal temperature</li>
              <li>Maintaining an immune system capable of resisting disease</li>
            </ul>
          </aside>
        </section>
      </div>
    </main>

    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Tracker of Water. All rights reserved.</p>
      </div>
    </footer>
  </>
  );
}
export default App;
