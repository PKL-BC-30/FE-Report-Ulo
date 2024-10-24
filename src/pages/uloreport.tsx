// UloReport.tsx
import { createSignal } from 'solid-js';
import './uloreport.css';
import RevenueChart from './revenue';
import GenreChart from './genre';
import AudienceActivityChart from './audienceactivity';
import Titanic from '../img/titanic.png';
import Extraction from '../img/extraction.png';
import OnePiece from '../img/one piece.png';
import AngryBirds from '../img/angry birds.png';
import TAOL from '../img/taol.png';
import up from '../img/up.svg';
import AgGridTable from './aggrid'; // Import AgGridTable

const UloReport = () => {
  const [totalUsers, setTotalUsers] = createSignal(3520000);
  const [activeUsers, setActiveUsers] = createSignal(3520000);
  const [totalMovies, setTotalMovies] = createSignal(500);

  const films = [
    {
      image: Titanic,
      title: 'Titanic',
      views: 567900,
      percentageIncrease: 12,
    },
    {
      image: Extraction,
      title: 'Extraction 2',
      views: 567900,
      percentageIncrease: 12,
    },
    {
      image: OnePiece,
      title: 'One Piece',
      views:567900,
      percentageIncrease: 12,
    },
    {
      image: AngryBirds,
      title: 'The Angry Birds Movie 2',
      views: 567900,
      percentageIncrease: 12,
    },
    {
      image: TAOL,
      title: 'The Architecture of Love',
      views: 567900,
      percentageIncrease: 12,
    },
  ];
  return (
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>ULO REPORT</h1>
        <div class="user-info">
          <span>02 OKT 2024 - 03 OKT 2024</span>
          <div class="user-profile">
            <span>William andre</span>
          </div>
        </div>
      </header>

      <div class="metrics-grid">
        <div class="metric-card">
          <h3>Total Users</h3>
          <div class="metric-value">
            {totalUsers().toLocaleString()}
            <span class="metric-change">+10%</span>
          </div>
          <div class="metric-subtext">+320,000 from last year</div>
        </div>
        <div class="metric-card-active">
          <h3>Active Users</h3>
          <div class="metric-value-active">
            {activeUsers().toLocaleString()}
            <span class="metric-change">+10%</span>
          </div>
          <div class="metric-subtext-active">+320,000 from last year</div>
        </div>
        <div class="metric-card-total">
          <h3>Total Movie</h3>
          <div class="metric-value-total">
            {totalMovies().toLocaleString()}
            <span class="metric-change">+10%</span>
          </div>
          <div class="metric-subtext-total">+50 from last year</div>
        </div>
      </div>

      <div class="charts-section">
        <RevenueChart /> {/* Menampilkan RevenueChart */}
        <GenreChart /> {/* Menampilkan GenreChart */}
      </div>

      <AgGridTable/>

      <div class="audienceactive">
        <AudienceActivityChart/>
      </div>

      <div class="popular-films">
      <h3>Popular Films</h3>
      <div class="films-grid">
        {films.map((film) => (
          <div class="film-card">
            <img src={film.image} alt={film.title} class="film-image" />
            <h4 class="film-title">{film.title}</h4>
            <p class="film-views">{(film.views / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container">
              <img src={up} alt="Increase" class="percentage-icon" /> {/* Image next to percentage */}
              <p class="film-percentage">{film.percentageIncrease}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UloReport;
