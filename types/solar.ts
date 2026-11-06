/**
 * Solar installation details entered by the user and saved in the browser.
 */
export interface Installation {
  /** Street address used to find the installation's geographic coordinates. */
  address: string
  /** Peak rated power of the photovoltaic installation, expressed in kWp. */
  powerKwp: number
}

/**
 * Geographic coordinates and display name returned by address geocoding.
 */
export interface GeocodedPlace {
  /** Latitude of the matched location, in decimal degrees. */
  latitude: number
  /** Longitude of the matched location, in decimal degrees. */
  longitude: number
  /** Human-readable address returned for the matched location. */
  displayName: string
}

/**
 * One hourly solar-weather reading used to estimate photovoltaic production.
 */
export interface ForecastHour {
  /** Local forecast timestamp in ISO format, including the hour. */
  time: string
  /** Forecast shortwave solar radiation for this hour, in W/m². */
  shortwaveRadiation: number
  /** Forecast cloud cover for this hour, as a percentage. */
  cloudCover: number
  /** Forecast air temperature for this hour, in °C. */
  temperature: number
}

/**
 * Weather forecast readings for one calendar day at a geocoded location.
 */
export interface WeatherForecast {
  /** Forecast calendar date in YYYY-MM-DD format, in the location's timezone. */
  date: string
  /** Hourly solar-radiation readings for the forecast date. */
  hours: ForecastHour[]
}

/**
 * Indicative interval for estimated photovoltaic energy production, in kWh.
 */
export interface ProductionRange {
  /** Lower bound of the estimate. */
  minKwh: number
  /** Upper bound of the estimate. */
  maxKwh: number
}

/**
 * A suggested household activity that can be timed to use solar electricity.
 */
export interface ConsumptionRecommendation {
  /** Name of the appliance or energy-consuming activity. */
  appliance: string
  /** Emoji used as the visual icon for the recommended activity. */
  icon: string
  /** Plain-language advice describing when to run or schedule the activity. */
  advice: string
}

/**
 * Estimated photovoltaic production and suggested usage for a forecast day.
 */
export interface SolarProduction {
  /** Forecast calendar date in YYYY-MM-DD format, in the location's timezone. */
  date: string
  /** Human-readable address matched by the geocoding service. */
  location: string
  /** Relative solar outlook score, from 0 (low) to 100 (excellent). */
  score: number
  /** Indicative interval for total energy produced during the day, in kWh. */
  productionRange: ProductionRange
  /** Local clock time of the estimated maximum production. */
  peakHour: string
  /** Local time interval recommended for shifting flexible electricity use. */
  bestWindow: string
  /** Appliance-specific suggestions for using the estimated solar production. */
  recommendations: ConsumptionRecommendation[]
}
