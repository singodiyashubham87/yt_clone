import { apiKey } from "./API_CREDS";

export const YT_SEARCH_SUGGESTION_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`;
// export const YT_SEARCH_SUGGESTION_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=SEARCH_QUERY`;
export const YT_SEARCH_RESULTS_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&maxResults=20&key=${apiKey}&q=`;
// export const YT_SEARCH_RESULTS_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet,id&maxResults=20&key=${apiKey}&q=SEARCH_QUERY`;
export const YT_MOST_POPULAR_VIDEOS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,id&chart=mostPopular&regionCode=IN&maxResults=20&key=${apiKey}`;
// export const YT_MOST_POPULAR_VIDEOS_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,id&chart=mostPopular&regionCode=IN&maxResults=20&key=API_KEY`;
