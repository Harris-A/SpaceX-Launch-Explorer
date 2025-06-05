import { GET_LAUNCHES } from '../../graphql/queries.js';

const API_URL = 'https://spacex-production.up.railway.app/';
const launchList = document.getElementById('launch-list');

async function fetchLaunches() {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: GET_LAUNCHES }),
        });

        const { data } = await res.json();
        displayLaunches(data.launchesPast);
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}

function displayLaunches(launches) {
    if (!launches || launches.length === 0) {
        launchList.innerHTML = '<p>No launches found.</p>';
        return;
    }

    launches.forEach(launch => {
        const div = document.createElement('div');
        div.className = 'col-md-6 col-lg-4';

        div.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">Mission ${launch.mission_name}</h5>
                    <p class="card-text"><strong>Rocket:</strong> ${launch.rocket.rocket_name}</p>
                    <p class="card-text"><strong>Launch Date:</strong> ${new Date(launch.launch_date_local).toLocaleString()}</p>
                    <p class="card-text">Launch Status: <span class="badge ${launch.launch_success ? 'bg-success' : 'bg-danger'}">
                        ${launch.launch_success ? 'Success' : 'Failure'}
                    </span></p>
                    ${launch.links.video_link ? `<a href="${launch.links.video_link}" target="_blank" class="btn btn-primary btn-sm">🎥 Watch Launch</a>` : ''}
                </div>
            </div>
        `;

        launchList.appendChild(div);
    });
}


fetchLaunches();