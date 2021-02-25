import { writable, readable, derived } from 'svelte/store'
import { fetchJson, createZeitreihe, addPropAndMap } from 'utils'
import { createGeojson, createFeature } from 'components/Map3D/utils.js'
import { zeitreiheDataKeys, s3UrlRisk } from 'constants'

export const data = writable(null)
export const activeZipcode = writable(50667)
export const zipcodes = writable([])
export const userInput = writable(false)
export const activeKeyZeitreihe = writable('air_temperature_max')
export const selectedAnchor = writable(false)

let cache = {}

export const storyData = derived(
  [data, activeZipcode],
  ([$data, $activeZipcode], set) => {
    const getData = async () => {
      const json = await fetchJson(
        `${s3UrlRisk}postcode/${parseInt($activeZipcode)}.json`
      )
      if ($data) {
        let dataObj = {}
        const { szenarien } = $data
        const {
          data_germany,
          data_postcode,
          risk_zones,
          dense_space,
          postcode,
          has_ocean_flood,
          postcode_point,
          risk_zone_points,
          risk_zone_anchors,
          postcode_anchors,
        } = json

        szenarien.map((szenario) => {
          const { layers, mapbox_layers, annotation } = szenario

          const szenarioGeojson = createGeojson()
          szenarioGeojson.mapbox_layers = mapbox_layers

          // create feature for each layer based on config
          layers.map((layer) => {
            const { key } = layer

            // @TODO create style dynamically later
            const style = {
              fill: 'white',
              'fill-opacity': 0.4,
              stroke: 'black',
              'line-opacity': 1,
              'line-width': 3,
            }

            const geometries = json[key]

            // if geometries is an array create feature for each item and push it to array
            if (geometries && geometries.length > 1) {
              geometries.forEach((geometry) => {
                const propsFill = {
                  id: `${key}-fill`,
                  ...style,
                  level: geometry.level,
                }

                const propsContour = {
                  id: `${key}-contour`,
                  ...style,
                  level: geometry.level,
                }

                const featureFill = createFeature(geometry.geom, propsFill)
                const featureContour = createFeature(
                  geometry.geom,
                  propsContour
                )
                szenarioGeojson.features.push(featureFill)
                szenarioGeojson.features.push(featureContour)

                /*

              Was ist zu tun?

              - Momentan werden alle features zum Geojson hinzugefügt.
              - Wäre es möglich, die geojsons etwas 

              */

                // if (key === 'klimazonen') {
                //   // add anchor points to json here
                //   let riskzoneAnchorPoints = addPropAndMap(
                //     'riskzone_anchors',
                //     'id',
                //     risk_zone_anchors[0].anchors
                //   )
                //   riskzoneAnchorPoints.forEach((d) =>
                //     szenarioGeojson.features.push(d)
                //   )
                // }
              })
              // else if geometry has only on object push to features
            } else {
              const propsFill = {
                id: `${key}-fill`,
                ...style,
                // level: geometry.level,
              }

              const propsContour = {
                id: `${key}-contour`,
                ...style,
                // level: geometry.level,
              }

              const featureFill = createFeature(geometries, propsFill)
              const featureContour = createFeature(geometries, propsContour)
              szenarioGeojson.features.push(featureFill)
              szenarioGeojson.features.push(featureContour)
            }

            // add anchor points features to geojson if postcode_geom
            if (key === 'postcode_geom') {
              postcode_anchors.forEach((geom, i) => {
                const props = { id: 'postcode_anchors', title: i }
                const feature = createFeature(geom, props)
                szenarioGeojson.features.push(feature)
              })
            }
          })

          // szenario.postcode_point = postcode_point
          // szenario.risk_zone_points = risk_zone_points

          // szenario.postcode_anchors = postcode_anchors
          szenario.geojson = szenarioGeojson
          szenario.postcode = postcode
          szenario.anchors = postcode_anchors.map((p) => p.coordinates)
        })

        let zeitreihen = {
          postcode: {},
          germany: {},
          meta: {
            riskzones: risk_zones,
            denseSpace: dense_space === 1 ? true : false,
            hasOceanFlood: has_ocean_flood === 1 ? true : false,
          },
        }
        zeitreiheDataKeys.map((datakey) => {
          const zeitreiheGermany = createZeitreihe(data_germany, datakey, 50)
          const zeitreihePostcode = createZeitreihe(data_postcode, datakey, 50)
          zeitreihen.germany[datakey] = zeitreiheGermany
          zeitreihen.postcode[datakey] = zeitreihePostcode
        })
        // @TODO define active dataset based on json stats (dense space, risk zones ...)

        dataObj.szenarien = szenarien
        dataObj.zeitreihen = zeitreihen

        set(dataObj)
      }
    }
    getData()
  }
)

export const zeitreihenData = derived(
  [storyData, data, activeKeyZeitreihe],
  ([$storyData, $data, $activeKeyZeitreihe], set) => {
    if ($storyData && $data) {
      const { zeitreihen } = $storyData
      const { zeitreiheSteps } = $data
      const zeitreiheData = zeitreiheSteps.map((step) => ({
        ...step,
        ...zeitreihen[step.data][step.datakey],
      }))
      set(zeitreiheData)
    }
  }
)
