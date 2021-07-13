import mapbox from 'mapbox-gl'

import { AttributionControl } from 'mapbox-gl'

const Attribution = AttributionControl

mapbox.accessToken = __env__.MAPBOXKEY

const key = {}

export { mapbox, key, Attribution }
