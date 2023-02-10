import { z } from "zod"
import { env } from "../../../env.mjs"
import { CoordinatesSchema, type OpenWeatherAPIResponse } from "../../../types"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const weatherRouter = createTRPCRouter({
  current: publicProcedure
    .input(z.object({ coordinates: CoordinatesSchema }))
    .query(async ({ input }) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${input.coordinates.latitude}&lon=${input.coordinates.longitude}&units=metric&appid=${env.SERVER_WEATHER_API_KEY}`
      )
      if (!res.ok) throw new Error(res.statusText)
      const data = (await res.json()) as OpenWeatherAPIResponse

      return {
        temp: data.main.temp,
        feels: data.main.feels_like,
        humidity: data.main.humidity,
        cityName: data.name,
        country: data.sys.country,
        wind: (data.wind.speed * 3.6).toFixed(2), // mtr/sec to km/h
        type: {
          name: data.weather?.[0]?.main || "unknown",
          description: data.weather?.[0]?.description || "unknown",
          icon: data.weather?.[0]?.icon || "fallback",
        },
      }
    }),
})
