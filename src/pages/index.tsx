import { type NextPage } from "next"
import Head from "next/head"
import { ImageWithFallback } from "../components"
import { api } from "../utils/api"
import { useLocationPermission } from "../utils/useLocationPermission"

const Home: NextPage = () => {
  const { isPermitted, coordinates, isWaitingForPermission } =
    useLocationPermission()
  const { data, error, isError, isFetching } = api.weather.current.useQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore => even if query is disabled when coordinates are undefined, it's throwing type error
    { coordinates },
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(coordinates),
    }
  )

  return (
    <>
      <Head>
        <title>09/27 - Weather</title>
      </Head>
      <main
        data-theme="cyberpunk"
        className="flex min-h-screen flex-col items-center gap-4"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          09/27 - Weather
        </h1>

        {((!isPermitted && isWaitingForPermission) || isFetching) && (
          <div className="mt-10 flex flex-col items-center">
            <progress className="progress progress-accent w-56"></progress>
            <p className="m-2 text-xl">Loading...</p>
            <progress className="progress progress-accent w-56"></progress>
          </div>
        )}

        {(!(isWaitingForPermission || isPermitted) || isError) && (
          <div className="flex flex-col items-center">
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Error! Something went wrong...</h3>
                  <div className="text-xs">
                    message:{" "}
                    {isError
                      ? error.message
                      : "please allow your location from browser settings"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!data && !isFetching && !isError && isPermitted && (
          <div className="flex flex-col items-center">
            <div className="alert alert-error shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">Error! Something went wrong...</h3>
                  <div className="text-xs">
                    message: Hmmm, Can&apos;t seem to find what went wrong...🤔
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div>
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <div className="badge">
                  {data.cityName}, {data.country}
                </div>
                <h2 className="card-title text-6xl">{data.temp}°C</h2>

                <div className="mt-2 flex flex-col items-center gap-10 text-center">
                  <div className="indicator">
                    <span className="indicator-start indicator-bottom badge-secondary badge indicator-item">
                      <div
                        className="tooltip tooltip-secondary"
                        data-tip={data.type.description}
                      >
                        {data.type.name}
                      </div>
                    </span>
                    <ImageWithFallback
                      src={`icons/${data.type.icon}.svg`}
                      alt={`${data.type.name} - ${data.type.description}`}
                      width={150}
                      height={150}
                      fallbackSrc="icons/fallback.svg"
                    />
                  </div>

                  <div className="stats shadow">
                    <div className="stat place-items-center">
                      <div className="stat-title">Feels like</div>
                      <div className="stat-value text-2xl">{data.feels}°C</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Humidity</div>
                      <div className="stat-value text-2xl">
                        {data.humidity}%
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Wind</div>
                      <div className="stat-value text-2xl">
                        {data.wind} km/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Home
