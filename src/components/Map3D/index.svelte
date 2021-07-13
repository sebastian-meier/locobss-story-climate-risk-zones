<script>
  import { onMount, afterUpdate, setContext } from 'svelte'
  import { selectedAnchors } from 'stores'
  import {
    createGeojson,
    updateMapboxLayers,
    calcSelectedAnchor,
    setAlignedAnnotations,
    getSelectedCoords,
    pointInPolygon,
    addLayer,
  } from './utils'

  import {
    paintFill,
    paintLine,
    paintLineBuff,
    paintLineFluvialFlood,
  } from './constants'
  import { mapbox, key, Attribution } from './mapbox.js'
  import bbox from '@turf/bbox'

  export let data
  let map
  let isMoving = false
  let innerHeight
  let innerWidth

  setContext(key, {
    getMap: () => map,
  })

  let container
  let ignoreOnce = true

  onMount(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css'

    link.onload = () => {
      map = new mapbox.Map({
        container,
        zoom: 5,
        center: [10.4515, 51.1657],
        dragPan: false,
        doubleClickZoom: false,
        scrollZoom: false,
        attributionControl: false,
        logoPosition: 'top-left',
        style: 'mapbox://styles/juli84/ckmevp79nc2oy17lhgal0ps87',
      })

      map.addControl(new Attribution(), 'top-right')

      map.on('movestart', () => {
        isMoving = true
        if (isMoving) selectedAnchors.set([])
      })

      map.on('moveend', () => {
        isMoving = false
        if (data && !isMoving) {
          let { anchors, step } = data
          let postcode_annotation
          if (anchors.length > 0) {
            let allProjectedChords = []

            anchors.forEach((anchor) => {
              const { anchors, id, klimaId } = anchor
              const projectedCoords = anchors.map((anchor) => ({
                coords: anchor,
                pos: map.project(anchor),
                id: id === 'klimazonen' ? klimaId : id,
              }))
              projectedCoords.forEach((d) => allProjectedChords.push(d))
            })

            const selectedCoords = getSelectedCoords(allProjectedChords)
            if (selectedCoords.find((d) => d.id === 'postcode_geom'))
              postcode_annotation = selectedCoords.find(
                (d) => d.id === 'postcode_geom'
              )

            anchors.forEach((anchor) => {
              const currentId =
                anchor.id === 'klimazonen' ? anchor.klimaId : anchor.id
              anchor.coords = selectedCoords.find((d) => d.id === currentId)
            })

            const alignedAnnotations = setAlignedAnnotations(
              anchors,
              innerWidth,
              innerHeight
            )

            const postcodeFeature = data.geojson.features.find(
              (d) => d.properties.id === 'postcode_geom-fill'
            )

            if (postcodeFeature) {
              const { coords, alignX, alignY } = postcode_annotation

              if (alignY) {
                const isInPolygon = pointInPolygon(
                  coords,
                  postcodeFeature.geometry,
                  alignY
                )
                if (isInPolygon)
                  alignedAnnotations.find(
                    (d) => d.id === 'postcode_geom'
                  ).coords.alignY = alignY === 'top' ? 'bottom' : 'top'
              } else {
                const isInPolygon = pointInPolygon(
                  coords,
                  postcodeFeature.geometry,
                  alignX
                )
                if (isInPolygon)
                  alignedAnnotations.find(
                    (d) => d.id === 'postcode_geom'
                  ).coords.alignX = alignX === 'right' ? 'left' : 'right'
              }
            }

            selectedAnchors.set(alignedAnnotations)
          }
        }
      })

      map.on('data', () => {
        if (ignoreOnce) {
          ignoreOnce = false
          updateMapboxLayers(map, [])
        }
      })

      map.on('load', () => {
        map.addSource('layers', { type: 'geojson', data: createGeojson() })

        addLayer(map, 'postcode_buff_geom-fill', 'fill', 'layers', paintFill)
        addLayer(
          map,
          'postcode_buff_geom-contour',
          'line',
          'layers',
          paintLineBuff
        )

        addLayer(map, 'postcode_buff_geom-mask', 'fill', 'layers', paintFill)
        addLayer(map, 'postcode_geom-fill', 'fill', 'layers', paintFill)
        addLayer(map, 'postcode_geom-contour', 'line', 'layers', paintLine)

        addLayer(map, 'fluvial_flood-fill-L', 'fill', 'layers', paintFill)
        addLayer(map, 'fluvial_flood-fill-M', 'fill', 'layers', paintFill)
        addLayer(map, 'fluvial_flood-fill-H', 'fill', 'layers', paintFill)

        addLayer(
          map,
          'fluvial_flood-contour-L',
          'line',
          'layers',
          paintLineFluvialFlood
        )
        addLayer(
          map,
          'fluvial_flood-contour-M',
          'line',
          'layers',
          paintLineFluvialFlood
        )
        addLayer(
          map,
          'fluvial_flood-contour-H',
          'line',
          'layers',
          paintLineFluvialFlood
        )

        map.moveLayer('postcode_geom-fill', 'state-label')
        map.moveLayer('postcode_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-fill', 'state-label')
        map.moveLayer('postcode_buff_geom-contour', 'state-label')
        map.moveLayer('postcode_buff_geom-mask', 'state-label')
        map.moveLayer('fluvial_flood-fill-L', 'state-label')
        map.moveLayer('fluvial_flood-contour-L', 'state-label')
        map.moveLayer('fluvial_flood-fill-M', 'state-label')
        map.moveLayer('fluvial_flood-contour-M', 'state-label')
        map.moveLayer('fluvial_flood-fill-H', 'state-label')
        map.moveLayer('fluvial_flood-contour-H', 'state-label')

        updateMap()
      })
    }

    document.head.appendChild(link)

    return () => {
      map.remove()
      link.parentNode.removeChild(link)
    }
  })

  afterUpdate(() => {
    updateMap()
  })

  const updateMap = () => {
    if (data && map) {
      const { geojson, padding, fitBounds, risk_zone_ids, layers } = data
      let paddingBounds = padding ? padding : window.innerWidth < 500 ? 20 : 70

      const mapbox_layers = layers.filter((d) => d.isMapbox).map((d) => d.key)

      let fittingBounds = fitBounds
        ? fitBounds
        : bbox(JSON.parse(JSON.stringify(geojson)))

      const source = map.getSource('layers')

      if (source) {
        source.setData(geojson)
        updateMapboxLayers(map, mapbox_layers)

        map.fitBounds(fittingBounds, {
          padding: paddingBounds,
          duration: 600,
        })

        if (mapbox_layers.includes('klimazonen')) {
          map.setFilter('klimazonen', [
            'match',
            ['get', 'fid'],
            risk_zone_ids,
            true,
            false,
          ])
        }
      }
    }
  }
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>
<svelte:window bind:innerHeight bind:innerWidth />
