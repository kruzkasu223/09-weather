import { useCallback, useEffect, useState } from "react"
import { type CoordinatesType } from "../types"

export const useLocationPermission = () => {
  const [isPermitted, setIsPermitted] = useState(false)
  const [coordinates, setCoordinates] = useState<CoordinatesType>()
  const [isWaitingForPermission, setIsWaitingForPermission] = useState(true)

  const setAll = (value: boolean) => {
    setIsWaitingForPermission(false)
    setIsPermitted(value)
  }

  const handleLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!(pos.coords.latitude || pos.coords.longitude)) return setAll(false)

        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
        setCoordinates(coords)
        setAll(true)
      },
      () => {
        setAll(false)
      },
      { enableHighAccuracy: true }
    )
  }, [])

  useEffect(() => {
    let handlePermissionListener: void | null = null
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      void navigator.permissions
        .query({ name: "geolocation" })
        .then((response) => {
          handleLocation()
          handlePermissionListener = response.addEventListener("change", () => {
            if (response.state === "granted" || response.state === "prompt")
              handleLocation()
            else setAll(false)
          })
        })
    } else setAll(false)

    return () => {
      handlePermissionListener &&
        removeEventListener("change", handlePermissionListener)
    }
  }, [handleLocation])

  return { isPermitted, coordinates, isWaitingForPermission }
}
