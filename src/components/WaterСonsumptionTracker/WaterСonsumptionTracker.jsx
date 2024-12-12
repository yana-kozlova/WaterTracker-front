export default function WaterConsuptionTracker() {
  return (
    <div class="container">
      <h1 class="hero-title">Water consumption tracker</h1>
      <p class="hero-subtitle">Record daily water intake and track</p>

      <ul class="benefits">
        <li class="benefit">
          <span class="icon">&#128197;</span>
          <span class="text">Habit drive</span>
        </li>
        <li class="benefit">
          <span class="icon">&#128202;</span>
          <span class="text">View statistics</span>
        </li>
        <li class="benefit">
          <span class="icon">&#9881;</span>
          <span class="text">Personal rate setting</span>
        </li>
      </ul>

      <a href="/tracker" class="btn">
        Try tracker
      </a>
    </div>
  );
}
