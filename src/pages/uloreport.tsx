// UloReport.tsx
import { createSignal } from 'solid-js';
import './uloreport.css';
import RevenueChart from './revenue';
import GenreChart from './genre';
import AudienceActivityChart from './audienceactivity';
import Subscription from './subscription';
import Titanic from '../img/titanic.png';
import Extraction from '../img/extraction.png';
import OnePiece from '../img/one piece.png';
import AngryBirds from '../img/angry birds.png';
import TAOL from '../img/taol.png';
import up from '../img/up.svg';
import filter from '../img/filter.svg';
import search from '../img/searchh.svg';
import point from '../img/titik.svg';
import calendar from '../img/kalender.svg';
import andre from '../img/andre.svg';
import arrowup from '../img/arrow-up.svg';
import AgGridTable from './aggrid'; // Import AgGridTable

const UloReport = () => {
  const [totalUsers, setTotalUsers] = createSignal(3520000);
  const [activeUsers, setActiveUsers] = createSignal(3520000);
  const [totalMovies, setTotalMovies] = createSignal(500);

  // Add signals for revenue and percentage change
  const [totalRevenue, setTotalRevenue] = createSignal(15590000);
  const [percentageChange, setPercentageChange] = createSignal(12);

  return (
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>ULO REPORT</h1>
        <div class="user-info">
          <div class="calendar-info">
            <img src={calendar} alt="Calendar Icon" class="calendar-icon" />
            <span class="calendar-text">02 OKT 2024 - 03 OKT 2024</span>
          </div>
          <div class="user-profile" style={{ display: 'flex', "align-items": 'center', "margin-left": '15px' }}>
            <img src={andre} alt="Andre Profile" class="profile-icon" />
            <span class="user-name">William Andre</span>
          </div>
          <img src={arrowup} alt="Arrow Up Icon" class="arrow-icon" />
        </div>
      </header>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-header" style={{ display: 'flex', 'align-items': 'center' }}>
            <h3>Total Users</h3>
            <img src={point} alt="Point Icon" class="point-icon" />
          </div>
          <div class="metric-value">
            {totalUsers().toLocaleString()}
            <div class="metric-change-container" style={{ display: 'flex', "align-items": 'center', "margin-left": '5px' }}>
              <img src={up} alt="Upward Trend" class="metric-icon" />
              <span class="metric-change">+10%</span>
            </div>
          </div>
          <div class="metric-subtext">+320.000 from last year</div>
        </div>
        <div class="metric-card-active">
          <div class="metric-header-active" style={{ display: 'flex', 'align-items': 'center' }}>
            <h3>Active Users</h3>
            <img src={point} alt="Point Icon" class="point-icon-active" />
          </div>
          <div class="metric-value-active">
            {activeUsers().toLocaleString()}
            <div class="metric-change-container" style={{ display: 'flex', "align-items": 'center', "margin-left": '5px' }}>
              <img src={up} alt="Upward Trend" class="metric-icon" />
              <span class="metric-change">+10%</span>
            </div>
          </div>
          <div class="metric-subtext-active">+320.000 from last year</div>
        </div>
        <div class="metric-card-total">
          <div class="metric-header-total" style={{ display: 'flex', 'align-items': 'center' }}>
            <h3>Total Movie</h3>
            <img src={point} alt="Point Icon" class="point-icon-total" />
          </div>
          <div class="metric-value-total">
            {totalMovies().toLocaleString()}
            <div class="metric-change-container" style={{ display: 'flex', "align-items": 'center', "margin-left": '5px' }}>
              <img src={up} alt="Upward Trend" class="metric-icon" />
              <span class="metric-change">+10%</span>
            </div>
          </div>
          <div class="metric-subtext-total">+50 from last year</div>
        </div>
      </div>

      <div class="charts-section">
        <div class="revenue">
          <h3>Revenue</h3>
          <div class="revenue-total">
            <span>Rp. {totalRevenue().toLocaleString()}</span>
            <span class="percentage-change">
              <img src={up} alt="Upward Trend" class="change-icon" />
              <span class="change-value">+{percentageChange()}%</span>
              <span class="change-text">from last year</span>
            </span>

          </div>

          <RevenueChart />
        </div>
        <div class="genrech">
          <h3>Movie Genre</h3>
          <GenreChart /> {}
        </div>
      </div>

      <div class="audience">
        <h3>Audience Activity</h3>
        <AudienceActivityChart />
      </div>
      <div class="subscription">
        <h3>Subscription Package</h3>
        <Subscription />
      </div>
      <div class="grid">
        <div class="grid-header">
          <h3>Users Data</h3>
          <div class="grid-tools">
            <img src={filter} alt="Filter Icon" class="filter-icon" />
            <div class="search-bar">
              <img src={search} alt="Search Icon" class="search-icon" />
              <input type="text" placeholder="Search something here.." class="search-input" />
            </div>
          </div>
        </div>
        <AgGridTable />
      </div>


      <div class="popular-films">
        <h3>Popular Films</h3>
        <div class="films-grid">
          <div class="film-card-titanic-card">
            <img src={Titanic} alt="Titanic" class="film-image-titanic" />
            <h4 class="film-title-titanic">Titanic</h4>
            <p class="film-views-titanic">{(567900 / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container-titanic">
              <img src={up} alt="Increase" class="percentage-icon-titanic" />
              <p class="film-percentage-titanic">12%</p>
            </div>
          </div>

          <div class="film-card-op-card">
            <img src={OnePiece} alt="One Piece" class="film-image-onepiece" />
            <h4 class="film-title-op">One Piece</h4>
            <p class="film-views-op">{(567900 / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container-op">
              <img src={up} alt="Increase" class="percentage-icon-op" />
              <p class="film-percentage-op">12%</p>
            </div>
          </div>

          <div class="film-card-extraction-card">
            <img src={Extraction} alt="Extraction 2" class="film-image-extraction" />
            <h4 class="film-title-extraction">Extraction 2</h4>
            <p class="film-views-extraction">{(567900 / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container-extraction">
              <img src={up} alt="Increase" class="percentage-icon-extraction" />
              <p class="film-percentage-extraction">12%</p>
            </div>
          </div>

          <div class="film-card-ab-card">
            <img src={AngryBirds} alt="The Angry Birds Movie 2" class="film-image-angrybirds" />
            <h4 class="film-title-ab">The Angry Birds Movie 2</h4>
            <p class="film-views-ab">{(567900 / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container-ab">
              <img src={up} alt="Increase" class="percentage-icon-ab" />
              <p class="film-percentage-ab">12%</p>
            </div>
          </div>

          <div class="film-card-taol-card">
            <img src={TAOL} alt="The Architecture of Love" class="film-image-taol" />
            <h4 class="film-title-taol">The Architecture of Love</h4>
            <p class="film-views-taol">{(567900 / 1000).toFixed(1)}K viewers</p>
            <div class="film-percentage-container-taol">
              <img src={up} alt="Increase" class="percentage-icon-taol" />
              <p class="film-percentage-taol">12%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UloReport;
