export const GET_LAUNCHES = `
  query GetLaunches {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
    }
  }
`;
