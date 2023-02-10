import { type NextPage } from "next"
import Head from "next/head"
import { api } from "../utils/api"

const Home: NextPage = () => {
  const { data } = api.example.hello.useQuery(
    { text: "Weather" },
    {
      refetchOnWindowFocus: false,
    }
  )
  console.log(data?.greeting)

  return (
    <>
      <Head>
        <title>09/27 - Weather</title>
      </Head>
      <main
        data-theme="cyberpunk"
        className="flex min-h-screen flex-col items-center"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          09/27 - Weather
        </h1>
      </main>
    </>
  )
}

export default Home
