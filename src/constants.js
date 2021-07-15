export const mapbox_layers = [
  'hochwasser',
  'sturmfluten',
  'verdichtungsraeume',
  'klimazonen',
]

export const zeitreiheDataKeys = ['air_temperature_max']

export const fluvial_flood_low = '#60BFC1'
export const fluvial_flood_medium = '#418FA0'
export const fluvial_flood_high = '#1E4A76'
export const dense_space = '#5d42d2'

const isLocal = false

export const s3Url = 'https://locobss-story-co2.s3.eu-central-1.amazonaws.com/'
export const s3UrlRisk = isLocal
  ? 'data/'
  : 'https://locobss-story-risk.s3.eu-central-1.amazonaws.com/'
export const zipCodesUrl = `${s3Url}postcodes.txt`

export const styles = {
  fluvial_flood_L: {
    fill: fluvial_flood_low,
    stroke: fluvial_flood_low,
    'line-width': 1.5,
    'fill-opacity': 0.15,
    'line-opacity': 0.1,
  },
  fluvial_flood_M: {
    fill: fluvial_flood_medium,
    stroke: fluvial_flood_medium,
    'line-width': 1.5,
    'fill-opacity': 0.15,
    'line-opacity': 0.1,
  },
  fluvial_flood_H: {
    fill: fluvial_flood_high,
    stroke: fluvial_flood_high,
    'line-width': 1.5,
    'fill-opacity': 0.15,
    'line-opacity': 0.1,
  },
  fluvial_flood: {
    fill: fluvial_flood_low,
    stroke: fluvial_flood_low,
    'line-width': 1.5,
    'fill-opacity': 0.15,
    'line-opacity': 0.1,
  },
  postcode_geom: {
    fill: 'white',
    stroke: 'black',
    'line-width': 2.5,
    'fill-opacity': 0.6,
    'line-opacity': 1,
  },
  postcode_buff_geom: {
    fill: 'red',
    stroke: 'black',
    'line-width': 1,
    'fill-opacity': 0,
    'line-opacity': 1,
  },
}

export const zeitreiheDataGradients = {
  air_temperature_max: ['#418fa0', '#cf6d49'],
}

export const stateCentroids = {
  'Baden-Württemberg': [9.7 - 0.6, 48.8 - 0.3],
  Bayern: [12.3 - 0.6, 49 - 0.3],
  Berlin: [13.4, 52.45],
  Brandenburg: [13.7, 51.9],
  Bremen: [8.67, 53.1],
  Hamburg: [9.98, 53.5],
  Hessen: [9.8 - 0.6, 50.9 - 0.3],
  'Mecklenburg-Vorpommern': [13.3 - 0.6, 54 - 0.3],
  Niedersachsen: [9.4, 52.5],
  'Nordrhein-Westfalen': [8.2 - 0.6, 51.7 - 0.3],
  'Rheinland-Pfalz': [7.1, 50.2],
  Saarland: [7, 49.3],
  'Sachsen-Anhalt': [11.5, 52],
  Sachsen: [13.9 - 0.6, 51.2 - 0.3],
  'Schleswig-Holstein': [9.3, 54.15],
  Thüringen: [11.7 - 0.6, 50.9 - 0.3],
}

export const STATE_LABELS = {
  1: 'Schleswig-Holstein',
  2: 'Hamburg',
  3: 'Niedersachsen',
  4: 'Bremen',
  5: 'Nordrhein-Westfalen',
  6: 'Hessen',
  7: 'Rheinland-Pfalz',
  8: 'Baden-Württemberg',
  9: 'Bayern',
  10: 'Saarland',
  11: 'Berlin',
  12: 'Brandenburg',
  13: 'Mecklenburg-Vorpommern',
  14: 'Sachsen',
  15: 'Sachsen-Anhalt',
  16: 'Thüringen',
}

export const droughtColors = ['#C9B764', '#EEC14D', '#EE913C', '#ae112a']

export const fluvial_flood_anchor_indices = {
  L: [5, 6, 7],
  M: [5, 6, 7],
  H: [5, 6, 7],
}

export const klimazonen_anchor_indices = {
  cold: [0, 1],
  warm: [0, 2],
  dry: [5, 6],
  mountain: [0, 1],
  premountain: [0, 3],
  midmountain: [0, 1],
}

export const klimazonenDict = [
  {
    fid: 4,
    type: 'cold',
  },
  {
    fid: 98,
    type: 'midmountain',
  },
  {
    fid: 1,
    type: 'dry',
  },
  {
    fid: 3,
    type: 'warm',
  },
  {
    fid: 29,
    type: 'premountain',
  },
  {
    fid: 15,
    type: 'mountain',
  },
]

export const klimazonenIds = [1, 40, 99, 297, 2892, 4089]
export const klimazonenIdsDict = [1, 40, 99, 297, 2892, 4089]

export const appendix = {
  sources: [
    [
      'https://www.umweltbundesamt.de/sites/default/files/medien/376/dokumente/handlungsfelduebergreifende_schwerpunkte_der_folgen_des_klimawandels_1.pdf',
      'Klimazonen und Risiken, UBA',
    ],
    [
      'https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ-Nicht/30-verdichtungsraeume.html',
      'Verdichtungsräume, Statistisches Bundesamt / BBSR',
    ],
    [
      'https://geoportal.bafg.de/inspire/download/NZ/servicefeed.xml',
      'Hochwasser Prognosen, BfG',
    ],
    ['http://opendata.dwd.de/', 'Wetterdaten, DWD'],
    [
      'https://gdz.bkg.bund.de/index.php/default/open-data/gebietseinheiten-1-250-000-ge250.html',
      'Räumliche Einheiten Deutschland, BKG',
    ],
    ['https://www.openstreetmap.org', 'Daten: OpenStreetMap'],
  ],
  method:
    'Ziel des Forschungsvorhaben war es Mittels Prototypen auf Benutzer*innen zugeschnittene datengestützte Storytelling-Ansätze aufzuzeigen. Durch die Personalisierung sollen besonders für sonst abstrakte Themen direkte Bezüge zur Lebenswelt der Leser*innen aufgezeigt werden.<br /><br />Um die persönlichen Klimawandelrisiken aufzeigen zu können, haben wir Modellierungen des <a href="https://www.umweltbundesamt.de">Umweltbundesamtes (UBA)</a>, der <a href="https://www.bafg.de">Bundesanstalt für Gewässerkunde</a> und des <a href="https://www.dwd.de">Deutschen Wetterdiensts genutzt</a>.<br /><br />Modelle und Vorhersagen sind immer Unsicherheiten unterworfen. Somit sind die hier aufgezeigten Risiken als Trends zu verstehen. Die sowohl nach unten als auch nach oben variieren können. In manchen räumlichen Regionen kann es durchaus nur wenige Risiken und kaum Veränderungen des Klimas (z.B. Temperaturen) geben, hier ist es besonders wichtig über die eigene Region hinaus die deutschlandweiten Trends zu betrachten.',
  privacy:
    'Privatsphäre geht vor. Wir nutzen keine Cookies oder Tracking. Die Seite ist über Netlify und AWS S3 gehostet. Die Karte wird durch Mapbox bereitgestellt: <a href="https://vislab.io/legal">Impressum</a>, <a href="https://vislab.io/privacy">Datenschutzerklärung</a>, <a href="mailto:contact@sebastianmeier.eu">Kontakt</a>',
  mapbox:
    'Dieses Projekt wird unterstützt durch das <a href="https://mapbox.com/community/">Mapbox&nbsp;Community Programm</a>.'
}
