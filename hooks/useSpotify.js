import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "Refresh token failed") {
        //If refrsh token failed,  sign in again
        signIn();
      }
      // console.log("useSpotify session", session.user.accessToken);
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
